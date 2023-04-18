const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')

async function shortener(url) {
  return url;
};

function FaceBook(url){
  return new Promise(async(resolve, reject) => {
    try {
      const config = {
        'id': url,
        'locale': 'id'
      }
      const { data, status } = await axios('https://getmyfb.com/process', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
      if (status === 200) {
        const $ = cheerio.load(data)
        const thumb = $('div.container > div.results-item > div.results-item-image-wrapper').find('img').attr('src')
        const desc = $('div.container > div.results-item > div.results-item-text').text().trim()
        const video_hd = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href')
        const video_sd = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href')
        const hasil = {
          desc: desc,
          thumb: thumb,
          video_sd: video_sd,
          video_hd: video_hd
        };
        resolve(hasil)
      } else {
        console.log('No result found')
      }
    } catch (error) {
      console.error(error)
    }
  })
}

function Instagram(url){
  return new Promise(async(resolve, reject) => {
    try {
      const config = {
        'url': url,
        'submit': ''
      }
      const { data, status, headers } = await axios('https://downloadgram.org/', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
          "cookie": "_ga=GA1.2.2121395638.1671172225; _gid=GA1.2.519005301.1671172225; __gads=ID=e8410c1ba2d24a2d-22a64184ebd800f4:T=1671172219:RT=1671172219:S=ALNI_Mb1AgoUIMTEUaH7QfenBiIcWRELPg; __gpi=UID=00000b914d13b7b4:T=1671172219:RT=1671172219:S=ALNI_MZgo_0w4Isg0hciJVVVjg4RKcl1Pg; __atuvc=5%7C50; __atuvs=639c1080f62ec79d004; _gat_gtag_UA_142480840_1=1; FCNEC=%5B%5B%22AKsRol_PHRocR55hohw-JKbsqqpOx2xRcc645IImzRbkPjvUNzvwUqhcVVIfIDT7C6K_uwGWhqhVk-bAQC0bdKMBlkhj2nhPpDB5sjKqbw8fGdof8FkpatvwsibBPVnx1ekvZnLk29coUmy59u5TSez4HH8_1SNv1Q%3D%3D%22%5D%2Cnull%2C%5B%5D%5D"
        }
      })
      const $ = cheerio.load(data)
      let hasil = []
      $('#downloadhere > a').each(function (i, u) {
        hasil.push($(u).attr('href'))
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', status: 404, mess: 'No result found', result: { link: 'https://i.ibb.co/G7CrCwN/404.png', slide: ['https://i.ibb.co/G7CrCwN/404.png'], slide_length: 404 } })
      const hsil = {
        link: hasil[0],
        slide: hasil,
        slide_length: hasil.length
      }
      resolve(hsil)
    } catch (error) {
      console.error(error)
    }
  })
}
function MediaFire(url){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get(url)
      const $ = cheerio.load(data);
      let name = $('.dl-info > div > div.filename').text();
      let link = $('#downloadButton').attr('href');
      let det = $('ul.details').html().trim().replace(/\s/g, "").replace(/<\/li><li>/g, '\n').replace(/<\/?li>|<\/?span>/g, '');
      let type = $('.dl-info > div > div.filetype').text();
      if (typeof link === undefined) return resolve({ mess: 'No result found' })
      const hasil = {
        filename: name,
        filetype: type,
        link: link,
        detail: det
      };
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function MusiCally(url){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status, headers } = await axios.get('https://musicaldown.com/id', {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
        }
      })
      const $ = cheerio.load(data)
      const url_name = $("#link_url").attr("name")
      const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
      const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
      const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
      const _data = {
        [`${url_name}`]: url,
        [`${token_name}`]: token_,
        verify: verify
      }
      const respon = await axios.request({
        url: 'https://musicaldown.com/id/download',
        method: 'post',
        data: new URLSearchParams(Object.entries(_data)),
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
          'cookie': headers["set-cookie"]
        }
      })
      const ch = cheerio.load(respon.data)
      const resaudio = await axios.request({
        url: 'https://musicaldown.com/id/mp3',
        method: 'post',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
          'cookie': headers["set-cookie"]
        }
      })
      let vdlk = ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href')
      if (typeof vdlk === 'undefined') return resolve({ developer: '@xorizn', mess: 'Infalid link, no result found' })
      const hc = cheerio.load(resaudio.data)
      const result_ = {
        user: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > h2.white-text').find('b').text(),
        desk: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > h2.white-text:nth-child(3)').text(),
        profile: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > div.img-area > img').attr('src'),
        video: vdlk,
        audio: hc('body > div.welcome.section > div.container > div:nth-child(2) > div.col.s12.l4 > audio > source').attr('src'),
        video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href')
      }
      resolve(result_)
    } catch (error) {
      console.error(error)
    }
  })
}
function PinterestVideo(url){
  return new Promise(async(resolve, reject) => {
    try {
      let config = { url: url };
      const { data, status } = await axios("https://www.expertstool.com/download-pinterest-video/", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0"
        },
      })
      if (status === 200) {
        const $ = cheerio.load(data);
        let link = $("div.col-md-8.col-md-offset-2 > video").attr('src');
        if (typeof link === "undefined") return resolve({ creator: "@xorizn", mess: `Link Not Found` });
        resolve({url: link})
      } else {
        console.log('No result found')
      }
    } catch (error) {
      console.error(error)
    }
  })
}
function SoundCloude(url){
  return new Promise(async(resolve, reject) => {
    try {
      const getToken = await axios.get('https://soundcloudmp3.org/', {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
          "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9"
        }
      })
      const dom = new JSDOM(getToken.data).window.document
      const a = dom.querySelector('#conversionForm').innerHTML
      const token = /<input name="_token" type="hidden" value="(.*?)">/g.exec(a)[1]
      const config = {
        _token: token,
        lang: "en",
        url: url,
        submit: ''
      }
  
      const { data, status } = await axios('https://soundcloudmp3.org/converter', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
          "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9"
        }
      })
      if (status === 200) {
        const tot = []
        const $ = cheerio.load(data)
        const link = $('#ready-group > a').attr('href')
        if (typeof link === 'undefined') return resolve({ developer: '@xorizn', mess: 'no result found' })
        const img = $('#preview > div.info.clearfix > img').attr('src')
        $('#preview > div.info.clearfix > p').each(function (i, u) { tot.push($(u).text().replace(':', ': ')) })
        const hasil = {
          title: tot[0],
          link: link ? link : 'err',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          cap: `${tot.join("\n")}`
        }
        resolve(hasil)
      } else {
        console.log('No result found')
      }
    } catch (error) {
      console.error(error)
    }
  })
}
function TikTok(url){
  return new Promise(async(resolve, reject) => {
    try {
      let config = { query: url }
      const { data, status } = await axios("https://lovetik.com/api/ajax/search", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
      });
      if (data.mess) return resolve({ developer: '@xorizn', mess: data.mess });
      let ar = []
      let aud = []
      let wm = []
      let nowm = await shortener((data.play_url || "").replace("https", "http"))
      const rusol = {
        thumb: data.cover,
        v_id: data.vid,
        desc: data.desc ? data.desc : 'No desc',
        nowm: nowm,
        author: {
          author: data.author,
          author_name: data.author_name,
          author_profile: data.author_a,
        }
      }
      for (let i of data.links) {
        let link = await shortener((i.a || "").replace("https", "http"))
        if (i.t === '<b> MP4</b>') {
          ar.push(link)
          rusol.other_video_link = ar
        } else if (i.s === 'Watermarked') {
          rusol.wm = link
        } else if (i.t === '<b>♪ MP3 Audio</b>') {
          aud.push({
            link: link,
            title: i.s
          })
          rusol.audio = aud[0]
        }
      }
      resolve(rusol)
    } catch (error) {
      console.error(error)
    }
  })
}
function TwiTter(url){
  return new Promise(async(resolve, reject) => {
    try {
      let config = {
        'URL': url
      }
      const { data, status } = await axios('https://twdown.net/download.php', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
      if (status === 200) {
        const $ = cheerio.load(data)
        let thumb = $('img.img-thumbnail').attr('src')
        let author = $('div[style="overflow-wrap: break-word;"].col-md-6 > h4').text()
        let link = $('div[style="overflow-wrap: break-word;"].col-md-6 > p').text()
        let hasil = []
        $('div.col-md-8.col-md-offset-2 > table > tbody > tr > td').each(function (a, b) {
          let xor = $(b).find('a').attr('href')
          if (typeof xor === 'undefined' || xor.startsWith('#')) {
          } else {
            hasil.push($(b).find('a').attr('href'))
          }
        })
        const respose = {
          thumb: thumb,
          author: author,
          id_link: link,
          video: hasil[0],
          audio: `https://twdown.net/${hasil.pop()}`
        }
        if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
        resolve(respose)
      } else {
        resolve({ developer: '@xorizn', mess: 'no result found' })
      }
    } catch (error) {
      console.error(error)
    }
  })
}
function YoutubeSl(url, aqua_vid = '480p'){
  return new Promise(async(resolve, reject) => {
    try {
      const data = await await youtubedlv2(url).catch(async _ => await youtubedl(url)).catch(async _ => await youtubedlv3(url))
      const video = await data.video[aqua_vid].download()
      const in_aud = Object.keys(data.audio)[0]
      const audio = await data.audio[in_aud].download()
  
      const hasil = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        video: {
          quality: aqua_vid,
          fileSizeH: data.video[aqua_vid].fileSizeH,
          fileSize: data.video[aqua_vid].fileSize,
          link: video,
        },
        audio: {
          quality: data.audio[in_aud].quality,
          fileSizeH: data.audio[in_aud].fileSizeH,
          fileSize: data.audio[in_aud].fileSize,
          link: audio,
        }
      }
      resolve(hasil)
    } catch (error) {
      console.error(error)
    }
  })
}

module.exports = {
  FaceBook,
  Instagram,
  MediaFire,
  MusiCally,
  PinterestVideo,
  SoundCloude,
  TikTok,
  TwiTter,
  YoutubeSl
}