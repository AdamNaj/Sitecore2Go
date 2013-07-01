sitecore2Go.controller('WorkflowStatesController', function($scope, $routeParams, SessionStateService, WorkflowService) {

    $scope.server = {};
    $scope.workflow = {};
    $scope.states = [];
    $scope.articles = [];

    $scope.getWorkflowStates = function () {
        if ($routeParams.workflowId != null) {
            $scope.server = SessionStateService.getServer($routeParams.serverName);
            $scope.workflow = WorkflowService.getWorkflow($routeParams.workflowId);
            $scope.states = WorkflowService.getWorkflowStates($scope.server, $routeParams.workflowId, true);
            var finalWorkflowStateId = "";
            for (var i = $scope.states.length - 1; i > -1; i++) {
                if ($scope.states[i].final) {
                    finalWorkflowStateId = $scope.states[i].ID;
                    break;
                }
            }
            $scope.articles = WorkflowService.getArticles($scope.server, $routeParams.workflowId, finalWorkflowStateId, true);
            for (var s in $scope.states) {
                var state = $scope.states[s];
                state.articles = [];
                var stateId = state.ID;
                for (var a in $scope.articles) {
                    if ($scope.articles[a].workflowState === stateId) {
                        state.articles[state.articles.length] = $scope.articles[a];
                    }
                }
            }
        }
    };

});
