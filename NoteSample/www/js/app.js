// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null; //建立資料庫變數db
angular.module('starter', ['ionic', 'ngCordova', 'starter.services','starter.HomeCtrl', 'starter.EditCtrl'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl',
                cache: false
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: 'templates/editNote.html',
                controller: 'editCtrl'
            })
    })
//在執行時使用$cordovaSQLite的服務
    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            if (window.cordova) {
                // 行動平台語法
                db = $cordovaSQLite.openDB({
                    name: 'noteDB'
                });
            } else {
                if(window.openDatabase==null||window.openDatabase==undefined)
                {
                    db = $cordovaSQLite.openDB({
                        name: 'noteDB'
                    });
                }
                else
                    db = window.openDatabase('noteDB', "1.0", "Note app", -1);
            }
            //建立note資料表,有id、title、message、date四個欄位
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS " + "note (id integer primary key AUTOINCREMENT, title text, message text,date text)");
        });
    })