const http  = require('http');
const app = require('./app')
const {Server} = require('socket.io')

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
      origin:'*'
    }
  });


io.on('connection',(socket)=>{
    console.log(socket.id)
    console.log("fired")
    socket.on('update',async(id)=>{
        io.emit('updateResponse');
    })
})



server.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at port 5000")
});
