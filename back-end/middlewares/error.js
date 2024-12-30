export const createError = (status, message) => {
  // Instancie une erreur 
  const error = new Error()
  error.status = status
  error.message = message

  return error
}