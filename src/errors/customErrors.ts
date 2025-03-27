// Hiba kódok és üzenetek
interface ErrorDefinition {
    code: string;
    message: string;
    status: number;
}

const ErrorCodes: Record<string, ErrorDefinition> = {
    DB_CONNECTION_ERROR: {
        code: 'DB_CONNECTION_ERROR',
        message: 'Nem sikerült csatlakozni az adatbázishoz.',//Failed to connect to the database.
        status: 500,
    },
    DB_QUERY_ERROR: {
        code: 'DB_QUERY_ERROR',
        message: 'Az adatbázis-lekérdezés sikertelen.',//Database query failed.
        status: 500,
    },
    VALIDATION_ERROR: {
        code: 'VALIDATION_ERROR',
        message: 'Validációs hiba történt.',//Validation error occurred.
        status: 400,
    },
    MISSING_FIELD_ERROR: {
        code: 'MISSING_FIELD_ERROR',
        message: 'Egy kötelező mező hiányzik.',//A required field is missing.
        status: 400,
    },
    AUTHENTICATION_ERROR: {
        code: 'AUTHENTICATION_ERROR',
        message: 'A hitelesítés sikertelen.',//Authentication failed.
        status: 401,
    },
    AUTHORIZATION_ERROR: {
        code: 'AUTHORIZATION_ERROR',
        message: 'Azonosítás sikertelen.',//Authorization failed.
        status: 403,
    },
    NOT_FOUND_ERROR: {
        code: 'NOT_FOUND',
        message: 'Az erőforrás nem található',//Resource not found.
        status: 404,
    },
    INTERNAL_SERVER_ERROR: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Belső szerverhiba történt.',//An internal server error occurred.
        status: 500,
    },
};

// CustomError osztály
class CustomError extends Error {
    code: string;
    status: number;

    constructor(errorDefinition: ErrorDefinition) {
        super(errorDefinition.message);
        this.code = errorDefinition.code;
        this.status = errorDefinition.status;
    }
}

// Használat
function someFunction() {
    throw new CustomError(ErrorCodes.DB_CONNECTION_ERROR);
}

// Példa a hiba kezelésére
try {
    someFunction();
} catch (error) {
    if (error instanceof CustomError) {
        console.error(`Error Code: ${error.code}, Message: ${error.message}`);
    } else {
        console.error('An unexpected error occurred:', error);
    }
}