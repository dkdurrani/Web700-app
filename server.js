var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
var collegeData = require('./modules/collegeData.js');

// route that sends the home.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/home.html'));
});

// route that sends the about.html file
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/about.html'));
});

// route that sends the htmlDemo.html file
app.get('/htmlDemo', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/htmlDemo.html'));
});

// route that returns all students
app.get('/students', (req, res) => {
  if (req.query.course) {
    collegeData.getStudentsByCourse(req.query.course)
    .then(students => res.json(students))
    .catch(() => res.json({message: "no results"}));
  } else {
    collegeData.getAllStudents()
    .then(students => res.json(students))
    .catch(() => res.json({message: "no results"}));
  }
});

// route that returns all TAs
app.get('/tas', (req, res) => {
  collegeData.getTAs()
  .then(tas => res.json(tas))
  .catch(() => res.json({message: "no results"}));
});

// route that returns all courses
app.get('/courses', (req, res) => {
  collegeData.getCourses()
  .then(courses => res.json(courses))
  .catch(() => res.json({message: "no results"}));
});

// route that returns a student by num
app.get('/student/:num', (req, res) => {
  collegeData.getStudentByNum(req.params.num)
  .then(student => res.json(student))
  .catch(() => res.json({message: "no results"}));
});

// route for no matching path
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// call to initialize and then listen
collegeData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to start server: " + err);
  });



/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Danish Khan Durrani Student ID: 128284221 Date: 6/18/2023
*
********************************************************************************/