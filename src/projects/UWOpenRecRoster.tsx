import { DateTime } from "luxon";
import { Tech } from "../types/TechTypes";
import { ArticleData, ArticleType } from "../types/ArticleTypes";

const now: string = DateTime.now().toISODate();

const recwell_schedule_link: string = "https://uwmadison.emscloudservice.com/web/CustomBrowseEvents.aspx?data=meoZqrqZMvHKSLWaHS%2f4bjdroAMc1geNvtL12O1chw1fIP%2bOGy79Y1bkm2DPPKqmpSFHyPvFHX3LAJJHEfBPycyxctYlpcHD4rIwd%2byAtBNWXsKhJT9UDchzs%2bSc3Ze6JFHimlPlQrL2Jk7LFEkj3FoTWmA0BKzQQk0%2beDFO2IBZSiNnDXPGZQ%3d%3d";

const content: JSX.Element = <>
    <h2>The Problem</h2>
    <p>I play basketball 3 days a week, every week, for the last two years. Too many times I've come to one of my school's two gyms and realized that all of the basketball courts have been reserved that day. This is beyond annoying for myself and all the others that play. This has forced us to read the school's online gym schedule... but it sucks. Look for <a href={recwell_schedule_link} target="_blank">yourself</a></p>

    <p>The main issues I had with the site were that it was:</p>
    <ol>
        <li>Hard to navigate</li>
        <li>Not mobile-friendly</li>
        <li>Difficult to read</li>
        <li>And it had separate sites for both gyms</li>
    </ol>
    <h2>The Goal</h2>
    <p>The goal was to create a <span className="text-bold">single website</span> which allows for <span className="text-bold">easy viewing</span> of the court schedules between both of UW-Madison's gyms available for both <span className="text-bold">web and mobile</span>. I really wanted users to be able to look at the website for a few seconds and understand which courts were open and when and be able to determine which gym they should go to.</p>
    <h2>The Solution</h2>
    <p>I would create a website which displayed the schedules <span className="underline">visually</span>.</p>
    <h2>Implementation</h2>
    <p>This project had two main challenges: creating a good user interface and finding a way to get the schedule to the users.</p>
    <p>At first I began making the frontend. I choose to use React as my frontend library (as it was all I knew at the time). After a few weeks I</p>
    <h2>Challenges</h2>
    <p>When I first began that project I thought that the UI would be the hardest part of the project; I was wrong.</p>
    <h3>Where to get the schedule data?</h3>
    <p>The first major challenge I encountered was figuring out where the data was coming from. I first thought that I would need to webscrape, but after realizing how horrible that would be I talked to one of my friends and they told me about the network tab in the browser's debug console. This tab contains all the network request which a website makes. This meant that I could figure out exactly where the schedule was coming from. After some digging I found a POST request to "https://uwmadison.emscloudservice.com/web/AnonymousServersApi.aspx/CustomBrowseEvents" which returned a large json file containing the court schedules.</p>
    <p>Perfect, now I could make the same call in my website. I coded it all up and then got a strange error that I hadn't heard of... CORS??? I did some research and here is what I found.</p> 
    <h3>CORS</h3>
    <p>CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that protects APIs by only allowing certain domains (websites) from gathering their information. This is to prevent a copycat website from gathering your information and using it maliciously in real systems.</p>
    <p>For example, your grandmother wants to transfer you $50 via usbank.com for your birthday. However, she visits a copycat site called usabank.com set up by a hacker. She inputs all her personal banking information into this website to try and transfer the money. She sends the money, but you never received it because in the data that the website sent to usbank.com's server, the hacker replaced your bank account with theirs.</p>
    <p>To combat this, browsers and servers interact with each other before certain types of requests. A server will have a white list of domains, urls of websites, that are allowed to make requests (like transferring money). The browser will send a ping to the server asking if usabank.com can make a request. The server will ping back no and the browser then knows that this is a cross-origin request and not make the full request. If it was usbank.com ping their own backend, the server would say ok and then the browser woould know to complete the full request.</p>
    <p>Unfortunately, the recwell backend has set up CORS to only allow their website to be able to fetch information. This meant that I could not simply call their server's from my website, I would have to make a proxy</p>
    <h3>Creating a Proxy</h3>
    <p>A proxy is a intermediary site that sits between two other sites, relaying requests and responses between the two. In my case I had to set up a proxy between my website and the recwell servers. I made the proxy in express.js, a simple server library for javascript. Voila, I was able to fetch the schedules.</p>
    <h3>Deployment</h3>
    <p>Preface: This was by far the worst part of the project. I deployed this with horrible practices and will be revamping the deployment pipeline with Docker and Github actions. I have learned a lot since.</p>
    <p>The final part of the project was getting the proxy online. I decided to use DigitalOcean as my hosting service. Here I explored Linux for time and learned all the commands. I, not knowing any better, decided to copy and paste all my code to the proxy. Everytime that I needed to make an update, <span className="italic">which was often</span>, I had to manually copy all my files (if only i knew the scp command).</p>
    <p>I then struggled my way around getting software to work like pm2 (which would automatically restart and run my backend if it crashed), SSL certifications via certbot (required cryptographic certificates to encrypting requests - HTTPS), and setting up my domain names.</p>
    <h2>What I Would Change</h2>
    <p>Looking back on this project a year later, I made more mistakes than I could count.</p>
    <h3>UI</h3>
    <p>While functional, the UI is both ugly and is doing too much.</p>
    <p>The core of this project was to display court schedules. Looking back, I don't need the filtering buttons. These just present clutter, especially for mobile users who may not even see the schedules when first visiting the site. Also, I feel that I don't need the text at the top. I can remove this and users will be able to infer the functionality of the site. I may only need a small little hint to tell them they can press an event for a pop up with exact details.</p>
    <p>It is ugly, there isn't much to say about it. This was my first ever website design and it shows.</p>
    <h3>Deployment</h3>
    <p>I almost gave up on this project because the deployment process was so painful. If I were to do this over, I would certainly have set up github actions and docker. I used the actions combo and docker on this website and it has made development so much easier.</p>
    <h3>Backend Framework</h3>
    <p>I would also have used a backend framework. Right now, this project is running on very delicate javascript code that I wrote with only a few months of experience. I woould prefer to have a much more stable and reliable backend powering my proxy.</p>
</>

export const UWOpenRecRosterProject: ArticleData = {
    id: 0,
    title: "UWOpenRecRoster",
    description: "How I fixed my schools court shedule problem",
    starred: true,
    created: now,
    published: now,
    modified: now,
    image: "https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//UWOepnRecRoster.png",
    content: content,
    technologies: [Tech.SQL, Tech.React],
    article_type: ArticleType.project
};