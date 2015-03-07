angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http) {
    $scope.map = {
        center: {
            latitude: 48,
            longitude: 16
        },
        zoom: 8
    };
    $http.get('data.json').success(function (data) {
        $scope.marker = data;
    });
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