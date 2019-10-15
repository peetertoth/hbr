const MissingRequestParamError = require('../error/MissingRequestParamError');

const validateRequestParam = (params, requestParams, next) => {
  const missingParams = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const resolvedParam = requestParams[param];
    if (!resolvedParam) {
      missingParams.push(param);
    }
  }

  if (missingParams.length > 0) {
    const error = new MissingRequestParamError(missingParams);
    next(error);
    return error;
  }
};

module.exports = {
  validateRequestParam,
};