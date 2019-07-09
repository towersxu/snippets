# http-server开启https

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

http-server -S -C cert.pem -o