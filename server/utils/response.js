class Response {
  static error(res, code, message, cypher = null) {
    if (cypher) {
      return res.status(code).json({
        encrypted: true,
        data: cypher.encrypt(JSON.stringify({
          status: code,
          message,
        })),
      });
    }
    return res.status(code).json({
      status: code,
      message,
    });
  }

  static success(res, code, data, message = 'Success', cypher = null) {
    if (cypher) {
      return res.status(code).json({
        encrypted: true,
        data: cypher.encrypt(JSON.stringify({
          status: code,
          message,
          data,
        })),
      });
    }
    return res.status(code).json({
      status: code,
      message,
      data,
    });
  }

  static objectError(res, code, error) {
    return res.status(code).json({
      status: code,
      message: error.message,
    });
  }
}

export default Response;
