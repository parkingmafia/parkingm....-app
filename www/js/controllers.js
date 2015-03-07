angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $firebaseArray) {
        var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/freeSpaces");
        $scope.marker = $firebaseArray(ref);

        $scope.map = {
        center: {
            latitude: 48,
            longitude: 16
        },
        zoom: 8
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
    })

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});