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

.filter('soundFilter', function() {
  return function(input, search) {
    console.log(input);
    console.log(search);
    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }
})
.filter('citizenFilter', function() {
  return function(input, field, value) {
    var result=[]
    for (var i = 0; i < input.length; i++) {
    if (input[i][field]==value) result.push(input[i]);
    }
    return result;
  }
})

.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
})