const Mirai = require('node-mirai-sdk')
const {Plain, At} = Mirai.MessageComponent
const axios = require('axios')
const { login } = require('./config/secret.js')
const fs = require('fs');       //引入文件读取模块
const https = require('https')
const RandomNeko = require('./plugins/random-neko.js')
const RandomInu = require('./plugins/random-inu.js')
const SabaruShock = require('./plugins/sabaru-shock.js')
// const SabaruOhayo = require('./plugins/sabaru-ohayo')


/**
* 服务端设置(*)
* host: mirai-api-http 的地址和端口，默认是 http://127.0.0.1:8080
* authKey: mirai-api-http 的 authKey，建议手动指定
* qq: 当前 BOT 对应的 QQ 号
* enableWebsocket: 是否开启 WebSocket，需要和 mirai-api-http 的设置一致
*/
const bot = new Mirai({
  host: login.host,
  authKey: login.authKey,
  qq: login.qq,
  enableWebsocket: false
})
// auth 认证(*)
bot.onSignal('authed', () => {
  console.log(`Authed with session key ${bot.sessionKey}`);
  bot.verify();
});

// session 校验回调
bot.onSignal('verified', async () => {
  console.log(`Verified with session key ${bot.sessionKey}`);
  // 获取好友列表，需要等待 session 校验之后 (verified) 才能调用 SDK 中的主动接口
  const friendList = await bot.getFriendList();
  console.log(`There are ${friendList.length} friends in bot`);
});

bot.onMessage(async message => {
  const { type, sender, messageChain, reply, quoteReply } = message
  let msg = ''
  messageChain.forEach(chain => {
    if (chain.type === 'Plain') {
      msg += Plain.value(chain); 
    }       // 从 messageChain 中提取文字内容
  })
  if(msg.includes('臭吼姆')) {
    reply('你才臭，你比野兽还臭')
  }
  if(msg.includes('臭阿云')) {
    reply('对对，阿云最臭了')
  }
})

bot.use(RandomNeko())
bot.use(RandomInu())
bot.use(SabaruShock())
// bot.use(SabaruOhayo())

bot.listen('all');

process.on('exit', () => {
  bot.release()
})