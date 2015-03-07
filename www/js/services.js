angular.module('starter.services', [])

.factory('user', function($location) {
  return {
    name : $location.search().user;
  }
});
