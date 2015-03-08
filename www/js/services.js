angular.module('starter.services', [])

.factory('user', function ($window) {
        return {
            name: $window.location.search.substring(6)
        };
    })
    .factory('car', function ($interval) {
        var directionsService = new google.maps.DirectionsService();

        return {
            drive: function (ref, user, destination) {
                var request = {
                    origin: new google.maps.LatLng(user.vehicle.latitude, user.vehicle.longitude),
                    destination: new google.maps.LatLng(destination.latitude, destination.longitude),
                    travelMode: google.maps.TravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        console.log(response);
                        var steps = response.routes[0].legs[0].steps,
                            index, pathIndex,
                            positions = [],
                            positionIndex = 0;

                        for (index in steps) {
                            var step = steps[index];

                            for (pathIndex in step.path) {
                                var path = step.path[pathIndex];

                                positions.push({
                                    longitude: path.lng(),
                                    latitude: path.lat()
                                });
                            }
                        }

                        $interval(function () {
                            user.vehicle.latitude = positions[positionIndex].latitude;
                            user.vehicle.longitude = positions[positionIndex].longitude;
                            ref.update({vehicle:{longitude:user.vehicle.longitude, latitude:user.vehicle.latitude}});

                            positionIndex += 1;
                        }, 200, positions.length);
                    }
                });


            }
        };
    });