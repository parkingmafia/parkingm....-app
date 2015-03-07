angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $firebaseArray, $location) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/freeSpaces");
    $scope.markers = $firebaseArray(ref);

    $scope.map = {
        center: {
            latitude: 48.199023, 
            longitude: 16.368714
        },
        zoom: 16
    };

    navigator.geolocation.getCurrentPosition(function (position) {
        $scope.map.center.longitude = position.coords.longitude;
        $scope.map.center.latitude = position.coords.latitude;
    });

    $scope.markerClick = function (e) {
        console.log(e);

        if ($scope.selectedMarker) {
            $scope.selectedMarker.show = false;
        }
        e.show = true;
        $scope.selectedMarker = e;
    };

    $scope.buy = function (m) {
        if ($scope.selectedMarker) {
            $scope.selectedMarker.show = false;
        }

        $location.path('/tab/chats');
    };
})

.controller('ChatsCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/user1/coord");
    $scope.marker = $firebaseObject(ref);
    ref.on('value', function (dataSnapshot) {
        $scope.marker.longitude = dataSnapshot.longitude;
        $scope.marker.latitude = dataSnapshot.latitude;
    });
    $scope.map = {
        center: {
            latitude: 48,
            longitude: 16
        },
        zoom: 8
    };
    $scope.myPosition = {};
    navigator.geolocation.getCurrentPosition(function (position) {
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