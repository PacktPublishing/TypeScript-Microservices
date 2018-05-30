openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
...

openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key

rm server.pass.key

openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
...
A challenge password []:
...

openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt