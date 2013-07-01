sitecore2Go.service('SessionStateService', function () {
    this.servers = [
        { name: 'Sitecore7', hostName: 'sitecore7', transport: 'http', userName: 'admin', password: 'b' },
        { name: 'Demo', hostName: 'demo', transport: 'http', userName: 'admin', password: '0nion123$' }
    ];

    this.addServer = function(name, hostName, transport, userName, password) {
        this.servers[this.servers.length] =
        {
            name: name,
            hostName: hostName,
            transport: transport,
            userName: userName,
            password: password
        };

    };

    this.deleteServer = function (name) {
        for (var i = 0; i < this.servers.length; i++) {
            if (this.servers[i].name === name) {
                this.servers.splice(i, 1);
                break;
            }
        }
    };

    this.modifyServer = function(oldName, newName, hostName, transport, userName, password) {
        var server = this.getServer(oldName);
        server.name = newName;
        server.hostName = hostName;
        server.transport = transport;
        server.userName = userName;
        server.password = password;
    };

    this.getServer = function (name) {
        for (var s in this.servers)
            if (this.servers[s].name === name) {
                return this.servers[s];
            }
    };

    this.persist = function() {
        var jsonServers = JSON.stringify(this.servers);
        window.localStorage.setItem('servers', jsonServers);
    };

    this.restore = function () {
        var jsonServers = window.localStorage.getItem('servers');
        if (jsonServers === null)
        {
            this.servers = [
                { name: 'Sitecore7', hostName: 'sitecore7', transport: 'http', userName: 'admin', password: 'b' },
                { name: 'Dummy', hostName: 'demo', transport: 'http', userName: 'admin', password: '0nion123$' }
            ];
        } else {
            this.servers = JSON.parse(jsonServers);
        }
    };

    this.restore();
});