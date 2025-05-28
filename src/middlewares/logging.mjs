export const logging = (request, response, next) => {
  console.log(request.method + " - " + request.path)
  next()
}
