var map = null;
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myWeddingInfo', ['ionic', 'myWeddingInfo.controllers', 'myWeddingInfo.services','ngStorage','ngMessages','validation.match'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app/main');
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/sidemenu.html'
            })
            .state('app.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'views/main.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('app.thanks', {
                url: '/thanks',
                views: {
                    'menuContent': {
                        templateUrl: 'views/thanks.html',
                        controller: 'thanksCtrl'
                    }
                }
            })
            .state('app.photos', {
                url: '/photos',
                views: {
                    'menuContent': {
                        templateUrl: 'views/photos.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('app.videos', {
                url: '/videos',
                views: {
                    'menuContent': {
                        templateUrl: 'views/videos.html',
                        controller: 'mainCtrl'
                    }
                }
            })
            .state('backend', {
                url: '/backend',
                abstract: true,
                templateUrl: 'views/backendtabs.html'
            })
            .state('login',{
                url:'/login',
                templateUrl : 'views/login.html',
                controller : 'loginCtrl'
            })
            .state('signup',{
                url:'/signup',
                templateUrl : 'views/signup.html',
                controller : 'signupCtrl'
            })
            .state('backend.main', {
                url: '/main',
                views: {
                    'backend-main': {
                        templateUrl: 'views/backend-main.html',
                        controller: 'backendCtrl'
                    }
                }
            })
            .state('backend.account', {
                url: '/account',
                views: {
                    'backend-account': {
                        templateUrl: 'views/backend-account.html',
                        controller: 'backendCtrl'
                    }
                }
            });
    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.hide();
            }
        });
    })
