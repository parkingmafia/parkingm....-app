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


        user.offer = false;
        user.buy = true;

        $location.path('/tab/trac/buy');
    };
})

.controller('OfferCtrl', function ($scope, $firebaseObject, $location, user) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name + "/vehicle");
    var vehicle = $firebaseObject(ref);

    vehicle.$loaded(function (v) {
        v.show = false;
        $scope.marker = v;
    });


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

    $scope.markerClick = function () {
        $scope.markerstate.show = true;
    };

    $scope.offer = function () {
        var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/freeSpaces");

        ref.push({
            longitude: $scope.marker.longitude,
            latitude: $scope.marker.latitude,
            price: $scope.marker.price || 1.5,
            user: user.name
        });

        if ($scope.marker) {
            $scope.marker.show = false;
        }

        user.offer = true;
        user.buy = false;

        $location.path('/tab/trac/offer');
    };
})

.controller('OfferTracCtrl', function ($scope, $firebaseObject, user) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name);
    ref.on('value', function (userData) {
        if(userData.val().currentTransaction !== undefined)
        {
            var transactionRef = new Firebase("https://dazzling-fire-1486.firebaseio.com/openTransactions/" + userData.val().currentTransaction);
            var transaction = $firebaseObject(transactionRef);

            transaction.$loaded(function (t) {
                var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + t.seller);
                var seller = $firebaseObject(ref);

                seller.$loaded(function (seller) {
                    $scope.myPosition.longitude = seller.vehicle.longitude;
                    $scope.myPosition.latitude = seller.vehicle.latitude;
                });
            });
        }
    });
    var userRef = $firebaseObject(ref);
    $scope.marker = userRef.vehicle;

    userRef.$loaded(function (user) {
        $scope.marker = user.vehicle;
        $scope.marker.options = {icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'};
    });

    $scope.map = {
        center: {
            latitude: 48.199023,
            longitude: 16.368714
        },
        zoom: 12
    };
    $scope.myPosition = {};
    $scope.myPosition.options = {
        icon:'http://google-maps-icons.googlecode.com/files/car.png'
    };
})

.controller('BuyTracCtrl', function ($scope, $firebaseObject, user, car) {
    var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + user.name);
    var userRef = $firebaseObject(ref);


    userRef.$loaded(function (user) {
        $scope.marker = user.vehicle;
        $scope.marker.options = {icon:'http://google-maps-icons.googlecode.com/files/car.png'};

        var transactionRef = new Firebase("https://dazzling-fire-1486.firebaseio.com/openTransactions/" + userRef.currentTransaction);
        var transaction = $firebaseObject(transactionRef);

        transaction.$loaded(function (t) {
            var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/users/" + t.seller);
            var seller = $firebaseObject(ref);

            seller.$loaded(function (seller) {
                car.drive(ref, user, seller.vehicle);
                $scope.myPosition.longitude = seller.vehicle.longitude;
                $scope.myPosition.latitude = seller.vehicle.latitude;
            });
        });
    });

    $scope.map = {
        center: {
            latitude: 48.164874, 
            longitude: 16.368424
        },
        zoom: 12
    };
    $scope.myPosition = {};
    $scope.myPosition.options = {
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
    };
})

.controller('TabsCtrl', function ($scope, user) {
    $scope.user = user;
});