sitecore2Go.service('WorkflowService', function (SessionStateService, $location, $http, $waitDialog) {

    this.workflows = [];
    this.states = [];
    this.articles = [];

    this.getWorkflows = function (server, force) {
        if (this.workflows == null || this.workflows.length === 0 || force) {
            this.workflows = this.getSitecoreWebApiItems(server,
                "query=/Sitecore/system/Workflows/*&sc_database=master&payload=min",
                "Authenticating",
                "Invalid credentials or server unavailable.");
        }
        return this.workflows;
    };

    this.signalError = function (title, message) {
        $location.url("/Error");
    };

    this.getSitecoreWebApiItems = function(server, callParams, message, errorMessage) {
        var result;
        var that = this;
        $.mobile.loading('show',
            { theme: "a", text: message, textonly: false, textVisible: true });

        jQuery.support.cors = true;
        try {
            $.ajax({
                datatype: "json",
                url: server.transport + "://" + server.hostName + "/-/item/v1/?" + callParams,
                async: false,
                headers: {
                    "X-Scitemwebapi-Username": server.userName,
                    "X-Scitemwebapi-Password": server.password
                },
                success:
                    function(data) {
                        if (data.statusCode === 200) {
                            result = data.result.items;
                        } else {
                            that.signalError(data.error.message, data.error.type);
                        }
                    },
                error:
                    function(jqXHR, textStatus, errorThrown) {
                        that.signalError(errorThrown, textStatus);
                    }
            });
        } catch(e) {
            $location.url("/Error");
        }
        $.mobile.loading('hide');
        return result;
    };

    this.getWorkflow = function (workflowId) {
        for (var w in this.workflows) {
            if (this.workflows[w].ID === workflowId) {
                return this.workflows[w];
            }
        }
        return null;
    };

    this.getWorkflowStates = function(server, workflowId, force) {
        if (this.states.length === 0 || force) {
            this.states = this.getSitecoreWebApiItems(server,
                "sc_itemid=" + workflowId + "&sc_database=master&scope=c&field={FB8ABC73-7ACF-45A0-898C-D3CCB889C3EE}",
                "Fetching Workflow States",
                "Invalid credentials or server unavailable.");
            for (s in this.states) {
                var state = this.states[s];
                state.final = state.Fields["{FB8ABC73-7ACF-45A0-898C-D3CCB889C3EE}"].Value === "1";
                state.description = state.Fields["{8C980A06-4059-4939-9C6F-A10F751CEB64}"].Value;
            }
        }
        return this.states;
    };

    this.getWorkflowState = function (stateId) {
        for (var s in this.states) {
            if (this.states[s].ID === stateId) {
                return this.states[s];
            }
        }
        return null;
    };

    this.getArticles = function (server, workflowId, finalStateId, force) {
        if (this.articles.length === 0 || force) {
            if (finalStateId === null) {
                this.articles = this.getSitecoreWebApiItems(server,
                    "query=" +
                        encodeURIComponent("/sitecore//*[@#__Workflow# = '" + workflowId + "']") +
                        "&sc_database=master&payload=min&fields={A4F985D9-98B3-4B52-AAAF-4344F6E747C6}|{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}",
                    "Fetching Articles",
                    "Invalid credentials or server unavailable.");
            } else {
                this.articles = this.getSitecoreWebApiItems(server,
                    "query=" +
                        encodeURIComponent("/sitecore//*[@#__Workflow# = '" + workflowId + "' and @#__Workflow State# != '" + finalStateId + "']") +
                        "&sc_database=master&payload=min&fields={A4F985D9-98B3-4B52-AAAF-4344F6E747C6}|{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}",
                    "Fetching Articles",
                    "Invalid credentials or server unavailable.");
            }

            // copy workflow fields to be more filtering friendly
            for (var a in this.articles) {
                var article = this.articles[a];
                article.workflow = article.Fields["{A4F985D9-98B3-4B52-AAAF-4344F6E747C6}"].Value;
                article.workflowState = article.Fields["{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}"].Value;
            }
        }
        return this.articles;
    };

    this.getWorkflowStateArticles = function(server, workflowId, stateId, force) {
        var newArticles = this.getSitecoreWebApiItems(server,
            "query=" +
                encodeURIComponent("/sitecore//*[@#__Workflow State# = '" + stateId + "']") +
                "&sc_database=master&payload=min&fields={A4F985D9-98B3-4B52-AAAF-4344F6E747C6}|{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}",
            "Fetching Articles",
            "Invalid credentials or server unavailable.");

        // copy workflow fields to be more filtering friendly
        for (var na in newArticles) {
            var newArticle = newArticles[na];
            newArticle.workflow = newArticle.Fields["{A4F985D9-98B3-4B52-AAAF-4344F6E747C6}"].Value;
            newArticle.workflowState = newArticle.Fields["{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}"].Value;
        }

        // cleanup old articles from ths 
        for (var a = 0; a < this.articles.length;) {
            var article = this.articles[a];
            if (article.workflowState === stateId) {
                this.articles.splice(a, 1);
            } else {
                a++;
            }
        }

        // add new articles;
        this.articles = this.articles.concat(newArticles);
        
        return this.articles;
    };

    this.getArticle = function (server, articleId) {
        var article = this.getSitecoreWebApiItems(server,
            "sc_itemid=" + articleId + "&sc_database=master&payload=content",
            "Fetching Article",
            "Invalid credentials or server unavailable.")[0];
        return article;
    };
});