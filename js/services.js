angular.module('myWeddingInfo.services', [])
    .factory('Common', function ($ionicPopup) {
        var self = this;
        self.showAlert = function (title, content, done) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: content
            });
            alertPopup.then(function (res) {
                if (done)
                    done();
            });
        };
        return self;
    })
    .factory('DBA', function ($http, $q) {
        var self = this;
        self.query = function (method, api, data, header) {
            var q = $q.defer();
            switch (method) {
            case 'GET':
                $http.get(api, header).then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn(error);
                    q.reject(error);
                })
                break;
            case 'POST':
                $http.post(api, data, header).then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn(error);
                    q.reject(error);
                })
                break;
            case 'PUT':
                $http.put(api, data, header).then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn(error);
                    q.reject(error);
                })
                break;
            case 'DELETE':
                $http.delete(api, header).then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn(error);
                    q.reject(error);
                })
                break;
            }
            return q.promise;
        }
        return self;
    })
    .factory('loginParse', function (DBA, PARSE_KEYS, PARSE_API, LOGIN_API, LOGOUT_API, SIGNIN_API) {
        var self = this;
        var header = {
            headers: {
                'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY
            }
        };
        var headerJson = {
            headers: {
                'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        };
        self.SignUp = function (object) {
            return DBA.query('POST', SIGNIN_API, object, headerJson);
        };
        self.Login = function (object) {
            return DBA.query('GET', LOGIN_API + "?" + encodeURI('username=' + object.username + '&password=' + object.password), '', header);
        };
        self.Logout = function (sessionToken) {
            header.headers['X-Parse-Session-Token'] = sessionToken;
            return DBA.query('POST', LOGOUT_API, '', header);
        };
        return self;
    })
    .factory('ajaxParse', function (DBA, PARSE_KEYS, PARSE_API) {
        var self = this;
        var header = {
            headers: {
                'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY
            }
        };
        var headerJson = {
            headers: {
                'X-Parse-Application-Id': PARSE_KEYS.APP_ID,
                'X-Parse-REST-API-Key': PARSE_KEYS.REST_API_KEY,
                'Content-Type': 'application/json'
            }
        };
        self.getAll = function () {
            return DBA.query('GET', PARSE_API, '', header);
        };
        self.get = function (objectId) {
            return DBA.query('GET', PARSE_API + '/' + objectId, '', header);

        };
        self.create = function (object) {
            return DBA.query('POST', PARSE_API, object, headerJson);
        }
        self.update = function (objectId, object) {
            return DBA.query('PUT', PARSE_API + '/' + objectId, object, headerJson);
        }
        self.delete = function (objectId) {
            return DBA.query('DELETE', PARSE_API + '/' + objectId, '', headerJson);
        }
        return self;
    })
    .factory('DataParse', function (PARSE_KEYS, Common) {
        Parse.initialize(PARSE_KEYS.APP_ID, PARSE_KEYS.JAVASCRIPT_KEY);
        var self = this;
        self.Query = function (userData, callback) {
            var MyWeddingInfo = Parse.Object.extend("MyWeddingInfo");
            var query = new Parse.Query(MyWeddingInfo);
            if (userData.Name && userData.Phone) {
                query.equalTo("Name", userData.Name);
                query.equalTo("Phone", userData.Phone);
            }
            query.first({
                success: function (results) {
                    if (callback)
                        callback(results);
                },
                error: function (error) {
                    Common.showAlert("Error", error.code + " " + error.message);
                }
            });
        };
        self.QueryAll = function (callback) {
            var MyWeddingInfo = Parse.Object.extend("MyWeddingInfo");
            var query = new Parse.Query(MyWeddingInfo);
            query.find({
                success: function (results) {
                    if (callback)
                        callback(results);
                }
            }, {
                error: function (error) {
                    Common.showAlert("Error", error.code + " " + error.message);
                }
            })
        };
        self.Add = function (userData, callback) {
            var MyWeddingInfo = Parse.Object.extend("MyWeddingInfo");
            var weddingInfo = new MyWeddingInfo();
            weddingInfo.save(userData, {
                success: function (weddingInfo) {
                    if (callback)
                        callback();
                },
                error: function (weddingInfo, error) {
                    Common.showAlert("Error", error.code + " " + error.message);
                }
            });
        };
        self.Update = function (result, userData, callback) {
            result.save(userData, {
                success: function (result) {
                    if (callback)
                        callback();
                },
                error: function (weddingInfo, error) {
                    Common.showAlert("Error", error.code + " " + error.message);
                }
            });
        };
        return self;

    })
    .factory('MAP', function () {
        var self = this;
        self.initialize = function (id) {
            /*var LatLng = navigator.geolocation.getCurrentPosition(function (pos) {
                return new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            });// 目前位置*/
            var mapOptions = {
                center: new google.maps.LatLng(25, 121),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(id), mapOptions);
            return map;
        };
        self.setLocation = function (map, pos) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                map: map,
                title: pos.title
            });
            map.setCenter(marker.getPosition());
            return map;
        };
        return self;
    })
    .value('PARSE_KEYS', {
        APP_ID: '6ZRJK6kD3zZNTHK86dFtOab6i6vHp1QGuYZ2wouk',
        REST_API_KEY: 'tJIDubakoPQkXhgwGa3u4QNT0orgHtqrtn1zBCFf',
        JAVASCRIPT_KEY: 'pIWN8RBjAVwH19reai8aMyV6VSBuYkc7uHeWbHjU'
    })
    .value('PARSE_API', "https://api.parse.com/1/classes/MyWeddingInfo")
    .value('LOGIN_API', "https://api.parse.com/1/login")
    .value('SIGNIN_API', "https://api.parse.com/1/users")
    .value('LOGOUT_API', "https://api.parse.com/1/logout");