const http = require('http');
const path = require('path');
const fs = require('fs');

const contentType = {
    ".avif": "image/avif",
    ".bmp": "image/bmp",
    ".gif": "image/gif",
    ".ico": "image/vnd.microsoft.icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".webp": "image/webp",
    
    ".css": "text/css",
    ".csv": "text/csv",
    ".htm ": "text/html",
    ".html": "text/html",
    ".ics": "text/calendar",
    ".mjs": "text/javascript",
    ".txt": "text/plain",
    
    ".avi": "video/x-msvideo",
    ".webm": "video/webm",
    ".ogv": "video/ogg",
    ".3gp": "video/3gpp;audio/3gpp",
    ".ts": "video/mp2t",
    ".mp4": "video/mp4",
    ".mpeg": "video/mpeg",
    
    ".aac": "audio/aac",
    ".mid": "audio/midi;audio/x-midi",
    ".midi": "audio/midi;audio/x-midi",
    ".mp3": "audio/mpeg",
    ".oga": "audio/ogg",
    ".opus": "audio/opus",
    ".wav": "audio/wav",
    ".weba": "audio/webm",
    
    ".otf": "font/otf",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    
    ".abw": "application/x-abiword",
    ".arc": "application/x-freearc",
    ".azw": "application/vnd.amazon.ebook",
    ".bin": "application/octet-stream",
    ".bz": "application/x-bzip",
    ".bz2": "application/x-bzip2",
    ".cda": "application/x-cdf",
    ".csh": "application/x-csh",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".eot": "application/vnd.ms-fontobject",
    ".epub": "application/epub+zip",
    ".gz": "application/gzip",
    ".jar": "application/java-archive",
    ".json": "application/json",
    ".jsonld": "application/ld+json",
    ".ogx": "application/ogg",
    ".mpkg": "application/vnd.apple.installer+xml",
    ".odp": "application/vnd.oasis.opendocument.presentation",
    ".ods": "application/vnd.oasis.opendocument.spreadsheet",
    ".odt": "application/vnd.oasis.opendocument.text",
    ".swf": "application/x-shockwave-flash",
    ".tar": "application/x-tar",
    ".pdf": "application/pdf",
    ".php": "application/x-httpd-php",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".rar": "application/vnd.rar",
    ".rtf": "application/rtf",
    ".sh": "application/x-sh",
    ".vsd": "application/vnd.visio",
    ".xhtml": "application/xhtml+xml",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xul": "application/vnd.mozilla.xul+xml",
    ".zip": "application/zip",
    ".7z": "application/x-7z-compressed"
};

const server = http.createServer();

const getContentType = function(fileExt='.json'){
    var type = contentType[fileExt];
    return type;
};

server.on('request',(req,res)=>{
	console.log(req.url)
	req.on("data",buffer=>{
		console.log(buffer.toString())
		req.on("end",()=>{console.log("---END---")});
	});
	const url = new URL("http://"+req.headers.host+req.url);
	var reqFile = path.join('.',url.pathname);
	var fileExt = path.extname(reqFile);
	var data ;
	if(!fs.existsSync(reqFile)){
		res.writeHead(404);
		res.end();
		return;
	};
	if(reqFile.endsWith("\\")) reqFile += 'index.html';
	if(reqFile.endsWith("/")) reqFile += 'index.html';
	data = fs.readFileSync(reqFile);
	res.setHeader('Content-type',getContentType(fileExt)||'text/html')
	res.writeHead(200);
	res.end(data);
});

server.listen(
{
	host:'localhost',
	port:8080
},
()=>{
	console.log('server running at',server.address())
});
