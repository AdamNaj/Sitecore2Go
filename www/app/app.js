
var sitecore2Go = angular.module('sitecore2Go', []);

//This configures the routes and associates each route with a view and a controller

sitecore2Go.config(function($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

    $routeProvider
        .when('/ServerPicker',
            {
                templateUrl: '#ServerPicker',
                jqmOptions: { transition: 'slide' }
            })
        .when('/ServerDetails',
            {
                templateUrl: '#ServerDetails',
                jqmOptions: { transition: 'slide' }
            })
        .when('/ServerDetails/:serverName',
            {
                templateUrl: '#ServerDetails',
                jqmOptions: { transition: 'slide' }
            })
        .when('/DeleteServer/:serverName',
            {
                templateUrl: '#DeleteServer',
                jqmOptions: {
                    role: 'dialog',
                    transition: 'flip'
                }
            })
        .when('/Error',
            {
                templateUrl: '#Error',
                jqmOptions: {
                    role: 'dialog',
                    transition: 'flip'
                }
            })
        .when('/Workflows/:serverName',
            {
                templateUrl: '#Workflows',
                jqmOptions: { transition: 'slide' }
            })
        .when('/WorkflowStates/:serverName/:workflowId',
            {
                templateUrl: '#WorkflowStates',
                jqmOptions: { transition: 'slide' }
            })
        .when('/Articles/:serverName/:workflowId/:stateId',
            {
                templateUrl: '#Articles',
                jqmOptions: { transition: 'slide' }
            })
        .when('/Article/:serverName/:workflowId/:stateId/:articleId',
            {
                templateUrl: '#Article',
                jqmOptions: { transition: 'slide' }
            })
        .when('/About',
            {
                templateUrl: '#About',
                jqmOptions: { transition: 'pop' }
            })
        .otherwise({ redirectTo: '/ServerPicker' });
});



