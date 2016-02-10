var net = require('net'),
    JsonSocket = require('json-socket');
    
var port = 9838;
var server = net.createServer();
var hashVar={};

//--------------------------------------------------------------------------


setInterval(function(){
	var length = Object.keys(hashVar).length;
  console.log('Data dump. Lengh:' + length);

	Object.keys(hashVar).forEach(function (key) { 
		var dat=hashVar[key];
		console.log('Key: ', key, ' value: ', dat.val );
	})



}, 3 * 1000); 



//--------------------------------------------------------------------------

console.log('Server listening on port: '+port);

server.listen(port);
server.on('connection', function(socket) 
	{ //This is a standard net.Socket

	console.log('Connection received!! ');

    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.on('message', function(message) 
	{

				console.log('Message: |%j|', message);


				if(message.hasOwnProperty('id')) {
					if(message.hasOwnProperty('source')) {
						console.log('Source:', message.source);

						if(message.hasOwnProperty('data')) {
							console.log('datalen: ' + message.data.length);
							console.log('data: %j',   message.data);

							for( var i = 0,length = message.data.length; i < length; i++ ) {
								d=message.data[i];
								if (d.hasOwnProperty('name') && d.hasOwnProperty('val')) 	{ 
				
									hashVar[d.name] = d;

									console.log('name: ' + d.name + ' value: ' + d.val);
	 								}
								}
							}
						}
					}


        var result = message.datalen;
        socket.sendEndMessage({result: result});
    });
});

