export function success(res, data = null, meta = null, status = 200) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
}

export function created(res, data) {
  return success(res, data, null, 201);
}
