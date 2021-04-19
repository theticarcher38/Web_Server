const fs = require('fs');
const { traceDeprecation } = require('process');

fs.readFile('./posting.html', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    document.getElementById('petition-post-description')
})