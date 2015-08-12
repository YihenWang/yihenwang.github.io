angular.module('myWeddingInfo.controllers', [])
    .controller('mainCtrl', function ($scope, $ionicModal, $location, $ionicPopup, $ionicLoading, $ionicScrollDelegate, Common, DataParse) {
        $scope.weddingInfo = {};
        $('#twzipcode').twzipcode();
        $scope.showMask = function () {
            $ionicLoading.show({
                template: '傳送中,請稍後...'
            });
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
                                } else {
                                    var attendanceNum = $scope.weddingInfo.AttendanceNum;
                                    if (attendanceNum < 3) {
                                        $scope.weddingInfo.AttendanceNum = 3;
                                    } else if (attendanceNum > 5) {
                                        $scope.weddingInfo.AttendanceNum = 5;
                                    } else {
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
                    DataParse.Update(result, params, function () {
                        window.location = '/#/app/thanks';
                    });
                } else {
                    DataParse.Add(params, function () {
                        window.location = '/#/app/thanks';
                    });
                }
                $scope.hideMask();
                $scope.weddingInfo = {};
                $('#zipcode').val(''), $('#county').val(''), $('#district').val('');
            };
            DataParse.Query(params, callback);
        };
        $scope.ValidateData = function (data) {
            if (!data.Name) {
                Common.showAlert('提示', '名字還沒填唷!');
                return false;
            } else if (!data.Phone) {
                Common.showAlert('提示', '手機還沒填唷!');
                return false;
            } else if (!data.Phone.match(/^09[0-9]{8}$/)) {
                Common.showAlert('提示', '手機格式有誤!', function () {
                    data.Phone = null;
                });

                return false;
            } else if (!data.Group) {
                Common.showAlert('提示', '還沒選擇你是哪方人馬唷!');
                return false;
            } else if (!data.Attendance) {
                Common.showAlert('提示', '還沒選擇參加人數唷!');
                return false;
            } else if (!$('#county').val() || !$('#district').val()) {
                Common.showAlert('提示', '還沒選擇喜帖寄送縣市唷!');
                return false;
            } else if (!data.Address) {
                Common.showAlert('提示', '地址還沒填唷!');
                return false;
            }
            return true;
        };
    })
    .controller('loginCtrl', function ($scope, loginParse, $location, $localStorage, $ionicLoading, $window, Common) {
        $scope.username = '';
        $scope.password = '';
        $scope.logon = function (username, password) {
            if (!username) {
                Common.showAlert('提示', '請輸入帳號!');
                return;
            } else if (!password) {
                Common.showAlert('提示', '請輸入密碼!');
                return;
            }
            $ionicLoading.show({
                template: '登入中,請稍後...'
            });
            var object = {
                'username': username,
                'password': password
            };
            loginParse.Login(object).then(function (result) {
                $ionicLoading.hide();
                $localStorage.token = result.data.sessionToken;
                $window.location.href = '#/backend/main';
            }, function (error) {
                $ionicLoading.hide();
                console.warn(error);
                $location.path('/login');
            });
        };
    })
    .controller('signupCtrl', function ($scope, loginParse, $location, $localStorage, $ionicLoading, Common) {
        $scope.user = {};
        $scope.signup = function (user) {
            loginParse.SignUp(user).then(function (result) {
                $localStorage.token = result.data.sessionToken;
                console.log(result);
            }, function (error) {
                console.warn(error.data.error);
            });
        };
    })
    .controller('backendCtrl', function ($scope, loginParse, DataParse, $location, $localStorage, $window) {
        if ($localStorage.hasOwnProperty("token") === true) {
            $scope.loginout = false;
            $scope.listAttend = [];
            var callback = function (result) {
                for (var i = 0; i < result.length; i++) {
                    var object = result[i];
                    $scope.listAttend.push({
                        Name: object.get('Name'),
                        Phone: object.get('Phone'),
                        Group: object.get('Group'),
                        Attendance: object.get('GrAttendanceoup'),
                        Address: object.get('Address'),
                        ThanksMemo: object.get('ThanksMemo')
                    });
                }
            };
            DataParse.QueryAll(callback);

        } else {
            $location.path('/login');
        }
        $scope.Logout = function () {
            if ($scope.loginout) {
                $scope.loginout = false;
            }
            delete $localStorage.token;
            //$window.location.reload('true');
            $window.location.href = '#/login';
        };
    })
    .controller('thanksCtrl', function ($scope, MAP) {
        $scope.poi = {
            "name": "基隆港海產樓",
            "address": "基隆市信義區信二路181號",
            "lat": 25.1295278,
            "lng": 121.7508176
        };
        map = MAP.initialize('map');
        var marker = {
            lat: $scope.poi.lat,
            lng: $scope.poi.lng,
            title: $scope.poi.name
        };
        MAP.setLocation(map, marker);
    });