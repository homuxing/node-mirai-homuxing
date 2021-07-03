const axios = require('axios')
const Mirai = require('node-mirai-sdk')
const {Plain, Image} = Mirai.MessageComponent
const getImageBuffer = require('../util/getImageBuffer')
const RandomInu = () => {
  const callback = async (message, bot) => {
    const {messageChain} = message
    let msg = ''
    messageChain.forEach(chain => {
      if(chain.type == 'Plain') {
        msg += Plain.value(chain)
      }
    })
    if(msg.trim() == '狗狗' || msg.trim() == '玄武') {
      const api = 'https://dog.ceo/api/breeds/image/random'
      // axios.get(api).then()
      const res = await axios.get(api)
      console.log(res.data.message)
      if(res.data.status === 'success') {
        const InuImage = await getImageBuffer(res.data.message)
        const replyMsg = await bot.sendImageMessage(InuImage, message)
        console.log(replyMsg)
        if(!replyMsg.messageId) {
          console.log('[RandomInu] REPLY ERROR')
        }
      } else {
        console.log('[RandomInu] GET IMAGE ERROR')
      }
    }
  }
  return {
    name: 'RandomInu',
    subscribe: 'message',
    callback
  }
}

module.exports = RandomInu