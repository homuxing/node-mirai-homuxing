const Mirai = require('node-mirai-sdk')
const render = require('../util/sabaru-render.js')
const { Image } = Mirai.MessageComponent

const SabaruOhayo = () => {
  let n = 0
  setInterval(async () => {
    const refreshHour = new Date().getHours()
    const refreshMin = new Date().getMinutes()
    const refreshSec = new Date().getSeconds()
    console.log(1 + n)
    n++
    if(refreshHour == '0' && refreshMin == '21' && refreshSec == '20') {
      const bufferMessage = await render('晚上好呀！')
      const imageId = await bot.uploadImage(bufferMessage, message)
      const ohayoMessage = await bot.sendGroupMessage([Image(imageId)], 867128894)
    }
  }, 1000)
  return {
    name: 'SabaruOhayo',
    callback: () => {return false}
  }
}

module.exports = SabaruOhayo


