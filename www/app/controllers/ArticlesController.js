sitecore2Go.controller('ArticlesController', function ($scope, $routeParams, SessionStateService, WorkflowService) {

    $scope.server = {};
    $scope.workflow = {};
    $scope.state = {};
    $scope.articles = [];
    

    $scope.reloadArticles = function () {
        $scope.articles = WorkflowService.getWorkflowStateArticles($scope.server, $routeParams.workflowId, $routeParams.stateId);
    };
    
    $scope.getArticles = function () {
        if ($routeParams.serverName != null) {
            $scope.server = SessionStateService.getServer($routeParams.serverName);
            $scope.workflow = WorkflowService.getWorkflow($routeParams.workflowId);
            $scope.state = WorkflowService.getWorkflowState($routeParams.stateId);
            $scope.articles = WorkflowService.getArticles($scope.server, $routeParams.workflowId);
        }
    };
    
});
