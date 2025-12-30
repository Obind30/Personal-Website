#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os
import argparse
from PIL import Image, ImageOps
from rembg import remove
import numpy as np
import numba
from numba import cuda

# @numba.jit
def dither(num, thresh = 127):
    derr = np.zeros(num.shape, dtype=np.int8)

    div = 8
    for y in range(num.shape[0]):
        for x in range(num.shape[1]):
            newval = derr[y,x] + num[y,x]
            if newval >= thresh:
                errval = newval - 255
                num[y,x] = 1.
            else:
                errval = newval
                num[y,x] = 0.
            if x + 1 < num.shape[1]:
                derr[y, x + 1] += errval / div
                if x + 2 < num.shape[1]:
                    derr[y, x + 2] += errval / div
            if y + 1 < num.shape[0]:
                derr[y + 1, x - 1] += errval / div
                derr[y + 1, x] += errval / div
                if y + 2< num.shape[0]:
                    derr[y + 2, x] += errval / div
                if x + 1 < num.shape[1]:
                    derr[y + 1, x + 1] += errval / div
    return num[::-1,:] * 255

def styalize(inFilepath, outFilepath):

    img = Image.open(inFilepath)
    img = img.resize((int(img.width/8), int(img.height/8)))
    img = remove(img).convert('RGB')

    posterized = ImageOps.posterize(img, bits=3)

    img = img.convert('L')

    m = np.array(img)[:,:]
    m2 = dither(m, thresh = 127)
    ditherMask = Image.fromarray(m2[::-1,:])
    ditherMask.convert('1')

    out = Image.new('RGB', (img.width, img.height))

    out.paste(im=posterized, box=None, mask=ditherMask)
    out.save(outFilepath, dpi=(72,)*2)    


def main():
    for i in range(19):
        styalize(f"src\images\Hand_Palm_Open\Frame{i}.jpg", f"src\images\Hand_Palm_Open_Style\Frame{i}.jpg")

if __name__ == "__main__":
    sys.exit(main())
