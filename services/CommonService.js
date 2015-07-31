﻿angular.module('myWeddingInfo.CommonService', [])
    .factory('Common', function ($ionicPopup) {
        var self = this;
        self.showAlert = function (title, content, done) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: content
            });
            alertPopup.then(function (res) {
                if(done)
                    done();
            });
        };
        return self;
    });