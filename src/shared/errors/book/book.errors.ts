export const BookErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Name already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Book not exists',
        error: "NotFound Error"
    },

    BookNotFound: {
        statusCode: 404,
        message: 'Book not exists',
        error: "NotFound Error"
    },

    ConflictNumber: {
        statusCode: 409,
        message: ' Number already exists',
        error: "Conflict Error"
    },
}