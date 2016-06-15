var Area = function(){
  this.areas = [];
  this.Courses = require('./Courses.json');
  this.getAreaMap();
};

Area.prototype.getAreaMap = function(){
  var that = this;

  if(that.areas.length > 0){
    return that.areas;
  }

  that.areas = [];

  Object.keys(that.Courses).forEach(function(key) {
    var course = that.Courses[key];
    var course_id = key;
    var courseArea = course.course_area;

    searchResults = that.search(courseArea, true);
    if(searchResults.length === 0){
      that.areas.push({'name': courseArea, 'course_ids': [course_id]});
    } else {

      that.areas = that.areas.map(function(area){
        if(area.name == courseArea){
          if(area.course_ids.indexOf(course_id) === -1){
            area.course_ids.push(course_id);
          }
        }
        return area;
      });

    }

  });
  return that.areas;
};

Area.prototype.search = function(q, exact){
  exact = exact || false;
  var results = [];
  this.areas.forEach(function(area){
    if(exact){
      if(area.name === q){
        results.push(area);
      }
    } else {
      if(area.name.match(new RegExp(q, "i")) !== null){
        results.push(area);
      }
    }
  });
  return results;
};


module.exports = new Area();
