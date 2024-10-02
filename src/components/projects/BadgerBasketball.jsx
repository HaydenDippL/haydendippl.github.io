import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

import BakkeScheduleLedger from '../../assets/BakkeScheduleLedger.png'
import WebsiteConcept from '../../assets/WebsiteConcept.jpg'
import MobileAppConcept from '../../assets/MobileAppConcept.jpg'
import WebScreenShot from '../../assets/WebScreenshot.png'
import MobileWebScreenShot from '../../assets/MobileWebScreenshot.png'

import GitHubLink from '../GitHubLink'
import Link from '../Link'

import '../../styles.css'
import '../../styles/Projects.css'
import '../../styles/D3.css'

const BADGER_BASKETBALL_GIT_REPO_URL = 'https://github.com/HaydenDippL/BadgerBasketball'
const UW_OPEN_REC_ROSTER_URL = 'https://www.uwopenrecroster.com'
const DIGITAL_OCEANS_LOGO_URL = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fdigitalocean-logo-png-open-2000.png&f=1&nofb=1&ipt=5691adca57348f15ddb304f3368b0042ab34898820b74e16f3c5d1d5b0447a34&ipo=images'
const REACT_LOGO_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseeklogo.net%2Fwp-content%2Fuploads%2F2020%2F09%2Freact-logo.png&f=1&nofb=1&ipt=a316d2c9e3f1784d1cd73ef71b111f8f0b54ab8d089b9ea0981e0b0d53a35bd7&ipo=images'
const DREAM_HOST_LOGO_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fdreamhost-logo-png-transparent.png&f=1&nofb=1&ipt=22a54570e8723013b89a9a64110c738ebf9e79c8bf09f7c72e4a1bb694d27c9f&ipo=images'
const ANDROID_LOGO_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fandroid-logo-png-transparent.png&f=1&nofb=1&ipt=d4bb88cb5edd1abafe91a76247865a6adec2f64c893f46b63b5fcea9e5873a2d&ipo=images'
const APPLE_LOGO_URL = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flofrev.net%2Fwp-content%2Fphotos%2F2016%2F05%2Frainbow-apple-logo.png&f=1&nofb=1&ipt=c42589023ade19f27d32af95a76eb8d965e225c53f38bd0be3b03954aa50695d&ipo=images'

