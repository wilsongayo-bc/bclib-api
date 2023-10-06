export const CommonErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Name or Code already exists',
        error: "Conflict Error"
    },
    UserNotFound: {
        statusCode: 404,
        message: 'User not exists',
        error: "NotFound Error"
    },
    ServerError: {
        statusCode: 500,
        message: 'Server Error',
        error: "Server Error"
    },
}