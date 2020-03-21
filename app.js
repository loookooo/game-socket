var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket) {
    //接受更改坐标参数
    socket.on('setXY', function(data) {
        socket.broadcast.emit('getXY', data);
    });


    //接收按钮传输,并广播其他人按钮传输的内容
    // socket.on('button', function(data) {
    //     socket.broadcast.emit('broadcast', { msg: '我是广播的内容' });
    //     console.log(data);
    // });
    //-----------------------
    //----------------接受数据处理后返回
    // socket.on('ferret', function(name, word, fn) {
    //     fn(name + ' says ' + word);
    // });
    //-----------发送数据
    //socket.emit('news', { hello: 'world' });
    //--------------接受数据
    // socket.on('my other event', function(data) {
    //     console.log(data);
    // });
    //--------------断开连接
    // socket.on('disconnect', function() {
    //     console.log('user disconnected');
    // });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});