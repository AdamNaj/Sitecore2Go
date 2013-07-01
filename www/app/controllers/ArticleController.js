sitecore2Go.controller('ArticleController', function ($scope, $routeParams, SessionStateService, WorkflowService) {

    $scope.server = {};
    $scope.workflow = {};
    $scope.state = {};
    $scope.article = {};
    $scope.fields = [];

    $scope.getArticle = function() {
        if ($routeParams.articleId != null) {
            $scope.server = SessionStateService.getServer($routeParams.serverName);
            $scope.workflow = WorkflowService.getWorkflow($routeParams.workflowId);
            $scope.state = WorkflowService.getWorkflowState($routeParams.stateId);
            $scope.article = WorkflowService.getArticle($scope.server, $routeParams.articleId);
            $scope.fields = [];
            for(f in $scope.article.Fields){
                $scope.fields[$scope.fields.length] = $scope.article.Fields[f];
            }
        }
    };
});