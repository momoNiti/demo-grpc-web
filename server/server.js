var PROTO_PATH = __dirname + '/ping_pong.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var pingpong = protoDescriptor.pingpong;
var server = new grpc.Server();

server.addService(pingpong.PingPongService.service, {
  pingPong: function(call,callback) {
    console.log("Request")
    return callback(null,{pong:"Pong"})
  }
});

server.bind('0.0.0.0:9090', grpc.ServerCredentials.createInsecure());
server.start();