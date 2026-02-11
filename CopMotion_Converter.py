# Cv2 - Provides a method of programmitic video editing
# OS  - Allows files to be created
import cv2
import os

# Read the specified video
cam = cv2.VideoCapture("HandOpen.mp4")

# Current frame of the video
currentframe = 0
# Number to be included in image filepath
fileNum = 0
while(True):
    # Read from frame
    ret,frame = cam.read()
    # If a frame is not returned, end
    if ret:
        # Only save every other frame of the video
        if currentframe % 2 == 0:
            # Filepath for output image
            name = '.src/images/Hand_Palm_Open/Frame' + str(fileNum) + '.jpg'

            # Write the extracted images
            cv2.imwrite(name, frame)

            fileNum += 1

        # Increase counter so that it will
        # show how many frames are created
        currentframe += 1
    else:
        break

# Release all space and windows once done
cam.release()
cv2.destroyAllWindows()