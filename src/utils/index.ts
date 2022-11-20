import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import validator from 'validator';

const catchAsync = (fn: (arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, arg1: Response<any, Record<string, any>>, arg2: NextFunction) => Promise<any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
const sanitizeEmail = (email: string) => {
    return validator.normalizeEmail(sanitizeUserInput(email), {
        gmail_remove_dots: false
    });
};
const sanitizeUserInput = (input: string) => {
    const trimmed = validator.trim(input);
    const stripped = validator.stripLow(trimmed);
    return stripped;
};
const objectMap = (obj: Object, fn: Function) => {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
};

const populateFields = (fieldsArray: Array<String>) => {
    return fieldsArray.map((field) => {
        return { path: field };
    });
};

class ResponseError extends Error{
    statusCode: number;
    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
    }
}
module.exports = {
    sanitizeEmail,
    sanitizeUserInput,
    objectMap,
    catchAsync,
    ResponseError
};
