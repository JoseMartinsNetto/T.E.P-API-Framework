const ErrorMessages = {
  auth: {
    tokenNotProvided: "Token de autenticação não fornecido!",
    invalidToken: "Token de autenticação inválido ou mal formatado!",
    expiredToken: "Token de autenticação inválido ou expirado!"
  },
  users: {
    userExists: "Usuário já cadastrado.",
    userNotFound: "Usuário não encontrado."
  }
}

const SuccessMessages = {}

export const Constants = {
  ErrorMessages,
  SuccessMessages
}
