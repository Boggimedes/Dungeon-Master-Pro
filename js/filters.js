'use strict';

/* Filters */

angular.module('myApp.filters', [])

.filter('effectArrayFilter', function() {
  return function(id) {
  	console.log(id);
  	console.log($rootScope.effectsArray);
    return $rootScope.effectsArray[id];
  };
})

.filter('ageGroup', function() {
  return function(input, group) {
  	var out=[];
  	for(var i in input){
  	switch(group){
    case 'Youth':
        if(input[i].age<input[i].race.adulthood){out.push(input[i]);}
        break;
    case 'Adult':
        if(input[i].age<input[i].race.middleAge && input[i].age>input[i].race.adulthood){out.push(input[i]);}
        break;
    case 'MiddleAged':
        if(input[i].age<input[i].race.oldAge && input[i].age>input[i].race.middleAge){out.push(input[i]);}
        break;
    case 'Old':
        if(input[i].age>=input[i].race.oldAge){out.push(input[i]);}
        break;
  	}
  }
    return out;
  };
})