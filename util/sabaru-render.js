const { createCanvas, loadImage } = require('canvas')

async function renderSabaru(str) {
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
  let addY = (520 - (10 - baseLength * 4)) / (str.length - 1)
  ctx.font = 96 - (44 * baseLength / 5) + 'px SimHei, STHeiti'
  ctx.fillStyle = '#000'
  ctx.textBaseline = 'top'
  for(let i = 0; i < str.length; i++) {
    ctx.fillText(str[i], startX, startY + addY * i)
  }
  const buffer = canvas.toBuffer('image/png')
  return buffer
}

module.exports = renderSabaru