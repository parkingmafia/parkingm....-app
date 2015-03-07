angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $firebaseArray) {
        var ref = new Firebase("https://dazzling-fire-1486.firebaseio.com/");
        $scope.marker = $firebaseArray(ref);

        $scope.map = {
        center: {
            latitude: 48,
            longitude: 16
        },
        zoom: 8
    };
})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});