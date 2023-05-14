import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import ProductManager from "./dao/managers/dbManagers/productsManager.js";
import MessageManager from "./dao/managers/dbManagers/messagesManager.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("api/messages", messagesRouter);
app.use("/realtimeproducts", viewsRouter);
const productManager = new ProductManager();
const messageManager = new MessageManager();
try {
  await mongoose.connect(
    "mongodb+srv://maximojhernandezla:Iru151220@cluster0mh.tlhs7mz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("DB running");
} catch (error) {
  console.log(error);
}

const server = app.listen(8080, () => console.log("Server running"));
const io = new Server(server);

io.on("connection", async (socket) => {
  const products = await productManager.getAll();
  socket.emit("showProducts", products);
  socket.on("addProduct", async (data) => {
    await productManager.create(data);
    const newProducts = await productManager.getAll();
    io.emit("showProducts", newProducts);
  });
  socket.on("deleteProduct", async (data) => {
    await productManager.delete(data);
    io.emit("showProducts", await productManager.getAll());
  });

  socket.on("message", async (data) => {
    await messageManager.create(data);
    let messages = await messageManager.getAll();
    io.emit("messageLogs", messages);
  });
  socket.on("authenticated", async (data) => {
    let messages = await messageManager.getAll();
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUserConnected", data);
  });
});
