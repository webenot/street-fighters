const httpServer = require('httpServer');
const http = require('http');
const config = require('config');

module.exports = () => new Promise((resolve, reject) => {
    /**
     * Get port from environment and store in Express.
     */
    const port = normalizePort(config.get('httpServer:port'));
    httpServer.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(httpServer);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                //console.error(bind + ' requires elevated privileges');
                console.error(bind + ' requires elevated privileges');
                reject();
                //process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                reject();
                //process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.debug('Listening on ' + bind);
        resolve();
    }
}).then(httpServer.initRoutes);