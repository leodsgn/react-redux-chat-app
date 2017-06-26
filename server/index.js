const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res){
    res.send("<h1>Hello World</h1>");
}) 

http.listen(3001, function(){
    console.log("listening on *:3001");
})

io.on("connection", function(socket){
    
    socket.broadcast.emit("user connected");

    socket.on("new_connection", function(data) {
        console.log(data);
    })

    socket.on("chat_message", function(data){
        console.log(`${data.user} sent a message: \n${data.message}`);
        socket.broadcast.emit("chat_message", data);
    })
})

