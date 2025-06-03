const abort = (response, status, msg) => {
  if(msg instanceof Object) {
    console.error(msg)
    return response.status(status).json(msg)
  }
  console.error({
    errorsMessage: msg
  })
  response.status(status).json({
    msg: msg
  })
}

export {
  abort
}
