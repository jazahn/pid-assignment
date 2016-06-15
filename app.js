var express = require('express');
var bodyParser = require('body-parser');
var Course = require('./Course.js');
var Instructor = require('./Instructor.js');
var Area = require('./Area.js');
Instructor.getInstructorMap();
Area.getAreaMap();

var app = express();

app.use(bodyParser.json());

app.get('/courses/instructor/:name', function(req, res){
  console.log("getting /courses/instructor/" + req.params.name);
  var results = Instructor.search(req.params.name);
  var course_ids = results.map(function(instructor){
    return instructor.course_ids;
  });
  course_ids = [].concat.apply([], course_ids);
  console.log("returning " + course_ids.length + " results");
  res.json(Course.getCourses(course_ids));
});

app.get('/courses/area/:area', function(req, res){
  console.log("getting /courses/area/" + req.params.area);
  var results = Area.search(req.params.area, true);
  var course_ids = results.map(function(area){
    return area.course_ids;
  });
  course_ids = [].concat.apply([], course_ids);

  console.log("returning " + course_ids.length + " results");
  res.json(Course.getCourses(course_ids));
});


app.listen(7000);
