import { Router } from "express"
import { AuthMiddleware } from "./Http/Middlewares/AuthMiddleware"
import { UploadFileMiddleware } from "./Http/Middlewares/UploadFileMiddleware"
import { AuthController } from "./Http/Controllers/AuthController"
import { UserController } from "./Http/Controllers/UserController"
import { UploadFileController } from "./Http/Controllers/UploadFileController"

export function getRoutes() {

  const routes = Router()

  /** Instantiate controllers */
  const authControllerInstance = AuthController.instance()
  const userControllerInstance = UserController.instance()
  const uploadFileController = UploadFileController.instance()

  /** Instantiate middlewares */
  const authMiddleware = AuthMiddleware.instance()
  const uploadFileMiddleware = UploadFileMiddleware.instance()

  /** Routes for Auth */
  routes.post("/signup", authControllerInstance.signup)
  routes.post("/authenticate", authControllerInstance.authenticate)
  routes.post("/forgot-password", authControllerInstance.forgotPassword)
  routes.patch("/reset-password", authControllerInstance.resetPassword)

  /** Routes for User */
  routes.get("/users", [authMiddleware.intercepter], userControllerInstance.index)
  routes.post("/users", [authMiddleware.intercepter], userControllerInstance.store)
  routes.put("/users/:id", [authMiddleware.intercepter], userControllerInstance.edit)

  /** Routes for Upload */
  routes.post("/upload", [authMiddleware.intercepter, uploadFileMiddleware.intercepter], uploadFileController.upload)
  routes.get("/files", [authMiddleware.intercepter, uploadFileMiddleware.intercepter], uploadFileController.index)
  routes.delete("/files/:id", [authMiddleware.intercepter], uploadFileController.delete)

  return routes
}

