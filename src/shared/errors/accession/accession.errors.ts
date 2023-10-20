export const AccessionErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Accession book number already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Accession not exists',
        error: "NotFound Error"
    },

    AccessionNotFound: {
        statusCode: 404,
        message: 'Accession not exists',
        error: "NotFound Error"
    },
}