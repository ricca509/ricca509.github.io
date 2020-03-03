import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../components/about-me";
import WorkExperience from "../components/work-experience";
import SideProject from "../components/side-project";
import Markdown from "markdown-to-jsx";

const burberry = {
  company: "Burberry",
  role: "Lead Developer (Consultant)",
  dates: "Jan 2019 - Present [London, United Kingdom]",
  description: `I joined to help shape the new micro front end architecture, part of the wider re-platforming of Burberry’s ecom. During my contract I led two of our distributed teams of developers, located in Minsk and Shanghai, while working with stakeholders and designers in-house. Day to day activities with the team included working on stories, mentoring other team members, reviewing merge requests, working with the BA to review stories and prepare sprint goals and working with the designers to make sure all the edge cases were included.

  Particular focus was also put on working with all teams overseas to agree on high level solutions and create a consistent workflow that all our teams could follow. Consistency and simplicity were key, to ensure that the cognitive load was kept to a minimum and the code produced would follow our standards regardless of where it was produced.
  
  As part of my assignment, I also worked closely with the design team to help build the company’s design system: from defining the key strategy and technologies to use to building a set of design tokens to be used across web, email and native apps.`,
  technologiesArray: [
    "React",
    "Redux",
    "redux-saga",
    "Next.js",
    "Gatsby",
    "JAMStack",
    "SASS",
    "Styled components",
    "Backpack",
    "style-dictionary",
    "Cypress",
    "GitLab",
    "GitLab CI",
    "AWS",
  ],
};

const trainlineLead = {
  company: "Trainline",
  role: "Development Team Lead",
  dates: "Nov 2016 - Dec 2018 [London, United Kingdom]",
  description: `I was promoted to Team Lead to focus on our complete re-platforming (going from monolithic .NET backend and React FE to .NET microservices and Node/React micro-frontends). As part of the role I created a new team, made the required hiring and worked more with POs/BAs. I’ve kept my position strongly technical (at least 70% coding) as I believe the team lead should be part of the sprint as everyone else.

My impact area widened, focusing on giving the team the stability and continuity that it needed to deliver high quality software respecting the company's deadline. Given the small size of the squad, this has been achieved by wearing different hats at different times, to ensure that all the required functions were present when needed:

- Helping with BA functions: our lead BA has been shared with other squads for
  most of the time and I've helped in making sure every sprint had a clear
  direction and refined stories.
- Helping with recruiting: making sure we have the right people, especially in such a small squad, is crucial, this is why I have spent a lot of time finding a new hiring process to suit our needs.
- Helping with devOps work: I have constantly driven the work on the devops
  side, making sure that our pipeline and automated processes run smoothly
  and give the developers the confidence they need as quickly as possible. For instance, our E2E tests are now running in parallel saving 50% of time each build, and the total build time has gone from 19' to about 7-8'. These means quicker feedbacks, more PRs closed during the day and ultimately a higher velocity
- Driving innovation to support the product: the only way to really improve
  software is to first use it in anger. For this reason we organized “3G days” and “No Chrome days”, to push developers and QAs to confront with real world scenarios: this has already driven improvements across different browsers
- Mentorship and internal growth: I spent time bringing people up to
  speed as quickly as possible but also on helping our permanent team to grow their skills.
- Working cross-team to exchange knowledge and drive the development: our
  re-platforming has seen the rise of micro services and with them, a new set of communication challenges. As a webapp, our team consumes many of
  these services and the biggest challenge has been to bring everything
  together. This has been achieved by sometimes sharing developers across
  squads and through a lot of cross-team communication.`,
};

const trainlineSenior = {
  company: "Trainline",
  role: "Senior JavaScript Developer",
  dates: "Oct 2015 - Oct 2016 [London, United Kingdom]",
  description: `As a senior developer, I joined the team to help shape a better agile process, help more junior developers to step up and ensure a more predictable, high quality development process. In pursuing the above, we:

- Stabilized the agile process by streamlining the ceremonies: the morning standup (quick and efficient), having more focused grooming and planning sessions (quick meetings make devs happy), and having a more productive retrospective. We removed all meetings that were unnecessary/long/without a clear intent
- Hired more junior members and turned them into mid-level engineer, fighting the increasingly difficult situation of hiring permanents
- Introduced cross-devices integration tests and removed all manual qa-ing, with the aim of increasing the team confidence and speeding up the release process
- Introduced bug hunts/manual discoveries, when the team would randomly test (almost monkey test) the app and come up with scenarios to be covered by integration tests
- Introduced a stricter code reviewing process, allowing the developers more time to review, discuss and deliver better code
- Worked across our projects with micro/macro refactorings to increase code quality and encourage reusability
- Worked alongside the HR hiring team to create a better hiring process (tech tests/on site interviews and whiteboard tests) that would fit our increased need in high quality developers

This resulted in a happier team and more frequent/better releases.`,
  technologiesArray: [
    "React",
    "Redux",
    "CSS-in-JS",
    "redux-observable",
    "Cypress",
    "Node.js",
    "Express",
    "Helmet",
    "GitHub",
    "Teamcity",
    "AWS",
  ],
};

