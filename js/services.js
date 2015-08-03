angular.module('myWeddingInfo.services', [])
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
    .factory('linkParse', function (DBA, PARSE_KEYS, PARSE_API) {
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
        }
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
    .value('PARSE_KEYS', {
        APP_ID: '6ZRJK6kD3zZNTHK86dFtOab6i6vHp1QGuYZ2wouk',
        REST_API_KEY: 'tJIDubakoPQkXhgwGa3u4QNT0orgHtqrtn1zBCFf'
    })
    .value('PARSE_API', "https://api.parse.com/1/classes/MyWeddingInfo");