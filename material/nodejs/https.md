# https-server支持https

```shell
openssl genrsa -out key.pem 4096
openssl req -new -key key.pem -out csr.pem -subj "/C=US/ST=California/L=San Francisco/O=Local-Company/OU=dev/CN=localhost/emailAddress=test@test.com"
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

http-server --ssl -p 8080
```