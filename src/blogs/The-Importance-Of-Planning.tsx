import { DateTime } from "luxon"
import { BlogData } from "../types/BlogTypes"

const now: string = DateTime.now().toISODate();

const content: JSX.Element = <>
    <p>In my first ever programming project I attempted to create a reinforcement learning bot to play my favorite video game. I bought books and online courses to learn python and ml. I got surprisingly far into the project and was able to capture the video output of the game. However, the project died when I learned that laptops do NOT have GPUs. Where did I go wrong? Well apart from being a programming noob, I hadn't followed the first few steps of the software development lifecycle, the SDLC</p>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//SadLectureHall.png" />
    <p>As a student, I am far too familiar with this image, being flashed on a slideshow presentation at the start of every semester. I can hear the professor explaining the importance of this picture as I am not paying attention - an experience I know I share with many of my classmates... However, the cost of blowing off this diagram has cost me days of excess programming and months off of my life from stress.</p>
    <p>The SLDC is a general framework for creating software. Typically, there are 6 phases: planning, analysis, design, implementation, test and implementation, and maintenance. I want to talk about the two parts of the SLDC that I neglected the most: Planning and Design.</p>
    <p>Planning is the process of defining the scope of a project: stating exactly what you want your system to do. Designing is the process of planning the system itself: how do the different parts of the program interact? Objects or functional? What language? Will I host it? I have developed 5 rules to help myself and hopefully will help others trying to integrate the planning and design process into their next project.</p>
    <h3>1. No Code</h3>
    <p>DO NOT CODE ON THE FIRST DAY! I have found that throughout my projects, the code that I create on the first day is always, always rewritten due to a poor system design. The first day of a project is about thinking big picture and brainstorming. This is the planning day. What exactly do I want my project to do? How will I deploy it? When do I want this done by?</p>
    <h3>2. Use a Whiteboard</h3>
    <p>... or pencil and paper / excalidraw to draw out your system. Draw boxes representing the different components and arrows connecting them. What do these parts do? What do the expect? I always make this a very lofi drawing.</p>
    <h3>3. Solve a Problem By Hand</h3>
    <p>Solve a problem by hand, tracing through the program you loosely drew above. This shows what kind of data structures and input/output the program expects. This will by nature increase the fidelity of your initial drawing. Now you have a system blueprint.</p>
    <h3>4. Define Interfaces and functions</h3>
    <p>Finally, I begin to code. I work to define interfaces and functions of my system - a skeleton. Defining the skeleton of the code will make me enforce my blueprint and keep me on track.</p>
    <h3>5. TODOs</h3>
    <p>My last rule is to then break down the project into a collection of simple tasks. I like to keep these on sticky notes on the wall next to my desk. This way I can look up and grab the next task. More professionally this is done on a site like JIRA. Having a ticketing system has actually greatly increased my productivity as you continue to feel that you are making progress, staying motivated.</p>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//rm-rf-Cannon-Event.png" />
    <p>Ultimately however, for other students and young developers like me, they won’t treat the planning process seriously until they have a project that blows up in their face and have to completely rewrite their codebase. I hope that I was able to convey the importance of planning a project and helped you in that process. There are a million different ways to plan, but this is the method that I have found useful. In a year I probably will have a completely different process and coding is a continuous learning and experimenting process. If there is one piece of advice I would like others to take away from this is...</p>
    <p>please...</p>
    <p>please...</p>
    <p>don't code on the first day</p>
</>

export const TheImportanceOfPlanningBlog: BlogData = {
    id: 0,
    title: "The Importance of Planning",
    description: "How spending a day of planning can save you weeks in your project",
    starred: true,
    created: now,
    published: now,
    modified: now,
    image: "https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//SpidermanGlassesSDLCMeme.png",
    content: content
};