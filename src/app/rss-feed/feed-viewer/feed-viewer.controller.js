(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .controller('FeedViewerCtrl', FeedViewerCtrl);

    FeedViewerCtrl.$inject = ['$scope', '$location', 'feedReader', 'feedSetting'];

    function FeedViewerCtrl($scope, $location, feedReader, feedSetting) {
        $scope.currentFeeder = feedSetting.getCurrentFeeder();

        feedSetting.getAllFeedUrl().then(function (urls) {
            $scope.feeders = urls;
        })

        $scope.loadFeed = function (isNew) {
            feedReader.getFeed($scope.currentFeeder, isNew).then(function (res) {
                $scope.feeds = res.data.responseData.feed.entries;

                $scope.feeds.forEach(function (item) {
                    item.src = item.content.match(/src="([^"]*)"/) ? item.content.match(/src="([^"]*)"/)[0].match(/"(.*?)"/)[0].split('"')[1] : '';
                });
            });
        }

        $scope.back = function () {
            $location.url('/rss-feed/feed-setting');
        }

        $scope.loadFeed();
    };
})();