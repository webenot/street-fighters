const isAuthorized = (req, res, next) => {
    if (
        req &&
        req.headers &&
        req.headers.authorization === 'admin'
    ) {
        console.log(req.headers);
        next();
    } else {
        res.status(401).send(`User is not authorized`);
    }

};

module.exports = {
    isAuthorized
};