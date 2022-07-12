const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const db = require("./server/container");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use("/public", express.static(__dirname + "/public"));

const contenedorMessages = new db();
const contenedorProductos = new db();

app.get("/", (req, res) => {
  res.render("index");
});

// app.post("/", async(req, res) => {
//   console.log(req.body);
//   contenedorProductos.saveProduct(req.body);
// });

app.get("/products", async (req, res) => {
  res.render("products", {
    products: await contenedorProductos.getAllProducts(),
  });
  console.log(contenedorProductos.getAllProducts());
});

app.get("/messages", async (req, res) => {
  res.render("messages", {
    messages: await contenedorMessages.getAllMsn(),
  });
  console.log(contenedorMessages.getAllMsn());
});

io.on("connection", (socket) => {

  socket.on("add", async(data) => {
    console.log(data);
    contenedorProductos.saveProduct(data)
    io.sockets.emit("show", contenedorProductos.getAllProducts());
  });

  socket.on("chat-in", async (data) => {
    const time = new Date().toLocaleString();
    const dataOut = {
      msn: data.msn,
      email: data.email,
      date: time,
    };
    console.log(dataOut);
    contenedorMessages.saveMsn(dataOut);

    io.sockets.emit("chat-out", "ok");
  });
});

const server = httpServer.listen(8080, () => {
  console.log("server listening...");
});
server.on("error", (e) => {
  console.log("Error on server", e);
});
