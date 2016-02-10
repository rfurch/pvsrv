var net = require('net'),
    JsonSocket = require('json-socket');

var stdio = require('stdio');


var port = 9838; //The same port that the server is listening on
var host = '127.0.0.1';
var socket = new JsonSocket(new net.Socket()); // Decorate a standard net.Socket with JsonSocket


var ops = stdio.getopt({
    'name': {key: 'n', args: 1, description: 'Variable NAME', mandatory: true},
    'value': {key: 'v', args: 1, description: 'Variable VALUE', mandatory: true}	
});

    

if (ops.name && ops.value) {
    console.log('Name: ' + ops.name + " value: " + ops.value);


socket.connect(port, host);
socket.on('connect', function() 
	{ //Don't send until we're connected
//    socket.sendMessage( {"id":"1122","source":"xxx","datalen":"13","data":[{"name":"pv1","val":"121"},{"name":"pv2","val":"122"}],"hextail":"abc"} );
    socket.sendMessage( {"id":"1122","source":"xxx","datalen":"1","data":[{"name": ops.name,"val":ops.value}],"hextail":"abc"} );

    socket.on('message', function(message) 
		{
        console.log('The result is: '+message.result);
    });
});

}