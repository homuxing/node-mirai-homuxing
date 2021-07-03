const axios = require('axios')
const Mirai = require('node-mirai-sdk')
const {Plain, Image} = Mirai.MessageComponent
const getImageBuffer = require('../util/getImageBuffer')

const RandomNeko = () => {
  const callback = async (message, bot) => {
    const {messageChain} = message
    let msg = ''
    messageChain.forEach(chain => {
      if(chain.type == 'Plain') {
        msg += Plain.value(chain)
      }
    })
    if(msg.trim() == '猫猫') {
      const api = 'https://api.thecatapi.com/v1/images/search'
      // axios.get(api).then()
      const res = await axios.get(api)
      console.log(res.data[0].url)
      const nekoImage = await getImageBuffer(res.data[0].url)
      const replyMsg = await bot.sendImageMessage(nekoImage, message)
      console.log(replyMsg)
      if(!replyMsg.messageId) {
        console.log('[RandomNeko] REPLY ERROR')
      }
    }
  }
  return {
    name: 'RandomNeko',
    subscribe: 'message',
    callback
  }
}

module.exports = RandomNeko