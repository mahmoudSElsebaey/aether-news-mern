/**
 * Validate body/query/params with a Zod schema.
 * Express 5: req.query and req.params are getter-only — do not reassign them.
 */
export const validate = (schema, source = "body") => (req, res, next) => {
  try {
    const parsed = schema.parse(req[source]);

    if (source === "body") {
      req.body = parsed;
    } else if (source === "query") {
      // Express 5: cannot assign req.query — store validated copy
      req.validatedQuery = parsed;
    } else if (source === "params") {
      req.validatedParams = parsed;
    } else {
      req[source] = parsed;
    }

    next();
  } catch (err) {
    next(err);
  }
};
