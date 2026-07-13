# Background

I was first introduced to Advent of Code by my "Computer Science Concepts" teacher in high school. I had programmed with Arduino and some very minimal Python before but this class formalized everything I had learned. This teacher, Mr. Blachley, went out of his way to help me continue my learning beyond the curriculum and I became a much better programmer because of it. In late November, he showed the class [Advent of Code](https://adventofcode.com/) and told us that the person to come back from break with the most stars would win a t-shirt. The next month of programming challenges would spark a love for programming in me and set me on this career path.

# The First Year

The first year I tried this (2022) was full of growth for me. Every new day and challenge was completely and as someone with no framework for these problems, they often felt insurmountable. To complete these challenges I used [Snap!](https://snap.berkeley.edu/) code blocks. Looking back, this was absurd. About halfway through the month I switched to Python which significantly simplified my development process.

One of my favorite challenges was to find the surface area of a "lava droplet" given a large set of 3D coordinates that defined it's shape. My solution was messy but I was very proud of it at the time. To calculate the surface area of the droplet, ignoring inner pockets of air, I first counted the number of neighbors each voxel (coordinate) in the input had. Then, if a given voxel had less than six neighbors, I iterated through the adjacent voxels to see if they were touching air. Every time a neighbor was touching air I incremented the surface area calculation.

The real meat of this solution was the "touching air" part. To compute if a given voxel was touching air I implemented depth first search. The destination node was set to the origin, which was known to be air.

```Python
def touchingAir (P1, PointBank):
    # Offsets for the six sides of a cube
    adds = [[-1, 1, 0, 0, 0, 0], [0, 0, -1, 1, 0, 0], [0, 0, 0, 0, -1, 1]]

    queue = [P1]
    visited = [P1]
    
    # Temporary queue for the current iteration
    tempQueue = []

    # Check that the queue does not contain the origin and the queue is not empty
    while arrayContains(queue, [0,0,0]) == 0 and len(queue)>0:
        # Iterate through the queue
        for j in range(len(queue)):
            # Check each side of the current voxel
            for i in range(6):
                # Apply the offsets for each side of the current voxel
                checkingPoint = [queue[j][0]+adds[0][i],queue[j][1]+adds[1][i],queue[j][2]+adds[2][i]]

                # Check that point is in-bounds
                if not(checkingPoint[0] < -1) and not(checkingPoint[0] > 22) and not(checkingPoint[1] < -1) and 
                not(checkingPoint[1] > 22) and  not(checkingPoint[2] < -1) and not(checkingPoint[2] > 22):

                    # If the point being checked isn't in the input (is solid) and hasn't been visited 
                    # then add to visited and temporary queue
                    if arrayContains(visited, checkingPoint) == 0 and arrayContains(input, checkingPoint) == 0:
                        tempQueue.append(checkingPoint)
                        visited.append(checkingPoint)

        # Clear the queue
        queue = []

        # Empty the temporary queue into the main queue
        for i in range(len(tempQueue)):
            queue.append(tempQueue[i])
        tempQueue = []

    # If the queue contains the origin, then P1 must be touching air
    return arrayContains(queue, [0,0,0])
```

With the power of hindsight I would have removed the need for the temporary queue as it created unnecessary complexity. I also would have made the offsets much clearer. However, these changes are minor and I think this was a great job for a self-taught algorithm.

While many of my solutions were slow, naive, and by all metrics, bad, by struggling with these problems I learned more than I ever had. Over the month I built up a good sense for the inner workings of these problems. I began learning about simple and not so simple algorithms from the Advent of Code community. I still use the skills I built up through this first year and I hold this experience close.

# Looking Forward

I still pick up these challenges from time to time. I have completed 172 challenge problems and had so much fun doing it. I love to use these as an opportunity to learn new programming languages like C, C++, Rust, and more.

# A Statement on the use of Generative AI

This project was made without the use of generative artificial intelligence. I use projects like this to learn; using AI would shortcut this learning process and reduce my actual understanding of my projects. In my experience, lessons learned "the hard way" with head scratching and frustration, are the lessons that are the most pivotal in my development. On top of this, AI is harmful to our environment, data centers are damaging the communities around them, and many models are unethically trained. For these reasons, I chose not to use generative AI in this project.
