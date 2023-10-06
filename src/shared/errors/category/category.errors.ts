export const CategoryErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Name already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Category not exists',
        error: "NotFound Error"
    },

    CategoryNotFound: {
        statusCode: 404,
        message: 'Category not exists',
        error: "NotFound Error"
    },
}