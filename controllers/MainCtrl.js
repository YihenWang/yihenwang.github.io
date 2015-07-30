angular.module('myWeddingInfo.MainCtrl', [])
    .controller('mainCtrl', function ($scope, $ionicModal, $state,$ionicScrollDelegate) {
        $scope.checkAttendance = function (num) {
            console.log(num);
            if (num > 2) {
                $('#attendanceNum').show();
            }
            else {
                $('#attendanceNum').hide();
            }
        };
        $ionicScrollDelegate.scrollBottom();
    });