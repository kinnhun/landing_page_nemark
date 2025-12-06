const success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const error = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

const created = (res, data, message = 'Created successfully') => {
  return success(res, data, message, 201);
};

const noContent = (res) => {
  return res.status(204).send();
};

module.exports = {
  success,
  error,
  created,
  noContent
};
