let email = localStorage.getItem("email");
if (email == null) {
  email = prompt("Ingrese un nombre");
  localStorage.setItem("email", email);
}

const socket = io();

const btn_list = document.getElementById("btnList");
const btn_chat = document.getElementById("btnChat");

btn_list.onclick = (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").value;

  socket.emit("add", { title, price, img });
};

btn_chat.onclick = (e) => {
  e.preventDefault();

  const msn = document.getElementById("mensaje").value;

  socket.emit("chat-in", { msn, email });
};

socket.on("show", (products) => {
  console.log(products);

  fetch("/products")
    .then((r) => r.text())
    .then((html) => {
      const div = document.getElementById("products");
      div.innerHTML = html;
    })
    .catch((e) => alert(e));
});

socket.on("chat-out", () => {
  fetch("/messages")
    .then((r) => r.text())
    .then((html) => {
      const div = document.getElementById("chat");
      div.innerHTML = html;
    })
    .catch((e) => alert(e));
});
