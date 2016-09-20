(function () {
    'use strict';

    angular
        .module('app.core')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider']

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/home'
            })
            .when('/home', {
                templateUrl: 'app/layout/shell.html'
            })
            .when('/rss-feed', {
                templateUrl: 'app/rss-feed/feed-settings/feed-setting.view.html',
                controller: 'FeedSettingCtrl'
            })
            .when('/rss-feed/chart', {
                templateUrl: 'app/rss-feed/chart/chart.view.html',
                controller: 'ChartCtrl'
            })
            .when('/rss-feed/feed-setting', {
                templateUrl: 'app/rss-feed/feed-settings/feed-setting.view.html',
                controller: 'FeedSettingCtrl'
            })
            .when('/rss-feed/feeds', {
                templateUrl: 'app/rss-feed/feed-viewer/feed-viewer.view.html',
                controller: 'FeedViewerCtrl'
            })

            .otherwise({ redirectTo: '/' });
    }
})();