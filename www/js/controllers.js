angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $firebaseArray, $location) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/freeSpaces");
    $scope.markers = $firebaseArray(ref);

    $scope.map = {
        center: {
            latitude: 48,
            longitude: 16
        },
        zoom: 8
    };
    $scope.markerClick = function (e) {
        console.log(e);
        e.show = true;
    };
    
    $scope.buy=function(m){
        console.log("buy");
        $location.path('/tab/chats');
    };
})

.controller('ChatsCtrl', function ($scope, $firebaseObject)
    {
        var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/user1/coord");
        $scope.marker = $firebaseObject(ref);
        $scope.map = {
            center: {
                latitude: 48,
                longitude: 16
            },
            zoom: 8
        };
        $scope.myPosition = {};
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.myPosition.longitude = position.coords.longitude;
            $scope.myPosition.latitude = position.coords.latitude;
        });
        $scope.myPosition.options = {icon:'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'};
    })

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});