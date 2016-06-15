var express = require('express');
var bodyParser = require('body-parser');
var Course = require('./Course.js');

/*****
 * The idea here is that the Instructor and Area modules would  cache a
 * hashy map to make searching faster than having to traverse the full json.
 * The caching here is just done in memory. In production, we'd probably be using redis
 * Restarting the server will reset the hashes as is.
******/
var Instructor = require('./Instructor.js');
var Area = require('./Area.js');

var app = express();

app.use(bodyParser.json());

app.get('/courses/instructor/:name', function(req, res){
  console.log("GET /courses/instructor/" + req.params.name);

  var results = Instructor.search(req.params.name);

  // this will pull out instructor info from the search, leaving only the course_ids
  var course_ids = results.map(function(instructor){
    return instructor.course_ids;
  });

  // this will flatten the array of arrays [[1, 2], [3, 4]] => [1, 2, 3, 4]
  course_ids = [].concat.apply([], course_ids);

  // in case we have dupes #prematureoptimization
  var uniques = {};
  course_ids.filter(function(course_id){
    if(uniques.hasOwnProperty(course_id)){
      return false;
    } else {
      uniques[course_id] = true;
      return true;
    }
  });

  console.log("returning " + course_ids.length + " results");
  res.json(Course.getCourses(course_ids));
});

app.get('/courses/area/:area', function(req, res){
  console.log("GET /courses/area/" + req.params.area);

  var results = Area.search(req.params.area, true);
  var course_ids = results.map(function(area){
    return area.course_ids;
  });

  // this will flatten the array of arrays [[1, 2], [3, 4]] => [1, 2, 3, 4]
  course_ids = [].concat.apply([], course_ids);

  // in case we have dupes #prematureoptimization
  var uniques = {};
  course_ids.filter(function(course_id){
    if(uniques.hasOwnProperty(course_id)){
      return false;
    } else {
      uniques[course_id] = true;
      return true;
    }
  });

  console.log("returning " + course_ids.length + " results");
  res.json(Course.getCourses(course_ids));
});


app.listen(7000);
