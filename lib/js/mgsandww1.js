/* jshint esversion:6*/

// MGS and WW1 Website
// https://github.com/tti0/mgsandww1

(function() {
  "use strict";
  var mgsAndWw1Site = angular.module('warApp', ['ngRoute', 'ngAnimate', 'angular-loading-bar']);

  mgsAndWw1Site.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/home.htm",
        controller: "home"
      })
      .when("/about", {
        templateUrl: "views/about.htm",
        controller: "about"
      })
      .when("/404", {
        templateUrl: "views/404.htm",
        controller: "404"
      })
      .when("/result/:index", {
        templateUrl: "views/result.htm",
        controller: "queryResult"
      })
      .otherwise({
        redirectTo: "/404"
      });
  });

  mgsAndWw1Site.controller("global", function($rootScope, $location, $scope) {
    //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("home", function($scope, $http) {
	  //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("about", function() {
    //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("404", function() {
    //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("queryResult", function($scope, $routeParams) {
    $scope.indexToCheck = $routeParams.index; // for display to user even if no hit
    if ((getObjects(dataset,"siteIndex",$routeParams.index)) && (getObjects(dataset,"siteIndex",$routeParams.index)).length) {
      $scope.hit = true;
      $scope.ourData = (getObjects(dataset,"siteIndex",$routeParams.index));
    } else {
      // if we don't find a record with a matching siteIndex, the getObjects functio returns an empty array
      $scope.hit = false;
    }
  });

  mgsAndWw1Site.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])

}());

// JSON SEARCHING ALGORITHM (based on http://techslides.com/how-to-parse-and-search-json-in-javascript)
// these functions choose the right JSON record to show on the Result page
// the searchable list of records is done with ng-repeat and ng-filter

// return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else
      // if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
        objects.push(obj);
      } else if (obj[i] == val && key == ''){
        // only add if the object is not already in the array
        if (objects.lastIndexOf(obj) == -1){
          objects.push(obj);
        }
      }
  }
  return objects;
}
