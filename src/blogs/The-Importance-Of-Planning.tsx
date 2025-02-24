import { DateTime } from "luxon"
import { ArticleData, ArticleType } from "../types/ArticleTypes";

const content: JSX.Element = <>
    <p>As a student, I am far too familiar with this image, being flashed on a slideshow presentation at the start of every semester. I can hear the professor explaining the importance of the SDLC as I am not paying attention - an experience I know I share with many of my classmates... However, the cost of ignoring this diagram during the formative years of my coding progression has cost me months of excess programming and years off of my life. In this blog I want to talk about the SLDC and some tips that help me start a project off right.</p>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//SadLectureHall.png" />
    <p>The SDLC is the software development lifecycle, a framework for creating software that the tech industry has used for decades. Typically, there are six phases of the SLDC: planning, analysis, design, implementation, testing, and maintenance. For the last two years I actually skipped the first three planning steps, starting at implementation. I want to talk about these first three stages, planning analysis, and design, under the broader umbrella of planning.</p>
    <p>Why is planning important? Why does it matter? Let's compare programming to an ice breaking game: the marshmallow tower. In this game, your goal is to build the tallest tower with limited pieces of spaghetti and marshmallows in 5 minutes. You and your partners start building the first 3 layers of your tower, taking 3 minutes, awesome. But, you see wobbling in your tower. What do you do? You could continue building the next layer and risk the entire tower collapsing, breaking some spaghetti and tearing some marshmallows. If the tower collapses, you have no chance of winning. Or you could try to reinforce the base, but this takes valuable time and resources, you'll only get to a fourth layer. You decide to build the next two layers and the tower crumbles spectacularly. Haha, the icebreaker worked and you had a good laugh with some new friends.</p>
    <p>It turns out that software development is very close to this game. Software itself is like this tower. Each part of a system depends on everything below it. However, coding the first three levels of your system will take 3 months, and you have a 5 month deadline, and you need to get 5 levels, or you are fired and the company loses millions of dollars. Stakes are a bit higher. Do you really want to risk building the first three levels to find out that your database might not be able to handle the expected load of the users? If you try to reinforce this it will take a month. Will you have enough time to build the last two layers? You decide to not reinforce the base and build the last two layers. Are you feeling OK on launch day? A little queasy I'd imagine.</p>
    <p>This is a very dramatic example, but it gets the point across - planning is a valuable skill for programmers and an important step in the development process. I've slowly come to realize this and have found that these tips/rules help me structure my software development.</p>
    <h3>1. No coding on the first day</h3>
    <p>I am always eager to start a project and begin coding. It feels great to see simple functionality coming to life, but this is a trap. I have noticed that for a majority of my projects I end up deleting or rewriting my first day's work. Because I haven't planned and designed my system, I don't know how this initial code is supposed to integrate with future components.</p>
    <p>Back to the example, if you instead spent the first two weeks planning, you realize that you expect a million users a day and will need a database that can handle 1000 terabytes of information daily. This little step back prevents pushing flimsy systems and prevents backtracking/rewriting. It also saved your job.</p>
    <p>If code written on the first day is more likely to be problematic in the future or be rewritten, why write it in the first place? Spend, at least, the first day planning; NO CODING ON THE FIRST DAY!</p>
    <h3>2. Write it down</h3>
    <p>This step is very simple, I write down exactly what I want my system to do. This will specify the scope of the project, preventing it from prolonging and prolonging because of superfluous, new features.</p>
    <h3>3. Draw it out</h3>
    <p>Next draw... I draw on anything and everything: paper, whiteboard, figma, excalidraw, ms paint, it doesn't matter. I draw out the different parts of the system and what they do. I draw the connections between components, what these connections are doing, and what they expect. This part of the design can actually find many flaws early on. Am I sticking to my scope? Are my components getting what they're expecting from other components? Am I missing a component? For logical programs I also like to trace a problem, trying to break it at every turn, and hopefully uncovering some bugs.</p>
    <h3>4. TODOs</h3>
    <p>After creating these blueprints, it is time to break these down into small, manageable tasks. Personally, I put these on sticky notes and hang them on the wall over my computer and litter them around my room. For professionals, this is a Jira board. What creating these TODOs does is provide direction on what to do while coding. You don't have to think holistically, but just on the task at hand. The less external thinking while coding, the better. This also ensures that you will hit all the marks of your designs. And most importantly, it provides a sense of accomplishment and motivation seeing your progress, even if you can't see any differences in the project.</p>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//rm-rf-Cannon-Event.png" />
    <p>Ultimately however, for other students and young developers like me, they won't treat the planning process seriously until they have a project that blows up in their face and have to completely rewrite their codebase. I hope that I was able to convey the importance of planning a project and helped you in that process. There are a million different ways to plan, but not coding on the first day, writing down my scope, drawing my system, and creating manageable tasks has helped me immensely in the construction of this site! If there is one piece of advice I would like others to take away from this it is...</p>
    <p>please...</p>
    <p>please...</p>
    <p>don't code on the first day</p>
</>

const created: DateTime = DateTime.fromObject(
    { year: 2025, month: 2, day: 23, hour: 15, minute: 0, second: 0 },
    { zone: "America/Chicago" }
);
const published: DateTime = DateTime.fromObject(
    { year: 2025, month: 2, day: 24, hour: 7, minute: 0, second: 0 },
    { zone: "America/Chicago" }
);
const modified: DateTime = created;

export const TheImportanceOfPlanningBlog: ArticleData = {
    id: 0,
    title: "The Importance of Planning",
    description: "How spending a day of planning can save you weeks in your project",
    starred: true,
    created: created,
    published: published,
    modified: modified,
    image: "https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//SpidermanGlassesSDLCMeme.png",
    content: content,
    technologies: [],
    article_type: ArticleType.blog
};