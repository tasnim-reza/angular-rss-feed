(function () {
    'use strict';
    
    angular
    .module('app.core')
    .constant('defaultFeeder', 'https://news.google.com/news/feeds?pz=1&cf=all&ned=en&hl=en&q=Social+Media&output=rss')
    .constant('errorMessages', {
        status404: 'An error has occured, The user doesn\'t exist!.',
        status408: 'An error has occured, Request timed out.',
        general: 'An error has occured.'
    });
})();   

//https://news.google.de/news/feeds?pz=1&cf=all&ned=LANGUAGE&hl=COUNTRY&q=SEARCH_TERM&output=rss