export const CreateError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  console.error(`ERROR:${new Date().toISOString()} | ${status} | ${message}`);
  return err;
};
