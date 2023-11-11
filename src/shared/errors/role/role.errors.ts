export const RoleErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Role already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'User Role not exists',
        error: "NotFound Error"
    },

    RoleNotFound: {
        statusCode: 404,
        message: 'User role not exists',
        error: "NotFound Error"
    },
}