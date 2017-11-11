const errorConfig = (errorSting, data) => {

  const errorOptions = {
    'PAGE_NOT_FOUND': {
      status: 404,
      errorMessage: {
        message: 'Not Found'
      }
    },

    'SERVER_ERROR': {
      status: 500,
      errorMessage: {
        message: 'Internal Server Error'
      }
    },

    'UNCAUGHT_EXCEPTION': {
      error: data
    }
  }

  return errorOptions[errorSting]
}

module.exports = {
  getError: errorConfig
};