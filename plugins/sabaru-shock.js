const { createCanvas, loadImage } = require('canvas')
const Mirai = require('node-mirai-sdk')
const { Plain } = Mirai.MessageComponent

function formatTime(now) {
  let str = ''
  let hourStrs = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三']
  str = hourStrs[now.getHours()] + '点'
  if(now.getMinutes() > 0) {
    let upperStrs = ['零', '十', '二十', '三十', '四十', '五十']
    let lowerStrs = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    str += upperStrs[Math.floor(now.getMinutes() / 10)] + lowerStrs[now.getMinutes() % 10] + '分'
  }
  str += '了！'
  return str
}

async function render(str) {
  const canvas = createCanvas(1024, 1024)
  let image =  await loadImage(process.cwd() + '/assets/sabaru.png')

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0)
  // 字数范围：4 - 9
  // 268 是指从第一个字的开始到最后一个字结束的位置
  //       啊 啊 啊 啊 啊 啊
  //     ->      268       <-
  let baseLength = str.length - 4
  let startX = 890 - (96 - (44 * (baseLength / 5))) / 2
  let startY = 32
  let addY = (536 - (10 - baseLength * 4)) / (str.length - 1)
  ctx.font = 96 - (44 * baseLength / 5) + 'px SimHei, STHeiti'
  ctx.fillStyle = '#000'
  ctx.textBaseline = 'top'
  for(let i = 0; i < str.length; i++) {
    ctx.fillText(str[i], startX, startY + addY * i)
  }


  const buffer = canvas.toBuffer('image/png')
  return buffer

}

function getCommandParam(command, commandHead) {
  if(command.trim().startsWith(commandHead + ' ')) {
    let trimCommand = command.trim()
    let parmaStartIndex = trimCommand.indexOf(' ') + 1
    let parma = trimCommand.substr(parmaStartIndex)
    return parma
  } else {
    return false
  }
}

const SabaruShock = () => {
  const callback = async (message, bot) => {
    let { messageChain, reply, quoteReply } = message
    let msg = ''
    let shock = ''
    let sendBuffer
    messageChain.forEach(chain => {
      if(chain.type == 'Plain') {
        msg += Plain.value(chain)
      }
    })
    shock = getCommandParam(msg, '薮猫')
    if(shock.length > 8) {
      quoteReply('这也太长了，薮猫说不出来', message)
      reply('(最多八个字哦)')
      return false
    }
    if(shock && shock == '报时') {
      // 报时
      sendBuffer = await render(formatTime(new Date()))
      let replyMessage = await bot.sendImageMessage(sendBuffer, message)
      if(!replyMessage.messageId) {
        console.error('[SabaruShock] REPLY ERROR')
      }
    } else if(shock) {
      // 震惊
      sendBuffer = await render(shock)
      let replyMessage = await bot.sendImageMessage(sendBuffer, message)
      if(!replyMessage.messageId) {
        console.error('[SabaruShock] REPLY ERROR')
      }
    }
  }
  return {
    name: 'SabaruShock',
    subscribe: 'message',
    callback
  }
}

module.exports = SabaruShock