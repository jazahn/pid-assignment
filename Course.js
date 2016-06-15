var Course = function(){

};

Course.prototype.getCourses = function(course_ids){
  allCourses = require('./Courses.json');

  if(course_ids === undefined){
    return allCourses;
  } else {
    var courses = Object.keys(allCourses).map(function(course_id){
      if(course_ids.indexOf(course_id) != -1){
        return allCourses[course_id];
      }
    }).filter(function(course){
      if(course){
        return true;
      }
    });

    return courses;
  }

};


module.exports = new Course();
