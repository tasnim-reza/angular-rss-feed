(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .controller('FeedSettingCtrl', FeedSettingCtrl);

    FeedSettingCtrl.$inject = ['$scope', '$location', 'defaultFeeder', 'feedSetting'];

    function FeedSettingCtrl($scope, $location, defaultFeeder, feedSetting) {
        $scope.defaultFeeder = defaultFeeder;        

        feedSetting.getAllFeedUrl().then(function (urls) {
            $scope.feeders = urls;
        })

        $scope.save = function () {
            feedSetting.save($scope.feeder).then(function (url) {
                $scope.feeders.push(url);
                $scope.feeder = '';
            });
        }
        
        $scope.load = function(url){
            feedSetting.setCurrentFeeder(url);
            $location.url('/rss-feed/feeds');
        }
        
        
    };
})();