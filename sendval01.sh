#!/bin/bash

echo '{ "id": "0001", "src": "127.0.0.1", "clientName": "URIBURU", 
"pvs": [ { "name": "TAG001", "type": "CHAR", "value": "OFF" },
         { "name": "TAG002", "type": "INT", "value": 333 },
         { "name": "TAG003", "type": "FLOAT", "value": 1.23 },
         { "name": "TAG004", "type": "INT", "value": 123 }
] }' | nc 127.0.0.1 5000

