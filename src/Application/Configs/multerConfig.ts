import { Constants } from './../../Constants';
import multer, { Options } from "multer"
import path from "path"
import crypto from "crypto"

const multerConfig: Options = {
  dest: path.resolve(__dirname, "..", "..", "..", "public", "files"),
  storage: multer.diskStorage({
    destination: (req, file, cb): void => {
      cb(null, path.resolve(__dirname, "..", "..", "..", "public", "files"))
    },
    filename: (req, file, cb: (error: Error | null, destination: string) => void): void => {
      crypto.randomBytes(16, (err, hash): void => {
        if (err) cb(err, "")

        const fileName = `${hash.toString("hex")}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb): void => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(Constants.ErrorMessages.files.invalidType))
    }
  }
}

export default multerConfig
