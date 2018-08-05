'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope,commonFactory) {
    $scope.submitted=false;
    $scope.payload={};
    // $scope.file,$scope.description='';
    $scope.upload = function (obj) {
      console.log(obj)
      $scope.images=[];
      var elem = obj.target || obj.srcElement;
      for (var i = 0; i < elem.files.length; i++) {
          var file = elem.files[i];
          var reader = new FileReader();

          reader.onload = function (e) {
              $scope.images.push(e.target.result);
              $scope.display = e.target.result;
              $scope.$apply();
          };
          reader.readAsDataURL(file);
      }
    };
    $scope.submit = function () {
      $scope.payload.files=$scope.images;
      console.log($scope.payload);
      
      commonFactory.upload($scope.payload).then(function success(response){
        console.log(response);
        $scope.submitted=true;
        $scope.alert="alert-success";
        $scope.message=response.data.message;
      },function error(errResponse){
        $scope.submitted=true;
        $scope.alert="alert-danger";
        $scope.message=errResponse.data.message;
      });

        $scope.images=[];
        $scope.payload={};
        $scope.payload = angular.copy({});
        $scope.feedbackForm.$setPristine(); 
    };
    
    });
