/* jshint esversion:6*/

// MGS and WWI Website
// https://github.com/tti0/mgsandwwi

(function() {
  "use strict";
  var mgsandwwiSite = angular.module('sdApp', ['ngRoute', 'ngAnimate', 'angular-loading-bar']);

  mgsandwwiSite.config(function($routeProvider) {
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
	  otherwise {
	  }
  });

  mgsandwwiSite.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])


  mgsandwwiSite.controller('home', function($scope, $http) {
	//
  });

  mgsandwwiSite.controller("global", function($rootScope, $location, $scope) {
    //Empty controller, but has to exist
  });

  mgsandwwiSite.controller("about", function() {
    //Empty controller, but has to exist
  });

  mgsandwwiSite.controller("404", function() {
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