const lastminuteLead = {
  company: "lastminute.com",
  role: "UI Tech Lead",
  dates: "Jan 2015 - Oct 2015 [London, United Kingdom]",
  description: `I was promoted to Tech Lead to give our UI teams a long term vision. Apart from developing (I spent at least 70% of my time developing with the team) I then invested more time on new technologies, best practices and patterns to use across our teams and improved ways of managing our workflows.

Part of the improvements put in place include:

- strict use of Git merge requests/code reviews (with auto merge request builder)
- a fully automated cloud CI for all our four environments a "dockerized" version of our apps to make it easy to test and deploy everywhere
- monthly meeting with back-end devs, tech ops and architect to give all developers a big picture of our projects.
- hosting a Js meetup (http://www.meetup.com/js-monthly-london/) in our London office

I led UI teams in our London and Madrid offices and was also involved in various social activities to bring developers together: brown bag sessions, meetups, team conference calls.`,
};

const lastminuteSenior = {
  company: "lastminute.com",
  role: "Senior UI developer",
  dates: "Apr 2014 - Dec 2014 [London, United Kingdom]",
  description: `As a senior UI developer, I worked on the [m.lastminute.com](https://m.lastminute.com) mobile application, supported junior developers and spread the knowledge across the teams with tech meetings about good practices and new technologies to introduce in our workflow.
  We worked in a Kanban environment, following a TDD/BDD approach in teams with PO, BAs, marketing people, QAs, UI designers, back end developers and front end developers. My focus was on the Backbone Mobile SPA application.`,
  technologiesArray: [
    "Marionette",
    "Backbone",
    "underscore",
    "React.js",
    "jQuery/Zepto",
    "RequireJS",
    "Browserify",
    "Jasmine/Cucumber.js/WebDriverJS",
    "SASS/Compass",
    "Git",
    "Jenkins",
  ],
};

const f1000 = {
  company: "Faculty of 1000",
  role: "Senior Front End Developer",
  dates: "Sept 2013 - Apr 2014 [London, United Kingdom]",
  description: `Responsible for the development and maintenance of our web applications: working closely with our team of business analysts, designers, backend developers and QAs in an Agile team. My job involved writing JavaScript libraries to be used across the apps, turning PSD designs into semantic HTML5 applications; adding complex interactions handled with the best JavaScript tools and frameworks, always creating modular and maintainable code even with tight schedules.

I improved the front end workflow by introducing an automated flow for the development: with Grunt.js, we now automate the whole process. From a morning job that takes care of updating the local repository, builds and the deploys the app; to a watcher that lints, checks the coding style with jscs, tests and concatenates + minify and deploy at every file save. I automated the documentation process creating a live styleguide with KSS.

In our Agile environment we used Jira to handle our sprints' workflow and Jenkins to build, deploy and test our code.`,
  technologiesArray: [
    "HTML5 semantic markup",
    "CSS3 and SASS with Compass",
    "jQuery",
    "Underscore and Backbone",
    "Grunt.js",
  ],
};

const klm = {
  company: "KLM",
  role: "Senior Mobile Front End Developer",
  dates: "2013 [Italy]",
  description: `I worked with KLM for the Unavolta project. Unavolta.net is a web application (both desktop and mobile versions available) designed to let people upload their travel photos (with a poetic message) in order to participate in a contest and win a flight. Additionally, every week (for eight weeks) a new video is published to inspire travellers. My responsibility for the project was to design and develop the mobile interface.
  `,
  technologiesArray: [
    "HAML templates",
    "jQuery",
    "jQuery Mobile",
    "CSS",
    "SASS",
    "Git",
  ],
};

const prometeo = {
  company: "Prometeo",
  role: "Senior Engineer",
  dates: "2013 - 2018 [Italy]",
  description: `During my career at Prometeo I had the chance to work on a wide range of projects:
  from building a complete rack server to implementing a site crawler using the Selenium API (to automate a purchase process) to designing and developing web applications using several different technologies.
  My job included: gathering user requirements, choosing the right technologies to use, implementing server side and client side, testing and production deployment. I was involved in the R&D area too: building and testing new technologies for our next projects.
  `,
  technologiesArray: [
    ".NET WebForms and WebAPI",
    "Java",
    "Javascript",
    "HTML5",
    "CSS/3",
    "XML",
    "RESTful APIs and SOAP web services",
    "MS SQL Server",
    "Linux administration",
    "Bash scripting",
    "Network administration",
  ],
};

