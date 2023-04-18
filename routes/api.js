//server
__path = process.cwd()
var express = require('express');
var router = express.Router();

//module
const util = require('util'),
  develop = '@xorizn';

//Func is URL
const isUrl = (url) => {
  try {
    if (typeof url !== 'string') throw new Error('url is a string!');
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'));
  } catch (err) {
    console.log(util.format(err))
  };
};

const { FaceBook, Instagram, MediaFire, MusiCally, PinterestVideo, SoundCloude, TikTok, TwiTter, YoutubeSl } = require('../lib/downloads')

//function
const mess = {
  null_url: {
    developer: develop,
    mess: "Input parameter 'url'"
  },
  is_url: {
    developer: develop,
    mess: 'Insert url!'
  }
}
const PromiseRes = (hasil) => {
  return { developer: develop, status: 200, result: hasil }
}

//==================================Downloads==================================\\
router.get('/downloads/instagram', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url);
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('instagram')) return res.json({ developer: develop, mess: `${url} is not instagram url` });
    let hasil = await Instagram(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/facebook', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    let hasil = await FaceBook(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/mediafire', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('mediafire')) return res.json({ developer: develop, mess: `${url} is not mediafire url` });
    let hasil = await MediaFire(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/musicaldown', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('tiktok')) return res.json({ developer: develop, mess: `${url} is not tiktok url` });
    let hasil = await MusiCally(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/tiktok', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('tiktok')) return res.json({ developer: develop, mess: `${url} is not tiktok url` });
    let hasil = await TikTok(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/pinterest', async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('pin')) return res.json({ developer: develop, mess: `${url} is not pinterest url` });
    let hasil = await PinterestVideo(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/soundcloud', async (req, res, next) => {
  try {
    const url = req.query.url;
    //All Inputs
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('soundcloud')) return res.json({ developer: develop, mess: `${url} is not soundcloud url` });
    let hasil = await SoundCloude(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/twitter', async (req, res, next) => {
  try {
    const url = req.query.url;
    //All Inputs
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('twitter')) return res.json({ developer: develop, mess: `${url} is not twitter url` });

    let hasil = await TwiTter(url)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/downloads/youtube', async (req, res, next) => {
  try {
    const url = req.query.url,
      quality = req.query.quality,
      aqua = quality ? quality : '480p',
      moqua = ['1080p', '720p', '480p', '360p', '240p', '144p'];
    //All Inputs
    if (!url) return res.json(mess.null_url)
    if (!isUrl(url)) return res.json(mess.is_url);
    if (!url.includes('youtu')) return res.json({ developer: develop, mess: `${url} is not youtube url` });
    if (!moqua.includes(aqua)) return res.json({ developer: develop, mess: `quality ${aqua} not found, available qualitys: ${moqua.join(', ')}` })

    let hasil = await YoutubeSl(url, aqua)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})

module.exports = router