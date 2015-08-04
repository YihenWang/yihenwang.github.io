angular.module('myWeddingInfo.controllers', [])
    .controller('mainCtrl', function ($scope, $ionicModal, $state, $ionicPopup, $ionicLoading, Common, DataParse) {
        $scope.weddingInfo = {};
        $('#twzipcode').twzipcode();
        $scope.showMask = function () {
            $ionicLoading.show({template: '傳送中,請稍後...'});
        };
        $scope.hideMask = function () {
            $ionicLoading.hide();
        };
        $scope.checkAttendance = function (num) {
            if (num > 2) {
                var myPopup = $ionicPopup.show({
                    title: '參加人數',
                    subTitle: '包含自己在內',
                    template: '<input type="tel" id="attendanceNum" ng-model="weddingInfo.AttendanceNum" maxlength="1" pattern="([0-9])" style="text-align: center;">',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>確定</b>',
                            type: 'button-calm',
                            onTap: function (e) {
                                if (!$scope.weddingInfo.AttendanceNum) {
                                    $('#attendanceNum').attr('placeholder', '請輸入人數!');
                                    e.preventDefault();
                                }
                                else {
                                    var attendanceNum = $scope.weddingInfo.AttendanceNum;
                                    if (attendanceNum < 3) {
                                        $scope.weddingInfo.AttendanceNum = 3;
                                    }
                                    else if (attendanceNum > 5) {
                                        $scope.weddingInfo.AttendanceNum = 5;
                                    }
                                    else {
                                        $scope.weddingInfo.AttendanceNum = parseInt($scope.weddingInfo.AttendanceNum);
                                    }
                                }
                            }
                        }
                    ]
                });
            }
        };
        $scope.sendData = function (data) {
            if (!$scope.ValidateData(data)) return;
            $scope.showMask();
            var guestAddress = ($('#zipcode').val() + ' ' + $('#county').val() + $('#district').val() + data.Address).trim();
            var params = {
                Name: data.Name,
                Phone: data.Phone,
                Group: data.Group,
                Attendance: data.Attendance === 3 ? $scope.weddingInfo.AttendanceNum : data.Attendance,
                Address: guestAddress,
                ThanksMemo: !data.ThanksMemo ? '' : data.ThanksMemo
            };
            var callback = function (result) {
                if (result) {
                    DataParse.Update(result,params);
                }
                else {
                    DataParse.Add(params);
                }
                $scope.hideMask();
                $scope.weddingInfo = {};
                $('#zipcode').val(''), $('#county').val(''), $('#district').val('');
            };
            DataParse.Query(params, callback);
        };
        $scope.ValidateData = function (data) {
            console.log(data);
            if (!data.Name) {
                Common.showAlert('提示', '名字還沒填唷!');
                return false;
            }
            else if (!data.Phone) {
                Common.showAlert('提示', '手機還沒填唷!');
                return false;
            }
            else if (!data.Phone.match(/^09[0-9]{8}$/)) {
                Common.showAlert('提示', '手機格式有誤!', function () {
                    data.Phone = null;
                });

                return false;
            }
            else if (!data.Group) {
                Common.showAlert('提示', '還沒選擇你是哪方人馬唷!');
                return false;
            }
            else if (!data.Attendance) {
                Common.showAlert('提示', '還沒選擇參加人數唷!');
                return false;
            }
            else if (!$('#county').val() || !$('#district').val()) {
                Common.showAlert('提示', '還沒選擇喜帖寄送縣市唷!');
                return false;
            }
            else if (!data.Address) {
                Common.showAlert('提示', '地址還沒填唷!');
                return false;
            }
            return true;
        };
    });