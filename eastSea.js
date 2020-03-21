//区的命名
let area = '/eastSea';
//区人数
let area_num = 0;
//房间组
let room = {
    '001': { name: '房间一', num: 0 },
    '002': { name: '房间二', num: 0 },
    '003': { name: '房间三', num: 0 }
};
//玩家组
let userList = {};
exports.init = function(io) {
    //连接区
    io.of(area).on('connection', socket => {
        //区人数加1
        area_num++;
        console.log('东海区 当前人数:' + area_num);
        //进入房间
        intoRoom(socket, io);
        //离开房间
        outRoom(socket, io);
        //更新自己的飞机坐标 并发送所有飞机坐标
        updateCoordinate(socket, io);
        //断开连接
        disconnect(socket, io);
        //客户端发送消息到房间里，除了自己其他客户端都会收到消息
        // socket.on('sendMsg', function(data) {
        //     socket.broadcast.to(room).emit('acceptMsg', data.msg);
        // });

    });
};
//更新自己的用户信息    (更新坐标) 并发送所有飞机坐标
function updateCoordinate(socket, io) {
    socket.on('updateCoordinate', function(data) {
        userList[socket.client.id].x = data.x; //更新x坐标
        userList[socket.client.id].y = data.y; //更新y坐标
        //获取所处房间ID
        let room_id = userList[socket.client.id].room_id;
        //从当前房间广播房间里的飞机信息
        io.of(area).in(room[room_id].name).emit('planeList', userList);
    });
};
//进入房间   接收名 : intoRoom
function intoRoom(socket, io) {
    socket.on('intoRoom', function(room_id, username) {
        //加入房间
        socket.join(room[room_id].name);
        //房间人数加1
        room[room_id].num++;
        //玩家初始化 添加客户端ID  添加所处房间ID
        userList[socket.client.id] = { room_id: room_id, name: username, x: 521, y: 524 };
        //从当前房间广播房间人数
        io.of(area).in(room[room_id].name).emit('room_num', room[room_id].num);
        console.log(room[room_id].name + ' 当前人数:' + room[room_id].num);
    });
};
//离开房间
function outRoom(socket, io) {
    socket.on('outRoom', function() {
        //获取所处房间ID
        let room_id = userList[socket.client.id].room_id;
        //离开房间
        socket.leave(room[room_id].name);
        //房间人数减一
        room[room_id].num--;
        //从当前房间广播房间人数
        io.of(area).in(room[room_id].name).emit('room_num', room[room_id].num);
    });
};
//断开连接
function disconnect(socket, io) {
    socket.on('disconnect', function() {
        //获取所处房间ID
        let room_id = userList[socket.client.id].room_id;
        //区人数减一
        area_num--;
        //房间人数减一
        room[room_id].num--;
        //从当前房间广播房间人数
        io.of(area).in(room[room_id].name).emit('room_num', room[room_id].num);
        //从玩家组中删除该玩家
        delete userList[socket.client.id];
    });
};