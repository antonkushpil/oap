var App = angular.module('OwnersApp', ['ngRoute']);

App.controller('OwnersController', OwnersController);
App.controller('PetsController', PetsController);

var configFunction = function($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'routes/owners'
            })
        .when('/owners',
            {
                templateUrl: 'routes/owners'
            })
        .when('/pets/:ownerid',
            {
                templateUrl: function(params) { return '/routes/pets?ownerid=' + params.ownerid; }
            });
};

configFunction.$inject = ['$routeProvider'];

App.config(configFunction);

App.filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});

App.service('apiService', function ($http) {
    var ownersApi = "api/owners";
    var petsApi = "api/pets/";

    this.getOwner = function(ownerId) {
        return $http.get(ownersApi + "/" + ownerId);
    };
    this.getOwners = function() {
        return $http.get(ownersApi);
    };
    this.addOwner = function(ownerName) {
        return $http.post(ownersApi, { 'Name': ownerName });
    };
    this.deleteOwner = function(id) {
        return $http.delete(ownersApi + "/" + id);
    };
    this.getPets = function(ownerId) {
        return $http.get(petsApi + "/" + ownerId);
    };
    this.addPet = function(petName, ownerId) {
        return $http.post(petsApi, { 'Name': petName, 'OwnerId': ownerId })
    };
    this.deletePet = function(id) {
        return $http.delete(petsApi + "/" + id);
    };
});

App.service('helperMethods',
    function() {
        this.fillWithNulls = function(array, pageSize) {
            while (array.length % pageSize !== 0 || array.length === 0) {
                array.push({ 'name': null });
            }
            return array;
        };
        this.sortFilter = function(propertyName, ascending) {
            if (ascending) {
                return ['!' + propertyName, propertyName];
            } else {
                return ['!' + propertyName, '-' + propertyName];
            }
        };
        this.numberOfPages = function(array, pageSize) {
            var pages = Math.ceil(array.length / pageSize);
            var result = [], i = 1;
            while (i <= pages) {
                result.push(i);
                i++;
            }
            return result;
        };
        this.pageIsEmpty = function(numberOfElements, curPage, pageSize) {
            return numberOfElements <= curPage * pageSize && curPage !== 0;
        };
    });