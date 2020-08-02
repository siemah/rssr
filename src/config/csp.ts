/* tslint:disable */
const CSP_DIRECTIVES = {
  defaultSrc: [
    "'self'",
    "*.typekit.net",
  ],
  scriptSrc: [
    "'self'",
    "'unsafe-eval'",
    (req: any, res: any) => `'nonce-${res.locals.nonce}'`,
  ],
  styleSrc: [
    "'self'",
    "*.typekit.net"
  ]
};

export default CSP_DIRECTIVES;