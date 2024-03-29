import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";
import { faker } from "@faker-js/faker";
import path from "path";
import { EmailNotMatchToken, ExpiredJWT } from "./custom-exceptions.js";
import multer from "multer";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const recoverPasswordToken = (user) => {
  const token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

const generateMockProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(1),
    id: faker.database.mongodbObjectId(),
    image: faker.image.image(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(10),
  };
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(
    token,
    process.env.PRIVATE_KEY,
    (error, decoded) => {
      if (error) {
        throw new ExpiredJWT(
          "The token has expired, please generate a new one."
        );
      }
      return decoded;
    }
  );
  return verifiedToken;
};

const tokenExpired = (token) => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (token.exp && currentTime >= token.exp) {
    throw new ExpiredJWT("The token has expired, please generate a new one.");
  }
};

const verifyEmail = (token, email) => {
  if (token.user.email !== email) {
    throw new EmailNotMatchToken(
      "The requested email doesn't match the user's email"
    );
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainDirname = path.join(__dirname, "..");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.headers;
    if (type === "products") cb(null, `${__mainDirname}/public/img/products`);
    if (type === "profile") cb(null, `${__mainDirname}/public/img/profile`);
    if (type === "documents") cb(null, `${__mainDirname}/public/img/documents`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({
  storage,
});

export {
  __mainDirname,
  tokenExpired,
  createHash,
  isValidPassword,
  generateToken,
  generateMockProduct,
  recoverPasswordToken,
  verifyToken,
  verifyEmail,
  uploader,
};
