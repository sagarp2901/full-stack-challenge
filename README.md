# Full Stack Developer Challenge
This is an interview challenge for Paytm Labs. Please feel free to fork. Pull Requests will be ignored.
------------------------------------------------------------------------------------------------------------------------------
# Project Overview
* The project is based on the MEAN stack technology. 
* MongoDB instance is setup using Data-as-a-service provided by mlab.com so installing MongoDB locally is not required.
* Frontend is created using Angular 7, Angular Material, HTML and SCSS.
* Backend is created using NodeJs, Express and Mongoose.

# App Features

* Admin: View List of employees with cartoon avatars (Can be actual employee images if it’s a future production version).
* Admin and Employee: Additional details included in views are rating and job title.
* Admin: Add/update/remove employees.
* Admin: Add/update reviews for each employee.
* Admin: List of employees that can provide reviews to a particular employee. If a reviewer has already provided a review, it will be indicated and selection of that reviewer for that employee will be disabled allowing admin to keep a track so same reviewer is not assigned to review again.
* Employee: View list of employees requiring feedbacks with their name, avg. rating and job title.
* Employee: View list of employees that were provided a feedback.
* Employee: Submit feedback and the completed feedback will be cleared from the view.
* Admin and Employee: Give rating to your peers which would show up as average rating for every employee.

# Setup Prerequisites

Install following prerequisites if you do not have them already:
* Node and NPM: https://nodejs.org/en/ (Check successful installation by running node -v and npm -v in a terminal/cmd)
* Angular CLI: Run npm install -g @angular/cli in a terminal/cmd

## Running Node Backend

Navigate to the folder full-stack-challenge/backend and run the following commands in terminal/cmd:
* *npm install* (Installs the required packages) 
* *npm run dev* (Serves the backend on port 4000)
 
## Running Angular Frontend
Navigate to the folder full-stack-challenge/performance-review-app and run the following commands in terminal/cmd:
*	*npm install* 
*	*ng serve --open* (Serves the frontend app on port 4200 in default browser)

## Setting up the MongoDB (If not using mlabs)
* MongoDB is already setup for this project using mlabs as Database-as-a-Service. Following steps can be skipped if local setup is not required.
* If you need to install locally then visit the [MongoDB Downloads](https://www.mongodb.com/download-center/community?jmp=tutorials&_ga=2.216733855.867775932.1502387021-1711869881.1500135373).
* Check the [MongoDB Installation](https://docs.mongodb.com/manual/administration/install-community/) documentation to find out the necessary steps for running MongoDB on your machine.
* After istallation open a new terminal and type the following command to run the local mongoDB instance.
  * Mac command: *mongod*
  *	Windows command: *mongo*

------------------------------------------------------------------------------------------------------------------------------
## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at Paytm Labs currently use Ruby on Rails, Java or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the Paytm Labs interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues
