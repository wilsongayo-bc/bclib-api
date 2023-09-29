export const PublisherErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Name already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Publisher not exists',
        error: "NotFound Error"
    },

    PublisherNotFound: {
        statusCode: 404,
        message: 'Publisher not exists',
        error: "NotFound Error"
    },
}