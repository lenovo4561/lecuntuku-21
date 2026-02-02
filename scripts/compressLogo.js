const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const inputPath = path.join(__dirname, '../src/assets/images/logo.png')
const outputPath = path.join(__dirname, '../src/assets/images/logo.png')

async function compressLogo() {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.error('错误: logo.png 文件不存在!')
      console.log('查找路径:', inputPath)
      return
    }

    console.log('开始压缩 logo.png...')
    console.log('输入路径:', inputPath)

    // 压缩图片到 192x192
    await sharp(inputPath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 80,
        compressionLevel: 9
      })
      .toFile(outputPath + '.tmp')

    // 替换原文件
    fs.renameSync(outputPath + '.tmp', outputPath)

    console.log('✓ logo.png 已成功压缩到 192x192 分辨率')

    // 显示文件大小
    const stats = fs.statSync(outputPath)
    const fileSizeInKB = (stats.size / 1024).toFixed(2)
    console.log(`✓ 压缩后文件大小: ${fileSizeInKB} KB`)
  } catch (error) {
    console.error('压缩失败:', error)
    process.exit(1)
  }
}

compressLogo()
