sitecore2Go.controller('WorkflowController', function ($scope, $routeParams, SessionStateService, WorkflowService) {

    $scope.workflows = [];
    $scope.server = [];

    $scope.getWorkflows = function () {
        if ($routeParams.serverName != null) {
            $scope.server = SessionStateService.getServer($routeParams.serverName);
            $scope.workflows = WorkflowService.getWorkflows($scope.server, true);
        }
    };
    
});
