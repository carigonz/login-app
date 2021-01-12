import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import * as errorManagement from './classes/errorManagement';
import { ApiError } from './classes/errors/errors';
import cors from 'cors';
import routes from './routing/routes/index';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/', routes);

// Error handling middleware, we delegate the handling to the centralized error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	errorManagement.handler.handleError(err);
	if (!errorManagement.handler.isTrustedError(err)) {
		return next(err);
	}

	if (err instanceof ApiError) {
		return res.status(err.httpStatusCode).json({
			message: err.message,
		});
	} else {
		next(err);
	}
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

