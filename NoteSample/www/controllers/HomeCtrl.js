angular.module('starter.HomeCtrl', [])
    .controller('homeCtrl', function ($scope, Note, $ionicModal,$state) {

        $scope.notes = []; //所有記事
        $scope.listAllNotes = function () {
            Note.all().then(function (result) { // 讀取note資料
                $scope.notes = result;
            }, function (error) {
                console.warn(error);
            });
        };
        $scope.listAllNotes(); // 列出所有記事
        $scope.addNote = function () { // 開啟modal視窗,填寫資料存入資料庫
            $scope.note = []; // 新增記事使用
            $scope.openModal(); //開啟視窗
        };
        $scope.insert = function (note) { // 新增記事
            Note.add(note);
            $scope.closeModal();
            $scope.listAllNotes(); //重新列表
        };
        $scope.remove=function(note){
            Note.remove(note);
            $scope.listAllNotes();
        };
        $ionicModal.fromTemplateUrl('templates/addNote.html', { // modal視窗定義
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        })
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
    });