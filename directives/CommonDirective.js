﻿angular.module('myWeddingInfo.CommonDirective', [])
    .directive('doublepicker', ['$ionicModal', function ($ionicModal) {
        return{
            restrict:'E',
            templateUrl: '../views/double-picker.html',
            scope:{
                'items':'=',
                'text':'=',
                'value':'=',
                'callback':'&'
            },
            link:function(scope,element,attrs){
                scope.multiSelect = attrs.multiSelect =false;
                scope.allowEmpty = attrs.allowEmpty === 'false' ? false : true;
                scope.headerText = attrs.headerText || '';
                scope.defaultText = scope.text || '';
                scope.noteText = attrs.noteText || '';
                scope.noteImg = attrs.noteImg || '';
                scope.noteImgClass = attrs.noteImgClass || '';
                $ionicModal.fromTemplateUrl(
                    'double-picker-items.html', {
                        'scope': scope
                    }
                ).then(function (modal) {
                        scope.modal = modal;
                    });
                scope.validate = function (event) {

                    // Select first value if not nullable
                    if (typeof scope.value == 'undefined' || scope.value == '' || scope.value == null) {
                        if (scope.allowEmpty == false) {
                            scope.value = scope.items[0].id;
                            scope.text = scope.items[0].text;

                            // Check for multi select
                            scope.items[0].checked = true;
                        } else {
                            scope.text = scope.defaultText;
                        }
                    }

                    // Hide modal
                    scope.hideItems();

                    // Execute callback function
                    if (typeof scope.callback == 'function') {
                        scope.callback(scope.value);
                    }
                }
                /* Show list */
                scope.showItems = function (event) {
                    event.preventDefault();
                    scope.modal.show();
                }

                /* Hide list */
                scope.hideItems = function () {
                    scope.modal.hide();
                }

                /* Destroy modal */
                scope.$on('$destroy', function () {
                    scope.modal.remove();
                });

                /* Validate single with data */
                scope.validateSingle = function (item) {

                    // Set selected text
                    scope.text = item.text;

                    // Set selected value
                    scope.value = item.id;

                    // Hide items
                    scope.hideItems();

                    // Execute callback function
                    if (typeof scope.callback == 'function') {
                        scope.callback(scope.value);
                    }
                }
            }

        };
    }]);

