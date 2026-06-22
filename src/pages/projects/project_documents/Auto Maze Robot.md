# Background

Each semester of my freshman year at Purdue, I had a semester-long robotics projects to complete for my honors engineering fundamentals course. Both semesters served as the lead programmer, taking part in every step of the design process. Looking back as a teaching assistant for the course, these projects are incredibly important. They gave me practice working with a small team, managing long-term goals, and simulated working for a real customer in industry. These projects made me a much better engineer and prepared for my upcoming time at Tektronix.

In the Spring semester, we had to design a robot that could:

- Deliver a cargo container through a "disaster zone"
  - The disaster zone was represented by a maze
- Avoid hazards to protect cargo
- Map its path through the disaster zone
- Perform the above tasks autonomously

![Picture of Final Robot Design](../../../images/Project_Images/Auto%20Maze%20Robot/GEARS_Final_Design.png)

# Project Features

## Navigation Algorithm

I was most proud of my navigation algorithm. I implemented a depth first search (DFS), which I originally learned by doing [Advent of Code](../project_pages/Advent%20of%20Code.html) challenges. I chose this algorithm for the following reasons:

- Intelligent backtracking
- Much more efficient than a simple "right hand rule" algorithm
- Use of the algorithm simplified later implementation of mapping
- The algorithm is adaptable to many development changes

The DFS algorithm was implemented in the `maze_navigation()` function. In pseudocode it looked like:

```Python
while not(InGoal()) and ItemsInQueue():
    for i in range(3):
        viable = CheckDirectionViable(i):

        if viable:
            if InGoal():
                DropCargo()
                return
            PushViableToQueue()
    
    nextSquare = Queue.pop()

    TraverseTo(nextSquare)
```

The `TraverseTo(nextSquare)` function in the pseudocode example abstracts some complicated logic. I had to check all four adjacent squares, moving to them if they:

- Were safe from hazards
- The goal square to navigate to
- If none are the goal square, backtrack by traveling "down" the distance values. (Shown Below)

![Backtracking Logic](../../../images/Project_Images/Auto%20Maze%20Robot/Backtracking_Demo.png)

Shown above, the robot (blue rectangle) backtracks by cascading down the distance values (from the origin) from 12 to 11 to 10 and so on until it will be adjacent to it's goal square (green square). This solution felt particularly unique to this challenge as I had not yet had to physically move a seeker with a DFS algorithm.

## Hazard Avoidance

One of the primary design requirements for this robot was to avoid hazards, represented by both an IR emitter and a magnet. To implement this  I wrote the `bot_drive_check()` function.

```Python
def bot_drive_check(x, y):
    # Get IMU magnet values at the center of current square
    x, y, z = IMU.getMag()
    baseline = pow(z,2)

    # Drive to edge of current square
    bot_drive((SQUARE_DIM / 2) - 12)
    
    # Update IMU magnet values
    x, y, z = IMU.getMag()
    # Retrieve IR sensor values
    IrL = IR.value1
    IrR = IR.value2
    
    # If the updated magnet values exceed a threshold over the baseline, a hazard is detected
    if (pow(z,2) > (MAG_THRESH + baseline)):
        # Return to center of current square
        bot_drive(-1 * ((SQUARE_DIM / 2) - 12))
        LogHazard()
        return 3
    # If the average of the IR sensor values exceeds a threshold, a hazard is detected
    elif (((IrL + IrR) / 2) > TEMP_THRESH):
        # Return to center of current square
        bot_drive(-1 * ((SQUARE_DIM / 2) - 12))
        LogHazard()
        return 2

    # Square being checked is clear, move into it
    bot_drive((SQUARE_DIM / 2) + 12)
    return 1    
```

Special consideration had to be taken for the magnet detection. Subfloor electrical systems often interfered with the sensitive IMU measurements so no single threshold could be used. For this reason, the robot takes a baseline at the center of its current square, then approaches the square being checked and compares its readings to the baseline. This way it could sense a significant increase in magnetic field strength.

# Possible Improvements

The greatest weakness of the navigation program was the lack of active adjustment. At all times the robot assumed it moved perfectly, not accounting for small physical variations. As a team we tried many solutions to mitigate error accumulation but our greatest success was just reducing the mechanical slop in the robot. I wrote a correction procedure to ensure the robot was orthogonal to the maze walls. Given a second chance, I would fix this procedure as during the final demonstration, turn error was our greatest issue.

The procedure worked as follows:

1) Turn clockwise while taking front ultrasonic distance measurements
2) As soon as those measurements start increasing, start moving counterclockwise
3) Continue this sweep until a minimum distance measurement is found, this is an orthogonal orientation

# Lessons Learned

This project was one of my most impactful for the soft skills it built up in me. I love facilitating this project for students as a teaching assistant. I believe with the proper effort this project can set the foundation for a successful career.

I learned:

- Working in a group of dedicated peers is difficult. There cannot be one leader when everybody offers important skills. Friction will occur but empathy and a common goal can get the group anywhere. Working through the friction will lead to a fantastic performance everyone can be happy with.
- Long-term projects require long-term plans. Prioritizing critical features and avoiding scope creep is a must.
- There will always be a gap between the gap between the theoretical and true performance of a project. It is the engineers' task to systematically close that gap.

# A Statement on the use of Generative AI

Artificial Intelligence is being shoehorned into nearly every corner of the tech world. While it undeniably has applications in our lives, it is not the miracle it is often advertised. Hallucinations, infrastructure requirements, and unethically trained models aside, artificial intelligence is often used as a shortcut for learning. In my experience, lessons learned "the hard way" with head scratching and frustration, are the lessons that are the most pivotal in my development. I am currently setting the foundation which I will build my life and I do not intend to take shortcuts. Artificial intelligence was not used in this project. This is a human-made project so it will have mistakes, but that how we learn.
