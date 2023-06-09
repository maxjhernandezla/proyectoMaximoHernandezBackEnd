import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { getProducts, getProductById, createProduct, updateProduct } from "../controllers/products.controller.js";

export default class ProductsRouter extends Router {
  init() {
    this.get(
      "/",
      ["PUBLIC", "USER", "ADMIN"],
      passportStrategiesEnum.NOTHING,
      getProducts
    );
    this.get(
      "/:pid",
      ["PUBLIC", "USER", "ADMIN"],
      passportStrategiesEnum.NOTHING,
      getProductById
    );
    this.post("/", ["ADMIN"], passportStrategiesEnum.JWT, createProduct);
    this.put(
      "/:pid",
      ["ADMIN"],
      passportStrategiesEnum.JWT,
      updateProduct
    );
  }
}
