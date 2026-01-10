const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Get the path from the URL
  const urlPath = req.url.split('?')[0]; // Remove query parameters if any
  const parts = urlPath.split('/').filter(Boolean); // Split by / and remove empty strings

  const firstWord = parts[0] || '';

  res.writeHead(200, { 'Content-Type': 'application/json' });
  //res.end(JSON.stringify({ firstWord }));  
  
  const path = './sample.json'; // path to your file
  fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
     res.end(data); 
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
