var Course = function(){

};

/**
 * Gets the courses given an array of course_ids
 * Returns an array of courses
 *
 * example @param course_ids: [1, 2, 3]
 * example @return: [{"1": ...course data...}, {"2": ...course data...}, ...]
 */
Course.prototype.getCourses = function(course_ids){
  allCourses = require('./Courses.json');

  if(course_ids === undefined){
    return Object.keys(allCourses).map(function(course_id){
      return allCourses[course_id];
    });
  } else {
    return Object.keys(allCourses).map(function(course_id){
      if(course_ids.indexOf(course_id) != -1){
        return allCourses[course_id];
      }
    }).filter(function(course){
      if(course){
        return true;
      }
    });
  }

};

module.exports = new Course();
