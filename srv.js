#!/usr/local/bin/node


// Load the TCP Library
var net = require('net');
var fs = require('fs');
 
 
// Keep track of the chat clients
 
var dict = {};
var mTimeSec=0;
var clients={};


// --------------------------------------------------------

function addClient(socket)
  {
  clients[socket.name] = socket;
  clients[socket.name].data='';
  //console.log("Adding client " + socket.name);
  }

// --------------------------------------------------------

function removeClient(socket)
  {
  socketOnData(clients[socket.name].data);
  delete clients[socket.name];
  //console.log("Removing client " + socket.name);
  }

// --------------------------------------------------------
 
function processClient(socket, data)
  {
  clients[socket.name].data+=data;
  }

// --------------------------------------------------------
 
 
function socketOnData(data)
  {
  var dataOk=1;
  
  //console.log(data);	  	
  
  try { var d = JSON.parse(data); } 
  catch (err) { dataOk=0; console.log("Error on JSON.Parse:", err); console.log('--------------------'); console.log(data); }

  if (dataOk==1)
	{

    dict['SYS:NWRITE'].value += d.pvs.length;  
	for (var n in d.pvs) 
	  {
	  dict[d.pvs[n].name] = d.pvs[n];
	  dict[d.pvs[n].name].time = mTimeSec;
	  }
	dict['SYS:NWRITE'].time = mTimeSec;
	}  

  //console.log(dict);	  	
  }

// --------------------------------------------------------
 
// Start a TCP Server
net.createServer(function (socket) 
  {
 
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 
  socket.setEncoding('utf8');
  addClient(socket);
  
  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  //broadcast(socket.name + " joined the chat\n", socket);
 
  // Handle incoming messages from clients.
  socket.on('data', function(data) {
  processClient(socket, data);
  console.log("Socket data arrived.  Len: " + data.length);
  });

  // new connection
  socket.on('connect', function () {
  addClient(socket);
  });
 
  // Remove the client from the list when it leaves
  socket.on('end', function () {
	removeClient(socket);
    //broadcast(socket.name + " left the chat.\n");
  });

  // Handle the connection error.  
  socket.on('error', function(err) { 
        console.log('error: ' + err + '\n' + '-------------------------------------------');
    });
  
 
}).listen(5000);
 
// --------------------------------------------------------

dict['SYS:NWRITE'] = {};
dict['SYS:NWRITE'].value = 0;

// --------------------------------------------------------
 
setInterval(function() {
mTimeSec = Date.now() / 1000;
if (dict['TAG030'])
  console.log("TAG030: " +   dict['TAG030'].value + "  NWRITE: " + dict['SYS:NWRITE'].value + "  TIME: " + dict['SYS:NWRITE'].time +"\n");
}, 1000);     
 
// --------------------------------------------------------
 
mTimeSec = Date.now() / 1000;
 
// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
