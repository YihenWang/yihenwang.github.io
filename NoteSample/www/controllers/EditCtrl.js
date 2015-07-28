angular.module('starter.EditCtrl', [])
    .controller('editCtrl', function ($scope, Note, $stateParams, $location, $window, Common) {
        $scope.note = [];
        Note.get($stateParams.id).then(function (result) {
            $scope.note = result;
        }, function (error) {
            console.warn(error);
        });
        $scope.back = function (path) {
            $location.path(path);
        };
        $scope.update = function (note) {
            Note.update(note);
            Common.showAlert('提示', '更新成功!!');
            $location.path('home');
        };
        $scope.delete = function (note) {
            Note.remove(note);
            $location.path('/home');
        };
    });