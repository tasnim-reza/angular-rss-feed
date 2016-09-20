(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .factory('feedReader', feedReader);

    feedReader.$inject = ['$http', '$q', '$timeout'];

    function feedReader($http, $q, $timeout) {
        var cached;
        // var httpConfig = {
        //     transformResponse: function (data, t) {
        //         // string -> XML document object
        //         return $.parseXML(data);
        //     },
        //     responseType: 'application/rss+xml'
        // };

        return {
            getFeed: function (url, isNew) {
                //return this.getMockFeed();
                var defer = $q.defer();

                if (isNew || !cached) {
                    $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
                        .then(function (data) {
                            cached = data;
                            defer.resolve(cached)
                        });
                }else{
                    defer.resolve(cached)
                }

                return defer.promise;
            },
            getMockFeed: function (url) {
                var defer = $q.defer();

                

                return defer.promise;
            },
            getFeedRaw: function (url) {
                let index = 0;
                const timeout = 5000;

                return new Promise((resolve, reject) => {
                    const callback = '__callback' + index++;
                    const timeoutID = window.setTimeout(() => {
                        reject(new Error('Request timeout.'));
                    }, timeout);

                    window[callback] = response => {
                        window.clearTimeout(timeoutID);
                        resolve(response.data);
                    };

                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + callback;
                    document.getElementsByTagName('head')[0].appendChild(script);
                });
            }
        }
    };
})();