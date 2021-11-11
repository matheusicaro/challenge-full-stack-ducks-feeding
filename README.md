## BUILDING THE DUCKS FEEDING WEB APPLICATION - FULL-STACK CHALLENGE. 

## Summary:

1. [Intro](#intro)
2. [Challenge](#challenge)
3. [Proposed solution and Architecture](#proposed-solution-and-architecture) 
4. [Project Screen Shot](#project-screen-shot)
5. [Installation and Setup Instructions](#installation-and-setup-instructions)
7. [Project Specifications](#project-specifications)

## Intro:

Full stack challenge to develop a web application. <br>
It was suggested to use stack with Back-end in Node.js, Front-end in React.js and PostgreSQL for the database bar.
- [BACK-END](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/back-end)
- [FRONT-END](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/front-end)

## challenge

### The Assignment

A scientist is trying to understand how ducks are being fed in parks around the world. She wants to collect the following information:

- What time the ducks are fed
- What food the ducks are fed
- Where the ducks are fed
- How many ducks are fed
- What kind of food the ducks are fed
- How much food the ducks are fed
- Nice to have: the ability for a little old lady who feeds the ducks every day in the same way to set a repeating schedule so she doesn’t have to use the application every day

The scientist would like to crowdsource this information by creating a web application where people can submit these data points. The scientist would like to be able to do reporting on the data for her PhD thesis.

### Technology

You may use any language or framework you choose. We prefer that you install the final product on AWS (or another freely available cloud hosting solution such as Heroku).

### Deliverables

- A link to the working application
- Access to your Git repository (please commit regularly - we find your commit history an interesting indicator as to how you like to work).
- A short written document outlining:
  - **YOUR APPROACH TO THE PROBLEM**: <br>Answered in [this topic]()
  - **TECHNOLOGIES CHOSEN (AND WHY)**: <br>
       *The project's technologies can be visualized in a general way in [this diagram](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/architecture-diagram.drawio.png). I chose to Use AWS and its resources for two reasons: <br>
              1. Availability and simplification of integration between all the necessary components to develop the solution, such as an environment for static files, web server and database. For all resources, even for a developer without DevOps/Cloud experience, it is possible to deploy and continue integration in a simpler way than other platforms
              2. Due to my background, which has a certain domain of AWS tools which could bring me development speed.
       <br><br>For application, I chose to use React and Node.js because it simply works in the same language which gave me a speed gain in development for configurations and programming in general.
       <br><br>For the database, as the entities are known, they are well defined (values and behaviors), and there is still a relationship between them, so I opted for a relational database using PostgreSQL.
       
  - **A HIGH-LEVEL COMPONENT DIAGRAM**: <br>Answered in [this topic](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation)
  - **A DATABASE MODEL DIAGRAM**: <br>Answered in [this topic](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/database-schema.png)
  - **ROUGHLY HOW MANY HOURS YOU SPENT**:
       <br>*Approximately how many hours did you spend: Approximately 13 hours, with the following definition and its intervals:
       First day: development of architecture and diagrams and configuration of repository, 2hr
       Second day: backend service development and its business rules, 4hr
       Third day: Front-end interface development, 5hr
       day four: start of cloud configuration configuration and interface adjustments and improvements, 2hr

---

## Proposed solution and Architecture

As a solution proposal, I first started working on the desired architecture and the diagrams that detail the project proposal can be consulted below:

- [Project architecture diagram](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation)
- [Proposed web application interface diagram](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation)
- [Sequence diagram](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation) for rules and flow of integrations
- [Database schema](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation) demonstrating entities and their relationships

## Project Screen Shot

... pending

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

1. clone the repository: `git clone https://github.com/matheusicaro/coderbyte-full-stack-project.git`
2. Run the **back-end** following [these steps](https://github.com/matheusicaro/coderbyte-full-stack-project/tree/master/back-end#installation-and-setup-instructions)
3. Run the **front-end** following [these steps](https://github.com/matheusicaro/coderbyte-full-stack-project/tree/master/front-end#installation-and-setup-instructions)
4. have fun!

