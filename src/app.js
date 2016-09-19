var app = angular.module('rssFeed', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

    $routeProvider
    .when('/home', {
        templateUrl: 'chart.view.html',
        controller: 'ChartCtrl'
    })
    .when('/feed-setting', {
        templateUrl: 'feed-setting.view.html',
        controller: 'FeedSettingCtrl'
    })
    .otherwise('/home');

    // .when('/Book/:bookId', {
    //     templateUrl: 'book.html',
    //     controller: 'BookController',
    //     resolve: {
    //     // I will cause a 1 second delay
    //     delay: function($q, $timeout) {
    //         var delay = $q.defer();
    //         $timeout(delay.resolve, 1000);
    //         return delay.promise;
    //     }
    //     }
    // })
    // .when('/Book/:bookId/ch/:chapterId', {
    //     templateUrl: 'chapter.html',
    //     controller: 'ChapterController'
    // });

  // configure html5 to get links working on jsfiddle
  
  //$locationProvider.html5Mode(true);

});

app.controller('FeedSettingCtrl', ['$scope','feedReader', function ($scope, feedReader) {
    //console.log('call');
    //&callback=angular.callbacks._0
    //https://news.google.de/news/feeds?pz=1&cf=all&ned=LANGUAGE&hl=COUNTRY&q=SEARCH_TERM&output=rss
    var url = 'https://news.google.com/news/feeds?pz=1&cf=all&ned=en&hl=en&q=Social+Media&output=rss';
    $scope.feedSrc = url;
    
    $scope.loadBtnText="Carregar";
    $scope.loadFeed=function(e){ 

        feedReader.parseFeed($scope.feedSrc).then(function(res){
            $scope.loadBtnText=angular.element(e.target).text();
            $scope.feeds=res.data.responseData.feed.entries;
        //console.log($scope.feeds);

            var contentEl = document.getElementById('content');

            $scope.feeds.forEach(function(item){            
                // var p = document.createElement('p');
                // p.innerHTML = item.content;  
                // contentEl.appendChild(p);
                item.src = item.content.match( /src="([^"]*)"/ ) ? item.content.match( /src="([^"]*)"/ )[0].match( /"(.*?)"/ )[0].split('"')[1] : '';
            });
        });

        

    }
}]);

app.controller('ChartCtrl', ['$scope', function($scope){
var dataset = [
          { label: 'Abulia', count: 10 },
          { label: 'Betelgeuse', count: 20 },
          { label: 'Cantaloupe', count: 30 },
          { label: 'Dijkstra', count: 40 }
        ];
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory20b);
        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');
        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);
        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d) {
            return color(d.data.label);
          });
}]);