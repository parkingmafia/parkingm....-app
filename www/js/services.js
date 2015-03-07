angular.module('starter.services', [])

.factory('user', function ($window) {
    return {
        name: $window.location.search.substring(6)
    };
});