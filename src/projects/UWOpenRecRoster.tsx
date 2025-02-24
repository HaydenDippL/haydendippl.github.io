import { DateTime } from "luxon";
import { Tech } from "../types/TechTypes";
import { ArticleData, ArticleType } from "../types/ArticleTypes";

const recwell_schedule_link: string = "https://uwmadison.emscloudservice.com/web/CustomBrowseEvents.aspx?data=meoZqrqZMvHKSLWaHS%2f4bjdroAMc1geNvtL12O1chw1fIP%2bOGy79Y1bkm2DPPKqmpSFHyPvFHX3LAJJHEfBPycyxctYlpcHD4rIwd%2byAtBNWXsKhJT9UDchzs%2bSc3Ze6JFHimlPlQrL2Jk7LFEkj3FoTWmA0BKzQQk0%2beDFO2IBZSiNnDXPGZQ%3d%3d";

const content: JSX.Element = <>
    <p>Repo: <a href="https://github.com/HaydenDippL/BadgerBasketball" target="_blank">https://github.com/HaydenDippL/BadgerBasketball</a></p>
    <h2>The Problem</h2>
    <p>Every week I and hundreds of other students head to the gyms at UW-Madison to play basketball. However, nothing is more annoying than realizing that we can't play basketball because all the courts have been reserved for intramural sports, clubs practices, or others events. This forces us to read the school gyms' online schedule, or rather try... because it sucks. Look for <a href={recwell_schedule_link} target="_blank">yourself</a>.</p>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//RecwellLedger.gif" alt="Ledger gif" />
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//MobileRecwellLedger.webp" className="h-96" alt="mobile view" />
    <p>These "schedules" are overwhelming and unintuitive, pushing many users away to artbitrarily choose which gym to go to. The main flaws that I see in Recwell's website are:</p>
    <ol>
        <li>It is hard to navigate. The <a href="https://recwell.wisc.edu/locations/bakke/" target="_blank">recwell gym website</a> requires users to find and follow two additional links to get to the court schedules.</li>
        <li>It is not mobile-friendly. Mobile users can't even see which courts are open and which aren't as that information is collapsed on smaller screens.</li>
        <li>It is difficult to read. The schedules online don't just contain the court schedules, but all the other facilities in that gyms such as the ice rink, esports rooms, pools, etc... This causes massive clutter and a lot of reading.</li>
        <li>Recwell has separate sites for both gyms, making it more difficult to determine which gym has the most open courts for basketball.</li>
    </ol>
    <p>In this article I will show how I planned to fix Recwell's site, how I implemented my solution and challenges along the way, and the final product.</p>
    <h2>The Goal</h2>
    <p>The goal was to create a <span className="text-bold">single website</span> which allows for <span className="text-bold">easy viewing</span> of the court schedules between both of UW-Madison's gyms available for both <span className="text-bold">web and mobile</span>. I really wanted users to be able to look at the website for a few seconds and understand which courts were open and when and be able to determine which gym they should go to.</p>
    <h2>Implmentation and Challenges</h2>
    <p>When I first began that project I thought that the UI would be the hardest part of the project; I was wrong. I blitzed through the development of the frontend with React and Javascript and found that the backend was where the challenge lied.</p>
    <h3>Where to get the schedule data?</h3>
    <p>The first major challenge I encountered was figuring out where the data was coming from. I first thought that I would need to webscrape this data, but realized how horrible and inefficient this would be. After talking to one of my friends, they told me about the network tab in the browser's developer tool suite. This tab contains all the network request which a website makes. This meant that I could figure out exactly where the schedule data was coming from. After some digging I found a POST request to "https://uwmadison.emscloudservice.com/web/AnonymousServersApi.aspx/CustomBrowseEvents" which returned a large json file containing the court schedules.</p>
    <p>Perfect, now I could make the same call in my website, but this produced a strange error that I hadn't heard of... CORS???</p> 
    <h3>CORS</h3>
    <p>CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that protects APIs by only allowing certain domains (websites) from gathering their information. This is to prevent a copycat website from gathering your information and using it maliciously in real systems.</p>
    <p>For example, your grandmother wants to transfer you $50 via usbank.com for your birthday. However, she visits a copycat site called usabank.com set up by a hacker. She inputs all her personal banking information into this website to try and transfer the money. She sends the money, but you never received it. The hacker's site replaced the recipient of the money to themselve in the request and sent it to usbank's servers where it was accepted.</p>
    <p>To combat this, browsers and servers interact with each other before certain types of requests. A server will have a white list of domains, urls of websites, that are allowed to make requests (like transferring money). The browser will send a ping to the server asking if usabank.com can make a request. The server can either response with an OK response or a CORS error. If the browser receives a CORS error, it knows that the server doesn't accept requests from the website, and blocks the request. If the browser receives an OK response, it will continue and send the full request.</p>
    <p>Unfortunately, the recwell backend has set up CORS to only allow their website to be able to fetch information. This meant that I could not simply call their server's from my website, I would have to make a proxy.</p>
    <h3>Creating a Proxy</h3>
    <p>A proxy is a intermediary server that sits between two other server, relaying requests and responses between the two. A proxy is useful in this case because it bypasses CORS: a security feature in browsers, but not a pure server. In my case I had to set up a proxy between my website and the recwell servers. I made the proxy with express.js, a simple server library for javascript. Voila, I was able to fetch the schedules on my proxy and send them to my website.</p>
    <h3>Deployment</h3>
    <p>The final part of the project was getting the proxy online. I decided to use DigitalOcean as my hosting service. I, not knowing any better, decided to copy and paste all my code to the proxy. Everytime that I needed to make an update, <span className="italic">which was often</span>, I had to manually copy all my files (if only i knew the scp command).</p>
    <p>I then struggled my way around getting software to work like pm2 (which would automatically restart and run my backend if it crashed), SSL certifications via certbot (required cryptographic certificates for encrypting requests - HTTPS), and setting up my domain names.</p>
    <h3>Rate Limiting</h3>
    <p>While setting up my proxy I came across a server setting: rate limiting. Rate limiting is a security practice in which servers keep track of who is requesting data and limit how many times they can call the server in a set time period. I worried that if my app got too popular, my proxy would make too many requests to the RecWell backend, which could cause it to get rate limited, preventing users from getting the schedule data on my website.</p>
    <p>This forced me to have to memoize responses from the recwell servers. I stored parsed schedules up to, two weeks in the future, in a sqlite database. Everytime a user requested a schedule, I would check how long it has be memoized. If it was less than 4 hours old, I would send the schedule as is. If the schedule was over 4 hours old, I would fetch and memoize a new schedule and forward that back to users. At the end of every day, I would wipe the table as to not cause storage issues of old schedules.</p>
    <h2>The Result</h2>
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//UWOpenRecRosterWebScreenshot.webp" alt="UWOpenRecRoster web screenshot" />
    <img src="https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//UWOpenRecRosterMobileScreenshot.PNG" className="h-96" alt="UWOpenRecRoster mobile screenshot" />
    <p><a href="https://uwopenrecroster.com" target="_blank">UWOpenRecRoster.com</a> is up and running. It solves all the issues of the Recwell site.</p>
    <ol>
        <li>UWOpenRecRoster requires a single link to use and find the court information, unlike recwell's three links.</li>
        <li>My website is mobile-friendly. For mobile users it conditionally renders the web page for better accessibility and navigation.</li>
        <li>It is infinitely easier to read a schedule with the visual table.</li>
        <li>Both gyms have their court schedules displayed side-by-side, allowing users to easily determine which gym has more courts available for their desired open rec activity.</li>
    </ol>
    <h2>What I Would Change</h2>
    <p>Looking back on this project a year later, I made more mistakes than I can count. I plan on revamping the site sometime soon.</p>
    <h3>UI</h3>
    <p>While functional, the UI is both ugly and is doing too much.</p>
    <p>The core of this project was to display court schedules. Looking back, I don't need the filtering buttons. These just present clutter, especially for mobile users who may not even see the schedules when first visiting the site. Also, I feel that I don't need the text at the top. I can remove this and users will be able to infer the functionality of the site. I may only need a small little hint to tell them they can press an event for a pop up with exact details.</p>
    <p>It is ugly, there isn't much to say about it. This was my first ever website design and it shows.</p>
    <h3>Deployment</h3>
    <p>I almost gave up on this project because the deployment process was so painful. If I were to do this over, I would certainly have set up github actions and docker. I used the actions combo and docker on this website and it has made development so much easier.</p>
    <h3>Backend Framework</h3>
    <p>I would also have used a backend framework. Right now, this project is running on very delicate javascript code that I wrote with only a few months of experience. I woould prefer to have a much more stable and reliable backend powering my proxy.</p>
</>

const created: DateTime = DateTime.fromObject(
    { year: 2025, month: 2, day: 24, hour: 1, minute: 0, second: 0 },
    { zone: "America/Chicago" }
);
const published: DateTime = DateTime.fromObject(
    { year: 2025, month: 2, day: 24, hour: 7, minute: 0, second: 0 },
    { zone: "America/Chicago" }
);
const modified: DateTime = created;

export const UWOpenRecRosterProject: ArticleData = {
    id: 0,
    title: "UW Open Rec Roster",
    description: "How I fixed my UW-Madison's court shedule problem",
    starred: true,
    created: created,
    published: published,
    modified: modified,
    image: "https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//UWOepnRecRoster.png",
    content: content,
    technologies: [Tech.SQL, Tech.React],
    article_type: ArticleType.project
};