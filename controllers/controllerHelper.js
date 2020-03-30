const errorHandler = (res, error, status) => {
  res.status(status).json({ error });
};

module.exports = {
  errorHandler
}