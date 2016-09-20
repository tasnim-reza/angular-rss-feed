(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .service('charDataAnalyser', charDataAnalyser);

    charDataAnalyser.$inject = ['$http', '$q', '$timeout', '$filter', 'feedSetting', 'feedReader'];

    function charDataAnalyser($http, $q, $timeout, $filter, feedSetting, feedReader) {
        var keyWords = ['Social Media', 'Hollywood'];

        this.getChartData = function () {
            var currentFeeder = feedSetting.getCurrentFeeder();

            return feedReader.getFeed(currentFeeder).then(function (res) {
                var feeds = res.data.responseData.feed.entries;
                var data = {}, count = [];

                keyWords.forEach(function (keyWord) {
                    var frequency = $filter('filter')(feeds, keyWord);
                    count.push(frequency.length);
                })

                data = {
                    label: 'key word map',
                    pct: count
                }

                return data;
            });
        }

        this.getChartLabel = function () {
            var labels = keyWords;// ['LCAP', 'MCAP', 'SCAP', 'Intl', 'Alt', 'Fixed']
            return labels;
        }

        this.addLabel = function (keyWord) {
            if (keyWords.indexOf(keyWord) === -1) {
                keyWords.push(keyWord);
            }
        }
    }
})();