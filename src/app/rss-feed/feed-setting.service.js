(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .service('feedSetting', feedSetting);

    feedSetting.$inject = ['$http', '$q', '$timeout', '$cacheFactory', 'defaultFeeder'];

    function feedSetting($http, $q, $timeout, $cacheFactory, defaultFeeder) {
        var currentFeedUrl = null,
            cacheKey = 'feeder',
            feedUrlCacheKey = 'feedUrlKey';

        this.save = function (url) {
            var defer = $q.defer();
            
            this.hasFeedUrl(url).then(function (exist) {
                if (!exist) {
                    var cache = getCache();
                    var urls = cache.get(feedUrlCacheKey);
                    if (urls) {
                        urls.push(url);
                    } else {
                        cache.put(feedUrlCacheKey, [url]);
                    }
                    defer.resolve(url);
                } else {
                    defer.reject('Already exist');
                }
            });
            
            return defer.promise;
        }

        this.getAllFeedUrl = function () {
            var defer = $q.defer();
            var cache = getCache();
            var urls = cache.get(feedUrlCacheKey);
            
            if(!urls){
                urls = [];                
                urls.push(defaultFeeder);
                cache.put(feedUrlCacheKey, urls);
            }
            
            defer.resolve(angular.copy(urls));

            return defer.promise;
        }

        this.hasFeedUrl = function (url) {
            var defer = $q.defer();

            this.getAllFeedUrl().then(function (urls) {
                defer.resolve(urls.indexOf(url) > -1);
            });

            return defer.promise;
        }

        this.setCurrentFeeder = function (url) {
            currentFeedUrl = url;
        }
        
        this.getCurrentFeeder = function(){
            return currentFeedUrl ? currentFeedUrl : defaultFeeder;
        }

        function getCache() {
            var cache = $cacheFactory.get(cacheKey)
                ? $cacheFactory.get(cacheKey) : $cacheFactory('feeder');
            return cache;
        }
    }
})()