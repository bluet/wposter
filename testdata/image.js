const download = require('image-downloader')
options = {
    url: 'http://www.yankodesign.com/images/design_news/2018/01/gamers-going-green/dor_layout.jpg',
    dest: './images/001.jpg'        // Save to /path/to/dest/photo.jpg
}

download.image(options).then(({ filename, image }) => {
    console.log('File saved to /testdata/images/', filename)
}).catch((err) => {
    throw err
})