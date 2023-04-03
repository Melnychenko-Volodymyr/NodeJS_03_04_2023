const http = require('http');
const fs = require('fs');

// глобальна заміна
String.prototype.replaceAll = function(search, replacement)  {
    let target = this;
    return target.split(search).join(replacement);
};

http.createServer((request, response) => {
    // заміна '%20' на ' ' в імені файла
    const path = request.url.replaceAll('%20',' ');  
    console.log(`Запит адреси: ${path}`);
    const filePath = path.substr(1);
    // перевірка наявності файлу
    fs.readFile(filePath, (error, data) => {
      // файл не знайдено
      if (error) {
        response.statusCode = 404;
        response.end('Файл не знайдено!');
      } else {
	// передаємо файл браузеру
        response.end(data);
      }
    })
  })
  .listen(3000, () => {
    console.log('Старт сервера');
  });