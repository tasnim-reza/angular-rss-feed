(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .controller('ChartCtrl', ChartCtrl);

    ChartCtrl.$inject = ['$scope', '$location', 'charDataAnalyser'];

    function ChartCtrl($scope, $location, charDataAnalyser) {

        charDataAnalyser.getChartData().then(function (data) {
            $scope.chartData = data;
        });

        $scope.chartLabel = charDataAnalyser.getChartLabel();

        $scope.refreshChart = function () {
            charDataAnalyser.addLabel($scope.keyWord);
            $scope.keyWord = '';
            charDataAnalyser.getChartData().then(function (data) {
                $scope.chartData = data;
            });
            
            $scope.chartLabel = charDataAnalyser.getChartLabel();

        }

        $scope.back = function () {
            $location.url('/rss-feed/feed-setting');
        }
    };
})();