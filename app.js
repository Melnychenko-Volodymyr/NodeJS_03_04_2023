const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
    console.log(`Запит адреси: ${request.url}`)
    const filePath = request.url.substr(1)
    // перевірка наявності файлу
    fs.access(filePath, fs.constants.R_OK, (err) => {
      // файл не знайдено
      if (err) {
        response.statusCode = 404
        response.end('Файл не знайдено!')
      } else {
        fs.createReadStream(filePath).pipe(response)
      }
    })
  })
  .listen(3000, () => {
    console.log('Старт сервера')
  })