const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    let title;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            title = "VALIDATION_ERROR";
            break;
        case constants.UNAUTHORIZED:
            title = "UNAUTHORIZED";
            break;
        case constants.FORBIDDEN:
            title = "FORBIDDEN";
            break;
        case constants.NOT_FOUND:
            title = "NOT_FOUND";
            break;
        case constants.SERVER_ERROR:
            title = "SERVER_ERROR";
            break;
        default:
            title = "UNHANDLED_ERROR";
            break;
    }

    const response = {
        title,
        message: err.message,
    };

    if (process.env.NODE_ENV === "development") {
        response.stacktrace = err.stack;
    }

    res.json(response);
};

module.exports = errorHandler;
