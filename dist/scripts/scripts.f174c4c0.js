"use strict";angular.module("angularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("angularApp").factory("commonFactory",["$http",function(a){var b="http://localhost:3000/upload",c={};return c.upload=function(c){return a({method:"POST",url:b,data:c})},c}]),angular.module("angularApp").controller("MainCtrl",["$scope","commonFactory",function(a,b){a.submitted=!1,a.payload={},a.upload=function(b){console.log(b),a.images=[];for(var c=b.target||b.srcElement,d=0;d<c.files.length;d++){var e=c.files[d],f=new FileReader;f.onload=function(b){a.images.push(b.target.result),a.display=b.target.result,a.$apply()},f.readAsDataURL(e)}},a.submit=function(){a.payload.files=a.images,console.log(a.payload),b.upload(a.payload).then(function(b){console.log(b),a.submitted=!0,a.alert="alert-success",a.message=b.data.message},function(b){a.submitted=!0,a.alert="alert-danger",a.message=b.data.message}),a.images=[],a.payload={},a.payload=angular.copy({}),a.feedbackForm.$setPristine()}}]),angular.module("angularApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron layout-fluid"> <h3>Feedback Form</h3> <!-- <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> --> <form method="post" enctype="multipart/form-data" name="feedbackForm"> <div class="form-group" ng-model="feedback.files"> <input type="file" name="file" id="file" ng-model="payload.files" class="form-control" placeholder="Select File" onchange="angular.element(this).scope().upload(event)" multiple accept="image/*" required> </div> <div class="form-group" ng-repeat="file in images"> <img class="img-thumbnail col-md-6 col-sm-6" src="{{file}}"> </div> <div class="form-group"> <textarea placeholder="Enter Description" rows="3" type="text" name="description" ng-model="payload.description" id="" class="form-control" required>\n        </textarea></div> <div class="form-group"> <input type="reset" class="btn btn btn-lg btn-success" value="Submit" ng-click="submit()"> </div> </form> <div class="alert {{alert}}" ng-if="submitted" role="alert"> {{message}} </div> </div>')}]);