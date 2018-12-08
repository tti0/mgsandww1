/* jshint esversion:6*/

// MGS and WW1 Website
// https://github.com/tti0/mgsandww1

(function() {
  "use strict";
  var mgsAndWw1Site = angular.module("warApp", ["ngRoute", "ngAnimate", "ngSanitize", "angular-loading-bar", "tti0.angular-showdown-directive"]);

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
      .when("/understand", {
        templateUrl: "views/understand.htm",
        controller: "understand"
      })
      .when("/doQuery", {
        templateUrl: "views/doQuery.htm",
        controller: "doQuery"
      })
      .when("/viewRecord/:index", {
        templateUrl: "views/viewRecord.htm",
        controller: "viewRecord"
      })
      .when("/article/:id", {
        templateUrl: "views/article.htm",
        controller: "article"
      })
      .when("/404", {
        templateUrl: "views/404.htm",
        controller: "404"
      })
      .otherwise({
        redirectTo: "/404"
      });
  });

  mgsAndWw1Site.controller("global", function() {
    // do nothing
  });

  mgsAndWw1Site.controller("home", function() {
	  // SIMPLE HTML ROUTE: empty controller, but has to exist for router
  });

  mgsAndWw1Site.controller("about", function() {
    // SIMPLE HTML ROUTE: empty controller, but has to exist for router
  });

  mgsAndWw1Site.controller("understand", function() {
    // SIMPLE HTML ROUTE: empty controller, but has to exist for router
  });

  mgsAndWw1Site.controller("404", function() {
    // SIMPLE HTML ROUTE: empty controller, but has to exist for router
  });

  mgsAndWw1Site.controller("doQuery", function() {
    // this controller uses ag-Grid community to handle displaying and filtering the list of OM names
    // we declare which columns we want shown in our table: `headerName` is the pretty name to print, and `field` is the part of JSON we want
    var columnDefs = [
      {headerName: "siteIndex", field: "siteIndex", filter: "agNumberColumnFilter"},
      {headerName: "Personal details",
        children: [
          {headerName: "Surname", field: "surname", filter: "agTextColumnFilter"},
          {headerName: "First name(s)", field: "firstnames", filter: "agTextColumnFilter"},
          {headerName: "Date of birth", field: "dob", filter: "agDateColumnFilter"},
          {headerName: "Place of residence", field: "placeOfResidence", filter: "agTextColumnFilter"}
        ]
      },
      {headerName: "MGS details",
        children: [
          {headerName: "Started at MGS", field: "MGSstarted", filter: "agNumberColumnFilter"},
          {headerName: "Left MGS", field: "MGSleft", filter: "agNumberColumnFilter"}
        ]
      },
      {headerName: "Military details",
        children: [
          {headerName: "Rank", field: "rank", filter: "agTextColumnFilter"},
          {headerName: "Service number", field: "serviceNumber", filter: "agTextColumnFilter"},
          {headerName: "Date of death", field: "dod", filter: "agDateColumnFilter"},
          {headerName: "Age at death", field: "aad", filter: "agNumberColumnFilter"}
        ]
      }
    ];
    // tell ag-Grid display preferences
    var gridOptions = {
      // show hamburger next to column headers, regardless of hover
      suppressMenuHide: true,
      // set the column headers to be as defined earlier
      columnDefs: columnDefs,
      // use the main JSON dataset var for the rows
      rowData: dataset.oms,
      enableSorting: true,
      enableFilter: true,
      pagination: true,
      enableColResize: true,
      // allow the user to click only one row at once
      rowSelection: "single",
      // if they do click a row, run the onRowSelected function to view the record
      onRowSelected: onRowSelected
    };
    // select the element to be used for the grid
    var eGridDiv = document.querySelector("#queryList");
    // launch ag-Grid
    new agGrid.Grid(eGridDiv, gridOptions);
    // define function to be run if user clicks on a row
    function onRowSelected(event) {
      // view the record with the siteIndex of the clicked row
      window.location = "#!/viewRecord/" + event.node.data.siteIndex;
    }
  });

  mgsAndWw1Site.controller("viewRecord", function($scope, $routeParams) {
    $scope.indexToCheck = $routeParams.index; // for display to user even if no hit
    // construct an XPath query to select the JSON object we want
    var query = "//oms[siteIndex=" + $scope.indexToCheck + "]";
    // run the query with DefiantJS
    // we can select the first item safely, as siteIndex is the primary key
    var ourData = JSON.search(dataset, query)[0];
    // if we get a match...
    if (ourData) {
      // pass the variable to display a success message to the view
      $scope.hit = true;
      // pass the JSON object itself to the view
      $scope.ourData = ourData;
    } else {
      // if we don't find a record with a matching siteIndex, Defiant returns nothing
      // pass the variable to display an error to the view
      $scope.hit = false;
    }

    // function to run if the user clicks a button with ng-click of `doJsonExport`
    $scope.doJsonExport = function() {
      // use download.js to download a JSON file, containting the first JSON object found by the search function
      download(JSON.stringify(ourData[0]), "mgsandww1record_" + ourData[0].siteIndex + ".json", "application/json");
    };
  });

  mgsAndWw1Site.controller("article", function($scope, $routeParams) {
    $scope.indexToCheck = $routeParams.id; // for display to user even if no hit
    // construct an XPath query to select the JSON object we want
    var query = "//articles[id=" + $scope.indexToCheck + "]";
    // run the query with DefiantJS
    // we can select the first item safely, as is is the primary key
    var ourData = JSON.search(articles, query)[0];
    // if we get a match...
    if (ourData) {
      // tell the view that we are successful
      $scope.hit = true;
      // pass the JSON object itself to the view
      $scope.ourData = ourData;
    } else {
      // if we don't find an article with a matching id, Defiant returns nothing
      // pass the variable to display an error to the view
      $scope.hit = false;
    }
  });

  mgsAndWw1Site.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
    // disable spinning icon in top-left of page
    cfpLoadingBarProvider.includeSpinner = false;
  }])

}());
