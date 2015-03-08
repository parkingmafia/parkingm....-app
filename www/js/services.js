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
                        var steps = response.routes[0].legs[0].steps,
                            index,
                            positions = [], positionIndex = 0;

                        for (index in steps) {
                            var step = steps[index];

                            positions.push({
                                longitude: step.start_location.lng(),
                                latitude: step.start_location.lat()
                            });
                            positions.push({
                                longitude: step.end_location.lng(),
                                latitude: step.end_location.lat()
                            });
                        }

                        $interval(function () {
                            user.vehicle.latitude = positions[positionIndex].latitude;
                            user.vehicle.longitude = positions[positionIndex].longitude;

                            positionIndex += 1;
                        }, 2000, positions.length);
                    }
                });


            }
        };
    });