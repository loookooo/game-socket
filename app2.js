var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var eastSea = require('./eastSea.js');
eastSea.init(io);
// app.get('/', function(req, res) {
//     res.send('<h1>Hello world</h1>');
// });

//默认命名 /
// io.on('connection', function(socket) {
//     console.log('/')
// });
// let area = null; //区
// let area_num = 0; //区人数
// let room = null; //房间
// let room_num = 0; //房间人数
// // 东海  /eastSea
// io.of('/eastSea').on('connection', socket => {
//     area_num++;
//     console.log('区连接成功 当前人数:' + area_num);
//     area = '/eastSea';
//     //进入房间
//     socket.on('intoRoom', function(data, fn) {
//         room_num++;
//         room = data.name;
//         socket.join(room);
//         fn('房间' + room + '连接成功');
//         console.log('房连接成功 当前人数:' + room_num);
//         io.of('/eastSea').in(room).emit('room_num', room_num);
//     });
//     //离开房间
//     socket.on('outRoom', function(fn) {
//         socket.leave(room);
//         fn('退出' + room + '房间');
//     });
//     //发送自己的飞机坐标到其他客户端
//     socket.on('sendCoordinate', function(data) {
//         socket.broadcast.to(room).emit('acceptCoordinate', data);
//     });
//     //客户端发送消息到房间里，除了自己其他客户端都会收到消息
//     socket.on('sendMsg', function(data) {
//         socket.broadcast.to(room).emit('acceptMsg', data.msg);
//     });
//     //--------------断开连接
//     socket.on('disconnect', function() {
//         area_num--;
//         room_num--;
//         io.of('/eastSea').in(room).emit('room_num', room_num);
//     });
// });
// 南海  /southSea
// io.of('/southSea').on('connection', socket => {
//     console.log('/southSea')
//     socket.on('intoHome', function(data, fn) {
//         socket.join(data.name);
//         fn('进入' + data.name + '房间');
//         console.log(data.name);
//     });
// });
//进入房间
// function initHome(socket) {
//     socket.on('initHome', function(data) {
//         socket.join(data.name);
//     });
// } 
http.listen(3000, function() {
    console.log('listening on *:3000');
});