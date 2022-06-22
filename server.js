const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Contenedor = require("./contenedor");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use("/public", express.static(__dirname + "/public"));

const products = [];

const contenedorProducts = new Contenedor("products.json");
const contenedorMessages = new Contenedor("messages.json");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json(req.body);
});

app.get("/products", (req, res) => {
  res.render("products", { products });
});

app.get("/messages", (req, res) => {
  res.render("messages", { 
    messages: contenedorMessages.getAll()
  });
});

io.on("connection", (socket) => {
  socket.on("add", (data) => {
    console.log(data);
    products.push(data);
    io.sockets.emit("show", products);
  });

  socket.on("chat-in", (data) => {
    const time = new Date().toLocaleString();
    const dataOut = {
      msn: data.msn,
      email: data.email,
      date: time,
    };
    console.log(dataOut);
    contenedorMessages.save(dataOut)

    io.sockets.emit("chat-out", 'ok');
  });
});

const server = httpServer.listen(8080, () => {
  console.log("server listening...");
});
server.on("error", (e) => {
  console.log("Error on server", e);
});
