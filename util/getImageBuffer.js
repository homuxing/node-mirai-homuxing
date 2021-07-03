const https = require('https')
const getImageBuffer =(url) => {
  let buffer
  return new Promise((resolve, reject) => {
    https.get(url, (res)=> {
      let imgData = ''
      res.setEncoding('binary')
       res.on('data', chunk => {
        imgData += chunk
      })
      res.on('end', () => {
        buffer = Buffer.from(imgData, 'binary')
        resolve(buffer)
      })
    }).on('error', () => {
      reject()
    })
  })
}

module.exports = getImageBuffer