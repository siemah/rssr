import compression from "compression";
import helmet from "helmet";
import cors from 'cors';
import { Response, Request, NextFunction } from "express";
import CSP_DIRECTIVES from "./csp";

export function setupMiddlewares(app: any, express: any) {
  app.use(compression());
  app.use(cors());
  app.use(express.static('dist'));
  
  app.use(helmet());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.nonce = Date.now();
    next();
  });
  if(process.env.NODE_ENV === 'production') {
    app.use(helmet.contentSecurityPolicy({
      directives: CSP_DIRECTIVES,
    }));
  }
}