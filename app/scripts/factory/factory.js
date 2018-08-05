'use strict';
angular.module('angularApp')
        .factory('commonFactory', 
    function ($http) {
        var url="http://localhost:3000/upload";
        var factory={};
        factory.upload = function(payload) {
            return $http({
                method: 'POST',
                url: url,
                data: payload
            });
        };
        return factory;
    });