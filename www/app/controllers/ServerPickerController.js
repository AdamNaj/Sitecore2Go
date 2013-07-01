sitecore2Go.controller('ServerPickerController', function($scope, SessionStateService) {

    $scope.servers = SessionStateService.servers;

    $scope.showSpinner = function () {
        $.mobile.loading('show',
        { theme: "a", text: "My message", textonly: false, textVisible: true });

        $(".ui-page").bind("pagebeforeshow", function () {
            $("a.ui-btn-active").classToRemove("ui-btn-active");
        });
    };


});