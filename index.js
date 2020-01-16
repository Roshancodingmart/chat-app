const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.render("index.ejs");
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit(
      "is_online",
      '<div style="display:flex;"><div style="background:green; height:10px;width:10px;border-radius:50px;margin-right: 10px;margin-top: 2px;"></div>' +
        socket.username +
        " join the chat..</i></div> "
    );
  });

  socket.on("disconnect", function(username) {
    io.emit("is_online", '<div style="display:flex;"> <div style="background:red; height:10px;width:10px;border-radius:50px;margin-right: 10px;margin-top: 2px;"></div>' + socket.username + " left the chat..</i></div>");
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

const server = http.listen(8080, function() {
  console.log("listening on *:8080");
});
