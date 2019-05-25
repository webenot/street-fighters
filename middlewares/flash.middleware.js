function flashMiddleware(req, res, next) {
    res.locals.success_mesages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
}

module.exports = flashMiddleware;