import config from '../../config/config';
import { ForbiddenError, BadRequestError, UnauthorizedError } from '../../classes/errors/errors';
import { Request, Response, NextFunction } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import IServerUser from '../../interfaces/IserverUser';
import Users from '../../resources/users.json'

const jwtAuth = async(req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return next(new UnauthorizedError('no credentials were sent'));
    }
    if (!(req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return next(new BadRequestError('wrong format for Authorization header'));
    }
    
    // extract token from header and verify it
    console.log(req.headers.authorization);
    const token: string = req.headers.authorization.replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, config.JWT_KEY, async (err: VerifyErrors|null, data: any) => {
        if (err) {
            return next(new ForbiddenError(err.message));
        }
        try {
            console.log('=========');
            console.log(data);
            const user: IServerUser = Users.data.find( (user) => user.id == data.user_id);
            if (!user) {
                return next(new ForbiddenError('invalid credentials: user not found.'));
            }
            res.locals.user = user;
            res.locals.jwt = token;
            next();
        } catch (err) {
            return next(err);
        }
    });
};

export { jwtAuth };