const acidSeed = {
  year: "2015",
  title: `Acidseed [github.com/ricca509/acidseed](https://github.com/ricca509/acidseed)`,
  description: `A caching layer to cache any API/HTTP request. Written in Node.js using ES6 Harmony with persistence on Redis.`,
};

const f = {
  year: "2013",
  title: `F.js [github.com/ricca509/F](https://github.com/ricca509/F)`,
  description: `A small library to be used in all those multiple pages (server side MVC) projects that usually don’t have a structured js due to the fact that most of the job is done on the server. It is “A small, modular library that helps writing structured, reusable, testable and namespaced JavaScript code. It also provides DOM helpers and a pub/sub implementation”. Published in the Bower repository.`,
};

const phood = {
  year: "2013",
  title: `Phood mobile app`,
  description: `A small mobile application that uses the Yummly.com REST API to search recipes and presents them to the user with a useful visual. Built using ES6 syntax with the Traceur compiler, HTML5/CSS3/SASS, Stylus templates, Nodejs/Express, Marionette.js/Backbonejs/underscorejs, Bower, jQuery, Bootstrap, Git.`,
};

const triptapp = {
  year: "2012",
  title: `TripTapp.com`,
  description: `Co-founder of [triptapp.com](https://www.triptapp.com): we developed the web application and designed the mobile application. The webapp development involved social authentication, a NoSQL database (mongoDB), an API to interface with Google Maps, a client side app to handle data about places positions, like, etc and a REST API to handle AJAX calls. The mobile app used a REST API in Node.js as backend and HTML5 with Backbone.js (accessing the device’s features through Cordova/PhoneGap). Built using HTML5/CSS3, LESS, Backbone.js, jQuery, Twitter Bootstrap, Yii Framework (PHP), mongoDB. Integrated with Google Maps, Hosted on Windows Azure (Linux VM).`,
};

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <AboutMe
      title={`#👋 my name is [Riccardo Coppola](mailto:riccardo@onefiniteloop.io). I write code`}
      body={`
I am a passionate, detail oriented **Team Lead** and **Full Stack JavaScript developer** with over 10 years industry experience, extensive knowledge of DevOps practices and Agile methodologies.

Passionate about testing, workflow automation, code reusability and team dynamics; I focus on writing state of art, highly maintainable web applications using best practices, design patterns and performance testing, following a TDD/BDD approach.

I have hands-on experience in building cross-functional teams on site and in [distributed environments](https://www.onefiniteloop.io/embrace-distributed-teams-and-be-happy/). 
Strong believer in the value of productivity as a result of highly efficient workflows, I can happily act as **developer advocate** to help remove obstacles and enable developers to increase velocity.

I regularly attend meetups in the London tech scene such as London React User Group and London Node User Group.

**I ♥ what I do**
      `}
      image={data.file.childImageSharp.fixed}
    />
    <h2>
      Experience{" "}
      <span role="img" aria-label="experience">
        💼
      </span>
    </h2>
    <WorkExperience {...burberry} />
    <WorkExperience {...trainlineLead} />
    <WorkExperience {...trainlineSenior} />
    <WorkExperience {...lastminuteLead} />
    <WorkExperience {...lastminuteSenior} />
    <WorkExperience {...f1000} />
    <WorkExperience {...klm} />
    <WorkExperience {...prometeo} />
    <h2>Side projects</h2>
    <SideProject {...acidSeed} />
    <SideProject {...f} />
    <SideProject {...phood} />
    <SideProject {...triptapp} />
    <h2>Spoken languages</h2>
    <p>Italian, English, basic Spanish.</p>
    <h2>Education</h2>
    <p>
      2002 - 2007: Degree in Telecommunications Engineering with the thesis:
      “AODV protocol modifications to include Link State metrics”
    </p>
    <h2>Interests</h2>
    <Markdown>
      {`I blog about development, agile methodologies, psychology of teamwork and other boring topics at [onefiniteloop.io](https://www.onefiniteloop.io/).

Certified Level 3 Personal trainer and Level 2 Gym instructor; sport nutrition geek and biohacker at [improvedhumans.com](https://www.improvedhumans.com/).

Trained barista and coffee roaster.

Amateur photographer [500px.com/ricca509](https://500px.com/ricca509).`}
    </Markdown>
  </Layout>
);

export default props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "me.jpeg" }) {
          childImageSharp {
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} {...props} />}
  />
);
