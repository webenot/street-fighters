const config = require('./httpServer');
const staticDir =  config.httpServer.staticDir;

module.exports = {
    sass: {
        src: staticDir,
        dest: staticDir,
        debug: true,
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true,
        outputStyle: 'extended'
    }
};