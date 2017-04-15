var OwnersController = function($scope, $http, apiService, helperMethods) {
    $scope.curPage = 0;
    $scope.pageSize = 3;
    $scope.ascending = true;

    $scope.direction = function() {
        return helperMethods.sortFilter('Name', $scope.ascending);
    };

    $scope.updateOwners = function() {
        apiService.getOwners().then(function(response) {
            var owners = response.data;
            $scope.count = owners.length;
            $scope.owners = helperMethods.fillWithNulls(owners, $scope.pageSize);
        });
    };
    $scope.updateOwners();

    $scope.addOwner = function(ownerName) {
        apiService.addOwner(ownerName).then(function() {
            $scope.updateOwners();
            $scope.ownerName = "";
        });
    };

    $scope.deleteOwner = function(id) {
        apiService.deleteOwner(id).then(function() {
            if (helperMethods.pageIsEmpty($scope.count - 1, $scope.curPage, $scope.pageSize)) {
                $scope.curPage = $scope.curPage - 1;
            }
            $scope.updateOwners();
        });
    };

    $scope.openPage = function(pageNumber) {
        $scope.curPage = pageNumber - 1;
        $scope.updateOwners();
    };

    $scope.numberOfPages = function() {
        return helperMethods.numberOfPages($scope.owners, $scope.pageSize);
    };
};

OwnersController.$inject = ['$scope', '$http', 'apiService', 'helperMethods'];