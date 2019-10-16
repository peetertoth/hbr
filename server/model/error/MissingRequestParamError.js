class MissingRequestParamError extends Error {
  constructor(params) {
    super('Failed to execute request, one or more required param is missing.');
    this.name = 'MissingRequestParamError';
    this.params = params;
    this.status = 400;
  }
};

module.exports = MissingRequestParamError;