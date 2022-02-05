class Response {
  // static success({res, code, message, data}) {
  static success(res, code, message, data) {
    return res.status(200).json({
      responseCode: code,
      message,
      data
    })
  }

  static badRequestError(res, code, message, status=400) {
    return res.status(status).json({
      responseCode: code,
      errorMessage: message
    })
  }

  static unAuthorizedError(res, code, message){
    return res.status(401).json({
      responseCode: code,
      errorMessage: message
    })
  }

  static serverError(res, code, errorMessage) {
    return res.status(500).json({
      statusCode: code,
      errorMessage
    })
  }
}

export default Response;
