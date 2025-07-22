const { constants } = require("../constants");

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode); // Ensure the status is actually set in the response

    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTORIZED:
            res.json({
                title: "Authorization failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.json({
                title: "Unknown Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    }
};

module.exports = errHandler;
