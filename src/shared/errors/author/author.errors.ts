export const AuthorErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Name already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Author not exists',
        error: "NotFound Error"
    },

    AuthorNotFound: {
        statusCode: 404,
        message: 'Author not exists',
        error: "NotFound Error"
    },
}