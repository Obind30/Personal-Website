# Importing all necessary libraries
import cv2
import os

# Read the video from specified path
cam = cv2.VideoCapture("HandOpen.mp4")

# frame
currentframe = 0
fileNum = 0
while(True):
    
    # reading from frame
    ret,frame = cam.read()

    if ret:
        if currentframe % 2 == 0:
            # if video is still left continue creating images
            name = '.src/images/Hand_Palm_Open/Frame' + str(fileNum) + '.jpg'
            print ('Creating...' + name)

            # writing the extracted images
            cv2.imwrite(name, frame)

            fileNum += 1

        # increasing counter so that it will
        # show how many frames are created
        currentframe += 1
    else:
        break

# Release all space and windows once done
cam.release()
cv2.destroyAllWindows()