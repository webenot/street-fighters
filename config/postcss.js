const autoprefixer = require('autoprefixer');
const path = require('path');
const config = require('./httpServer');
const staticDir =  config.httpServer.staticDir;

module.exports = {
    postcss: {
        plugins: [
            /* Plugins */
            autoprefixer({
                /* Options */
            })
        ],
        src: function(req) {
            return path.join(staticDir + '/stylesheets', req.url);
        }
    }
};