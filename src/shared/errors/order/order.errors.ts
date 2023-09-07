export const OrderErrors = {
    NotFound: {
        statusCode: 404,
        message: 'Order does not exists',
        error: "NotFound Error"
    },

    ConflictQuantity: {
        statusCode: 409,
        message: 'Quantity must not exceed with actual quantity from product!!!',
        error: "Conflict Error"
    },

    ConflictOrNumber: {
        statusCode: 409,
        message: 'OR Number already exists!!!',
        error: "Conflict Error"
    },
    
}