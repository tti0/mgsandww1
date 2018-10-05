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
      .when("/result", {
        templateUrl: "views/result.htm"
      })
  });

  mgsAndWw1Site.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])


  mgsAndWw1Site.controller('home', function($scope, $http) {
	//
  });

  mgsAndWw1Site.controller("global", function($rootScope, $location, $scope) {
    //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("about", function() {
    //Empty controller, but has to exist
  });

  mgsAndWw1Site.controller("404", function() {
    //Empty controller, but has to exist
  });

}());

window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#237afc"
      },
      "button": {
        "background": "#fff",
        "text": "#237afc"
      }
    },
    "content": {
      "href": "#!/about"
    }
})});
