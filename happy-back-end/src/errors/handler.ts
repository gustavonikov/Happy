import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
    [key: string]: string[];
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return res.status(400).json({
            message: 'Validation failed',
            errors,
        })
    }
    
    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error' });
};