function BadgerBasketball() {
    const [analytics, set_analytics] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('get_total_visits', true)
        params.append('get_total_users', true)
        params.append('get_total_queries', true)
        params.append('get_daily_users', true)

        fetch("https://www.uwopenrecrosterbackend.xyz/analytics?" + params)
            .then(res => res.json())
            .then(data => {
                data.daily_users.sort((a, b) => new Date(a.date_of_queries) - new Date(b.date_of_queries))
                data.daily_users.forEach(d => d.date_of_queries = d.date_of_queries.substring(0, 10))
                set_analytics(data)
            })
    }, [])

    useEffect(() => {
        const line_plot_div = document.getElementById('daily-visits-line-plot')
        if (line_plot_div && line_plot_div.children.length <= 0 && analytics !== null) daily_visits_line_plot(analytics.daily_users)
    }, [analytics])

    return <div className='dark centered'>
        <h1 className='title'>UW Open Rec Roster</h1>
        <div className='hbox'>
            <GitHubLink link={BADGER_BASKETBALL_GIT_REPO_URL} size={70}/>
            {/* <Link link={UW_OPEN_REC_ROSTER_URL} size={70}/> */}
            <Link message="Site is currently under maintenance" size={70}/>
        </div>
        <p style={{fontSize: '12px'}}>*Links to git repo and website</p>
        <div className='hbox' style={{marginTop: '10vh'}}>
            <div className='left' style={{width: '40vw'}}>
                <h2 className='pre-header'>THE PROBLEM</h2>
                <p className='header'>The gym websites were extremely user-unfriendly</p>
                <ol className='text'>
                    <li>Hard to navigate</li>
                    <li>Mobile Incompatibility</li>
                    <li>Impossible to read</li>
                    <li>Separate sites for both gyms</li>
                </ol>
                <p></p>
            </div>
            <img src={BakkeScheduleLedger} style={{
                margin: '30px',
                width: '40vw',
                height: 'auto',
                borderRadius: '20px'
            }}/>
        </div>
        <div className='hbox' style={{
            marginTop: '10vh',
            marginBottom: '10vh'
        }}>
            <img src={WebsiteConcept} style={{
                height: '50vh',
                width: 'auto',
                margin: '20px',
                borderRadius: '20px'
            }}/>
            <div className='left' style={{
                maxWidth: '35vw'
            }}>
                <p className='pre-header'>THE IDEA</p>
                <h2 className='header'>Create a Visual Schedule</h2>
                <p className='text'>I wanted to create a website where a user could read the schedules at a glance 👀</p>
            </div>
            <img src={MobileAppConcept} style={{
                height: '60vh',
                width: 'auto',
                marginTop: '10vh',
                borderRadius: '20px'
            }}/>
        </div>
        <div className='hbox mega-margin'>
            <div className='left' style={{width: '30vw', marginBottom: '-50px'}}>
                <p className='pre-header'>How I Built</p>
                {/* <a href={UW_OPEN_REC_ROSTER_URL} style={{marginBottom: '5vh'}}><h2 className='header'>UW Open Rec Roster</h2></a> */}
                <h2 className='header' style={{marginBottom: '5vh'}}>UW Open Rec Roster</h2>
                <p className='text'>I created the website as a React app, hosted on DigitalOceans with a domain name from DreamHost. It is able to display all 8 court schedules for each of the gyms at UW-Madison: Bakke and Nick.</p>
                <p className='text'>The backend, built with <strong>express.js</strong>, uses server-size memoization to more efficiently handle requests, and uses logging to track user activity on the site on a <strong>TiDB server</strong>.</p>
            </div>
            <div className='vbox' style={{marginRight: '1vw'}}>
                <img className='digital-oceans' src={DIGITAL_OCEANS_LOGO_URL} height='100' width='100'/>
                <img className='react' src={REACT_LOGO_URL} height='100' width='100'/>
                <img className='dream-host' src={DREAM_HOST_LOGO_URL} height='80' width='80'/>
            </div>
            <img src={WebScreenShot} style={{
                width: '40vw',
                height: 'auto',
                borderRadius: '20px'
            }}/>
        </div>
        <div className='hbox mega-margin'>
            <div className='hbox' style={{alignItems: 'center'}}>
                <div className='vbox' style={{marginRight: '2vw'}}>
                    <img className='android' src={ANDROID_LOGO_URL} height='180'/>
                    <img className='ios' src={APPLE_LOGO_URL} height='180'/>
                </div>
                <img src={MobileWebScreenShot} style={{
                    height: '70vh',
                    width: 'auto',
                    borderRadius: '20px'
                }}/>
            </div>
            <div className='left' style={{marginLeft: '2vw'}}>
                <div className='left' style={{maxWidth: '35vw'}}>
                    <h2 className='big-header'>Mobile Friendly!</h2>
                </div>
                    <div className='left' style={{maxWidth: '35vw'}}>
                    <p className='text'>UW Open Rec Roster is able to be viewed on both Android and iOS devices as well as Google Pixels. It uses conditional rendering for mobile devices, and also iOS devices, to create a smoother experience for the user.</p>
                </div>
            </div>
        </div>
        <div className='vbox'>
            <h2 className='big-header'>And People Actually Use It</h2>
            <div className='hbox'>
                <div id='daily-visits-line-plot' style={{height: '370px'}}/>
                <div className='hbox header'>
                    <div className='left'>
                        <p className='close-text fat'>Total Users</p>
                        <p className='close-text fat'>Total Visits</p>
                        <p className='close-text fat'>Schedules Displayed</p>
                    </div>
                    <div className='left'>
                        {analytics && <p className='close-text skinny'>{analytics.total_users}</p>}
                        {analytics && <p className='close-text skinny'>{analytics.total_visits}</p>}
                        {analytics && <p className='close-text skinny'>{analytics.total_queries}</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function daily_visits_line_plot(data) {

    // Set dimensions and margins for the chart
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 770 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Set up the x and y scales
    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    // Set up the line generator
    const line = d3.line()
        .x(d => x(d.date_of_queries))
        .y(d => y(d.daily_users));

    // Create the SVG element and append it to the chart container
    const svg = d3.select('#daily-visits-line-plot')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // create tooltip div

    const tooltip = d3.select('#daily-visits-line-plot')
        .append("div")
        .attr("class", "tooltip");

    // Parse the date and convert the population to a number
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(d => {
        d.date_of_queries = parseDate(d.date_of_queries);
    });

    // Set the domains for the x and y scales
    x.domain(d3.extent(data, d => d.date_of_queries));
    y.domain([0, d3.max(data, d => d.daily_users)]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .style("font-size", "14px")
        .call(d3.axisBottom(x)
            .tickValues(x.ticks(d3.timeDay.every(5))) // Display ticks every 5
            .tickFormat(d3.timeFormat("%b %d"))) // Format the tick labels to show Month and Year
        .call(g => g.select(".domain").remove()) // Remove the x-axis line
        .selectAll(".tick line") // Select all tick lines
        .style("stroke-opacity", 0)
    svg.selectAll(".tick text")
        .attr("fill", "#777");

    // Add vertical gridlines
    svg.selectAll("xGrid")
        .data(x.ticks().slice(1, -1))
        .join("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5);

    // Add the y-axis
    svg.append("g")
        .style("font-size", "14px")
        .call(d3.axisLeft(y)
        .ticks((d3.max(data, d => d.daily_users)) / 10)
        // .tickFormat(d => {
        //     if (isNaN(d)) return "";
        //     return `${(d / 1000).toFixed(0)}k`;
        // })
        .tickSize(0)
        .tickPadding(10))
        .call(g => g.select(".domain").remove()) // Remove the y-axis line
        .selectAll(".tick text")
        .style("fill", "#777") // Make the font color grayer
        .style("visibility", (d, i, nodes) => {
            if (i === 0) {
                return "hidden"; // Hide the first and last tick labels
            } else {
                return "visible"; // Show the remaining tick labels
            }
        });

    // Add Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#777")
        .style("font-family", "sans-serif")
        .text("Visits");

    // Add horizontal gridlines
    svg.selectAll("yGrid")
        .data(y.ticks((d3.max(data, d => d.daily_users)) / 10).slice(1))
        .join("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5)

    // Add the line path
    const path = svg.append("path")
        .datum(data)
        .attr("d", line);

    // Add a circle element

    const circle = svg.append("circle")
        .attr("r", 0)
        .attr("fill", "steelblue")
        .style("stroke", "white")
        .attr("opacity", .70)
        .style("pointer-events", "none");
    // create a listening rectangle

    const listeningRect = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .classed("listening-rect", true)

    // create the mouse move function

    listeningRect.on("mousemove", function (event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.date_of_queries).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.date_of_queries > d1.date_of_queries - x0 ? d1 : d0;
        const xPos = x(d.date_of_queries);
        const yPos = y(d.daily_users);


        // Update the circle position

        circle.attr("cx", xPos)
        .attr("cy", yPos);

        // Add transition for the circle radius

        circle.transition()
        .duration(50)
        .attr("r", 5);

        // add in  our tooltip

        tooltip
        .style("display", "block")
        .style("left", `${xPos}px`)
        .style("top", `${yPos}px`)
        .html(`<strong>Date:</strong> ${d.date_of_queries.toLocaleDateString()}<br><strong>Daily Visits:</strong> ${d.daily_users}`)
    });
    // // listening rectangle mouse leave function

    listeningRect.on("mouseleave", function () {
        circle.transition()
        .duration(50)
        .attr("r", 0);

        tooltip.style("display", "none");
    });

    // Add the chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", margin.left + 160)
        .attr("y", margin.top - 100)
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Daily Visits");
}

export default BadgerBasketball