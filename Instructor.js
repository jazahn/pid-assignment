var Instructor = function(){
  this.instructors = [];
  this.Courses = require('./Courses.json');
  this.getInstructorMap();
}

// creates a hash for faster searching
Instructor.prototype.getInstructorMap = function(){
  var that = this;

  if(that.instructors.length > 0){
    return that.instructors;
  }

  that.instructors = [];


  Object.keys(that.Courses).forEach(function(key) {
    var course = that.Courses[key];
    var course_id = key;
    var courseInstructors = that.getInstructors(course);
    courseInstructors.forEach(function(courseInstructor){

      searchResults = that.search(courseInstructor, true);
      if(searchResults.length === 0){
        that.instructors.push({'name': courseInstructor, 'course_ids': [course_id]});
      } else {

        that.instructors = that.instructors.map(function(instructor){
          if(instructor.name == courseInstructor){
            if(instructor.course_ids.indexOf(course_id) === -1){
              instructor.course_ids.push(course_id);
            }
          }
          return instructor;
        });

      }
    });
  });
  //console.log(that.instructors);
  return that.instructors;
};

Instructor.prototype.search = function(q, exact){
  exact = exact || false;
  return this.instructors.filter(function(instructor){
    if(exact){
      if(instructor.name === q){
        return true;
      }
    } else {
      if(instructor.name.match(new RegExp(q, "i")) !== null){
        return true;
      }
    }
  });

};

// returns an array of instructors in a given course
Instructor.prototype.getInstructors = function(course){
  var instructors = [];
  Object.keys(course.terms).forEach(function(key){
    if(course.terms[key].instructors){
      instructors = instructors.concat(course.terms[key].instructors);
    }
  });
  return instructors;
};

module.exports = new Instructor();
