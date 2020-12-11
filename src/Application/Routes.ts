import { Router } from "express"
import AuthMiddleware from "./Http/Middlewares/AuthMiddleware"
import UploadFileMiddleware from "./Http/Middlewares/UploadFileMiddleware"
import { AuthController } from "./Http/Controllers/AuthController"
import { UserController } from "./Http/Controllers/UserController"
import { UploadFileController } from "./Http/Controllers/UploadFileController"

const routes = Router()

const authControllerInstance = AuthController.instance()
const userControllerInstance = UserController.instance()
const uploadFileController = UploadFileController.instance()

/** Auth */
routes.post("/signup", authControllerInstance.signup)
routes.post("/authenticate", authControllerInstance.authenticate)
routes.post("/forgot-password", authControllerInstance.forgotPassword)
routes.patch("/reset-password", authControllerInstance.resetPassword)

/** User */
routes.get("/users", [AuthMiddleware], userControllerInstance.index)
routes.post("/users", [AuthMiddleware], userControllerInstance.store)
routes.put("/users/:id", [AuthMiddleware], userControllerInstance.edit)

/** Upload  for exemple */
routes.post("/upload", [AuthMiddleware, UploadFileMiddleware], uploadFileController.upload)
routes.get("/files", [AuthMiddleware, UploadFileMiddleware], uploadFileController.index)
routes.delete("/files/:id", [AuthMiddleware], uploadFileController.delete)

export default routes
