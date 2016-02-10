#!/bin/bash

echo '{ "id": "0001", "src": "127.0.0.1", "clientName": "URIBURU", 
"pvs": [ { "name": "TAG001", "type": "CHAR", "value": "ON" },
         { "name": "TAG004", "type": "INT", "value": 923 }
] }' | nc 127.0.0.1 5000

