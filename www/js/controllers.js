angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $firebaseArray, $firebaseObject, $location, user) {
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
        var freeSpaceRef = new Firebase('https://dazzling-fire-1486.firebaseio.com/freeSpaces/' + $scope.selectedMarker.$id);
        freeSpaceRef.once('value', function (data) {
            var openTransaction = {
                longitude: data.val().longitude,
                latitude: data.val().latitude,
                purchaser: user.name
            };
            var openTransactionsRef = new Firebase('https://dazzling-fire-1486.firebaseio.com/openTransactions');
            openTransactionsRef.push(openTransaction);
            freeSpaceRef.remove();
        });


        $location.path('/tab/chats');
    };
})

.controller('OfferCtrl', function ($scope, $firebaseObject, $location, user) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/vehicle");
    $scope.markers = $firebaseObject(ref);

    console.log("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/vehicle");


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

    $scope.markerClick = function (model) {
        if ($scope.selectedMarker) {
            $scope.selectedMarker.show = false;
        }
        model.show = true;
        $scope.selectedMarker = model;
    };

    $scope.offer = function () {
        var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/freeSpaces");

        ref.push({
            longitude: $scope.selectedMarker.longitude,
            latitude: $scope.selectedMarker.latitude,
            price: $scope.selectedMarker.price || 1.5
        });

        if ($scope.selectedMarker) {
            $scope.selectedMarker.show = false;
        }

        $location.path('/tab/chats');
    };
})

.controller('ChatsCtrl', function ($scope, $firebaseObject, user) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/coord");
    $scope.marker = $firebaseObject(ref);
    $scope.map = {
        center: {
            latitude: 48.199023,
            longitude: 16.368714
        },
        zoom: 12
    };
    $scope.myPosition = {};
    navigator.geolocation.getCurrentPosition(function (position) {
        $scope.myPosition.longitude = position.coords.longitude;
        $scope.myPosition.latitude = position.coords.latitude;
    });
    $scope.myPosition.options = {
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});