sitecore2Go.controller('ServerDetailsController', function ($scope, $routeParams, $location, SessionStateService, WorkflowService) {

    $scope.servers = SessionStateService.servers;
    $scope.server = {};

    $scope.setupServerDetails = function () {
        if ($routeParams.serverName != null) {
            $scope.server = SessionStateService.getServer($routeParams.serverName);
            $scope.accountName = $scope.server.name;
            $scope.hostName = $scope.server.hostName;
            $scope.transport = $scope.server.transport;
            $scope.userName = $scope.server.userName;
            $scope.password = $scope.server.password;
        }
    };

    $scope.deleteServer = function() {
        $scope.server = SessionStateService.deleteServer($routeParams.serverName);
        SessionStateService.persist();
    };
    
    $scope.serverSaveClick = function () {
        if ($routeParams.serverName != null) {
            SessionStateService.modifyServer($routeParams.serverName, $scope.accountName, $scope.hostName, $scope.transport, $scope.userName, $scope.password);
        } else {
            SessionStateService.addServer($scope.accountName, $scope.hostName, $scope.transport, $scope.userName, $scope.password);
        }
        SessionStateService.persist();
        if (WorkflowService.workflows.length > 0) {
            $location.url("/Workflows/" + $scope.accountName);
        }
    };
});