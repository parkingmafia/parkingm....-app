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
                timestamp: new Date().getTime(),
                purchaser: user.name,
                seller: data.val().user
            };

            var openTransactionsRef = new Firebase('https://dazzling-fire-1486.firebaseio.com/openTransactions');
            pushRef = openTransactionsRef.push(openTransaction);
            freeSpaceRef.remove();
            var purchaseUserRef = new Firebase('https://dazzling-fire-1486.firebaseio.com/users/' + user.name);
            purchaseUserRef.update({
                currentTransaction: pushRef.key()
            });
            var sellerUserRef = new Firebase('https://dazzling-fire-1486.firebaseio.com/users/' + data.val().user);
            sellerUserRef.update({
                currentTransaction: pushRef.key()
            });
        });
        };

        user.offer = false;
        user.buy = true;

        $location.path('/tab/trac/buy');
})

.controller('OfferCtrl', function ($scope, $firebaseObject, $location, user) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/vehicle");
    var vehicle = $firebaseObject(ref);

    vehicle.$loaded(function (v) {
        v.show = false;
        $scope.marker = v;
    });


    console.log("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/vehicle");
    console.log($scope.marker);


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
            price: $scope.selectedMarker.price || 1.5,
            user: user.name
        });

        if ($scope.selectedMarker) {
            $scope.selectedMarker.show = false;
        }

        user.offer = true;
        user.buy = false;

        $location.path('/tab/trac/offer');
    };
})

.controller('OfferTracCtrl', function ($scope, $firebaseObject, user) {
    alert('Ihr Parkplatz wurde angeboten!');
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name)
    var userRef = $firebaseObject(ref);
    $scope.marker = userRef.vehicle;
    var transactionRef = new Firebase("https://dazzling-fire-1486.firebaseio.com/openTransactions/" + userRef.openTransaction);
    var transaction = $firebaseObject(transactionRef);
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + transaction.sellerId);


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

.controller('BuyTracCtrl', function ($scope, $firebaseObject, user) {
    alert('Sie haben einen Parkplatz gekauft!');
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name);
    var userRef = $firebaseObject(ref);
    $scope.marker = userRef.vehicle;
    var transactionRef = new Firebase("https://dazzling-fire-1486.firebaseio.com/openTransactions/" + userRef.openTransaction);
    var transaction = $firebaseObject(transactionRef);
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + transaction.buyerId);
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

.controller('TabsCtrl', function ($scope, user) {
    $scope.user = user;
});