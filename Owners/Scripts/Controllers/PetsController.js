var PetsController = function($scope, $http, apiService, helperMethods) {
    $scope.curPage = 0;
    $scope.pageSize = 3;
    $scope.ascending = true;

    $scope.direction = function () {
        return helperMethods.sortFilter('Name', $scope.ascending);
    };

    $scope.getOwner = function() {
        apiService.getOwner($scope.ownerId).then(function(response) {
            $scope.owner = response.data;
        });
    };

    $scope.updatePets = function() {
        apiService.getPets($scope.ownerId).then(function(response) {
            var pets = response.data;
            $scope.count = pets.length;
            $scope.pets = helperMethods.fillWithNulls(pets, $scope.pageSize);
        });
    };

    $scope.init = function(ownerId) {
        $scope.ownerId = ownerId;
        $scope.updatePets();
        $scope.getOwner();
    };

    $scope.addPet = function(petName) {
        apiService.addPet(petName, $scope.ownerId).then(function() {
            $scope.updatePets();
            $scope.petName = "";
        });
    };

    $scope.deletePet = function(id) {
        apiService.deletePet(id).then(function() {
            if (helperMethods.pageIsEmpty($scope.count - 1, $scope.curPage, $scope.pageSize)) {
                $scope.curPage = $scope.curPage - 1;
            }
            $scope.updatePets();
        });
    };

    $scope.openPage = function(pageNumber) {
        $scope.curPage = pageNumber - 1;
        $scope.updatePets();
    };

    $scope.numberOfPages = function () {
        return helperMethods.numberOfPages($scope.pets, $scope.pageSize);
    };
};

PetsController.$inject = ['$scope', '$http', 'apiService', 'helperMethods'];