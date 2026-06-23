# My First Projects

I've been tinkering for many years now, the longer I worked with electronics the more I wanted to learn. I started by disassembling any device I could get my hands on, much to my parents chagrin. They started taking me to Goodwill so I could be slightly less destructive. Eventually, I got my hands on an Arduino, opening a whole new world of more structured projects and more importantly, programming. Later, my brother and I decided to split the purchase of an Ender 3 3D printer. I taught myself to use Fusion, program my arduino, and put together circuits all to make robots.

![First Robot](../../../images/Project_Images/Quadrupedal%20Walker/Tankbot.jpg)

One of the first robots was a "tank style" driving system that I made at the end of my eigth grade year. I built a wooden frame and 3D printed treads and cogs to make drivetrain. The system was driven by two cheap drills, and the L298N H-bridge motor driver, all controlled by an Arduino. This robot never reached any level of complex control and the treads were not calibrated at all, but it inspired me to keep going.

![Speaker Robot Front](../../../images/Project_Images/Quadrupedal%20Walker/Speakerbot_Front.jpg)
![Speaker Robot Open](../../../images/Project_Images/Quadrupedal%20Walker/Speakerbot_Open.jpg)

Similarly, I built a bluetooth speaker driving robot early in my Freshman year of highschool. This one was built much the same but with speakers in the front, driven by a bluetooth speaker amplifier board. I would continue to play with speakers after this project.

# The Walker

The robot I spent the most time on was the quadrupedal walking robot, inspired especially by [James Bruton](https://www.youtube.com/@jamesbruton). I am extremely proud of all the concepts I learned for this project including:

- Inverse kinematics calculations
- Wireless communication
- I2C Basics
- 3D printing and CAD
- Note taking
- C++ programming
- Soldering

## Physical Design

The design of the robot changed drastically over the years. My original leg looked as follows:

![Original Leg Design](../../../images/Project_Images/Quadrupedal%20Walker/Leg_Prototype1.png)

The forks at the joints were intended to elastically move when external forces were applied. The "tines" would have an embedded magnet with a hall effect sensor between the two to allow the robot to react to external forces. Once again, this was heavily inspired by James Bruton. Realizing I was in over my head, I considered other options.

![Actuator Ideation](../../../images/Project_Images/Quadrupedal%20Walker/Actuator_Ideation.jpg)

I decided to follow a simpler gear and servo approach.

![Later Leg Design](../../../images/Project_Images/Quadrupedal%20Walker/Leg_Prototype2.jpg)

I would later change the hip joint design to better facilitate a larger scale assembly.

![Assembly Drawing](../../../images/Project_Images/Quadrupedal%20Walker/Leg_Layout.jpg)

I was so proud of the final assembly as it came together, it looked just like my drawings.

![Final Assembly](../../../images/Project_Images/Quadrupedal%20Walker/Walker_Standing.png)

## Inverse Kinematics

![Inverse Kinematics](../../../images/Project_Images/Quadrupedal%20Walker/Inverse_Kinematics.jpg)

```C++
CalculateAngles (){
    float h = sqrt(sq(sqrt(sq(C)+sq(B)))+sq(A));
    float g = sqrt(sq(L)-sq(h/2));
    X = round(90-((asin(C/h)+atan(g/(h/2)))*(180/PI)));
    Y = round(2*((asin((h/2)/L))*(180/PI)));
    Z = round(90+(asin(B/(sqrt(sq(A)+sq(B)))))*(180/PI));
}
```

Above is my original sketch of my inverse kinematic derivations. With one goal in mind and some rudimentary trigonometry knowledge, I found a way to calculate the necessary angles to reach a given coordinate.

Eventually, these were implemented as shown.

## Step Encoding

The way I saved the step sequence for the robot shows how far my programming has come. I saved keyframes of the step in a massive switch case structure, where foot coordinates are defined by some stepping parameters.

```C++
FindABC(bool endCntrl, int stepLength, int stepDepth, int stepHeight, int restHeight){//bool alternate
    float hypo = sqrt((stepLength*stepLength)+(stepHeight+stepHeight));
    X = StepCase;
    switch(X){
    case 0:
        A = restHeight;
        B = 0;
        C = 0;
        timeMulti = 0.5;
        break;
    case 1:
        A = restHeight-(stepHeight*2)/3;
        B = stepDepth/2;
        C = stepLength/2;
        timeMulti = 0.125;
        break;
    case 2:
        A = restHeight;
        B = stepDepth;
        C = stepLength;
        timeMulti = .125;
        break;
    case 3:
        A = restHeight;
        B = 0;
        C = 0;
        timeMulti = .5;
        break;
    case 4:
        A = restHeight;
        B = -1*stepDepth;
        C = -1*stepLength;
        timeMulti = 0.5;
        break;
    case 5:
        A = restHeight-stepHeight;
        B = -1*(stepDepth/2);
        C = -1*(stepLength/2);
        timeMulti = .125;
        break;
    case 6:
        A = restHeight-stepHeight;
        B = stepDepth/2;
        C = stepLength/2;
        timeMulti = 0.25;
        break;
    case 7:
        A = restHeight;
        B = stepDepth;
        C = stepLength;
        timeMulti = .125;
        break;
    case 8:
        A = restHeight;
        B = 0;
        C = 0;
        timeMulti = .5;
        break;
    default:
        A = restHeight;
        B = 0;
        C = 0;
        timeMulti = .5;
        break;
    }
}
```

# Conclusion

This project spanned over two years with countless iterations. I never got the robot to take more than a few shaky steps, but those steps felt better than anything else I'd experienced. These robotics projects inspired a love for engineering that I could not have found anywhere else. I saw my skills grow and looking back, I've come so far. I know my kid self would be very proud of where I am now.