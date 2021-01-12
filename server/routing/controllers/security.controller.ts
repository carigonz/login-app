import { Request, Response, NextFunction } from 'express';
import securityService from '../../services/security.service';
import ILogin from '../../interfaces/Ilogin';

/**
 * login
 */
export async function login(req: Request, res: Response, next: NextFunction) {
	const login: ILogin = req.body;
	try {
		const token: any  = await securityService.getJwt(login);
		return res.status(200).json({
      jwt: token
		});
	} catch (err) {
		return next(err);
	}
}
