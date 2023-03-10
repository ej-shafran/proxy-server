# proxy-server

## Usage

Get the server running:

```bash
git clone https://github.com/ej-shafran/proxy-server
cd proxy-server
npm start
```

Send requests:

```http
GET /banana.jpg HTTP/1.1
Host: http://localhost:8080
# or whatever the server URL is
Target-URL: https://www.someotherserver.com/images
```
