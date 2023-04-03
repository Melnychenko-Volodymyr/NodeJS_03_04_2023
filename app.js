const http = require('http');
const fs = require('fs');
const path = require('path');

// папка для файлів сайту на сервері
const folderPath = '/site';

// глобальна заміна
String.prototype.replaceAll = function(search, replacement)  {
    let target = this;
    return target.split(search).join(replacement);
};

http.createServer((request, response) => {
    // заміна '%20' на ' ' в імені файла
    const requestPath = request.url.replaceAll('%20',' ');  
    console.log(`Запит адреси: ${requestPath}`);
    // перевірка наявності файла в папці folderPath
    const relativePath = path.relative(folderPath, requestPath);
    const isInsideFolder = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);

if (isInsideFolder) {

    const filePath = requestPath.substr(1);
    // перевірка наявності файлу
    fs.readFile(filePath, (error, data) => {
      // файл не знайдено
      if (error) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('Файл не знайдено!');
      } else {
	// передаємо файл браузеру
        response.end(data);
      }
    })
  }  else {
	response.statusCode = 403;
	response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('Нєфіг шастать!');
   }
})
.listen(3000, () => {
   console.log('Старт сервера');
  });