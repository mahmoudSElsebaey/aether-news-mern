/** Validate body/query/params with a Zod schema */
export const validate = (schema, source = "body") => (req, res, next) => {
  const parsed = schema.parse(req[source]);
  req[source] = parsed;
  next();
};
