const ErrorMessages = {
  auth: {
    tokenNotProvided: "Token de autenticação não fornecido!",
    invalidToken: "Token de autenticação inválido ou mal formatado!",
    expiredToken: "Token de autenticação inválido ou expirado!"
  },
  users: {
    userExists: "Usuário já cadastrado.",
    userNotFound: "Usuário não encontrado."
  },
  files: {
    notfound: "Arquivo Não encontrado.",
    invalidType: "Tipo de arquivo inválido."
  }
}

const SuccessMessages = {
  application: {
    successRun: (appUrl: string, port: string | number) => `Server started at ${appUrl}:${port}/`
  }
}

export const Constants = {
  ErrorMessages,
  SuccessMessages
}
