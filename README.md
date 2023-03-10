# proxy-server

## Usage

Get the server running:

```bash
git clone https://github.com/ej-shafran/proxy-server
cd proxy-server
npm start
```

Send requests:

HTTP:

```http
GET /banana.jpg HTTP/1.1
Host: http://localhost:8080
Target-URL: https://www.someotherserver.com/images
```

JavaScript/TypeScript:

```typescript
const { data } = await axios.get("http://localhost:8080", {
	headers: {
		"Target-URL": "https://www.someotherserver.com/images"	
	}
})
```