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
      .when("/doQuery", {
        templateUrl: "views/doQuery.htm",
        controller: "doQuery"
      })
      .when("/viewRecord/:index", {
        templateUrl: "views/viewRecord.htm",
        controller: "viewRecord"
      })
      .when("/404", {
        templateUrl: "views/404.htm",
        controller: "404"
      })
      .otherwise({
        redirectTo: "/404"
      });
  });

  mgsAndWw1Site.controller("global", function($rootScope, $location, $scope) {
    // empty controller, but has to exist
  });

  mgsAndWw1Site.controller("home", function() {
	  // empty controller, but has to exist
  });

  mgsAndWw1Site.controller("about", function() {
    // empty controller, but has to exist
  });

  mgsAndWw1Site.controller("404", function() {
    // empty controller, but has to exist
  });

  mgsAndWw1Site.controller("doQuery", function($scope) {
    // pass all JSON data to the view
    // $scope.allData = dataset; - TODO: REWRITE ENTIRE SEARCH SYSTEM
  });

  mgsAndWw1Site.controller("viewRecord", function($scope, $routeParams) {
    $scope.indexToCheck = $routeParams.index; // for display to user even if no hit
    // search the JSON for an object matching the siteIndex we requested
    var ourData = getObjects(dataset,"siteIndex",$routeParams.index);
    // if we get a match...
    if (ourData && ourData.length) {
      // pass the variable to display a success message to the view
      $scope.hit = true;
      // pass the JSON object itself to the view
      // the [0] selects the first JSON object found by the search function, which is fine, as siteIndex is the primary key, and only one object should ever be returned - we rely on integrity of JSON for this, though
      $scope.ourData = ourData[0];
    } else {
      // if we don't find a record with a matching siteIndex, the getObjects function returns an empty array
      // pass the variable to display an error to the view
      $scope.hit = false;
    }

    // function to run if the user clicks a button with ng-click of `doJsonExport`
    // TODO: INSERT README TO JSON FILE
    $scope.doJsonExport = function() {
      // use download.js to download a JSON file, containting the first JSON object found by the search function
      download(JSON.stringify(ourData[0]), "mgsandww1record_" + ourData[0].siteIndex + ".json", "application/json");
    };
  });

  mgsAndWw1Site.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
    // disable spinning icon in top-left of page
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
