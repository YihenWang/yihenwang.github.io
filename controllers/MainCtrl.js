angular.module('myWeddingInfo.MainCtrl', [])
    .controller('mainCtrl', function ($scope, $ionicModal, $state, $ionicPopup, Common) {
        $scope.attendance = {};
        $('#twzipcode').twzipcode();
        $scope.checkAttendance = function (num) {
            if (num > 2) {
                var myPopup = $ionicPopup.show({
                    title: '參加人數',
                    subTitle: '包含自己在內',
                    template: '<input type="tel" id="attendanceNum" ng-model="attendance.num" maxlength="1" pattern="([0-9])" style="text-align: center;">',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>確定</b>',
                            type: 'button-calm',
                            onTap: function (e) {
                                if (!$scope.attendance.num) {
                                    $('#attendanceNum').attr('placeholder', '請輸入人數!');
                                    e.preventDefault();
                                }
                                else {
                                    var attendanceNum = $scope.attendance.num;
                                    if (attendanceNum < 3) {
                                        $scope.attendance.num = 3;
                                    }
                                    else if (attendanceNum > 5) {
                                        $scope.attendance.num = 5;
                                    }
                                    console.log($scope.attendance.num);
                                }
                            }
                        }
                    ]
                });
            }
            else {
                console.log(num);
            }
        };
    });