<div align="center">

<h1>Downloads Scraper</h1>

<p>An api to download all media social</p>

![xorizn-downloads](https://socialify.git.ci/Xorizn/xorizn-downloads/image?description=1&descriptionEditable=This%20is%20a%20scraper%20API%20that%20I%20made%20myself.%20You%20can%20use%20it%20by%20entering%20the%20Vercel%20link%20above%20and%20then%20just%20use%20it.%20Below%20there%20is%20an%20example%20of%20how%20to%20use%20this%20API.&font=Jost&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FXorizn%2Fimage%2Fmain%2Fdownloads.svg%3Ftoken%3DGHSAT0AAAAAACAVCJHEMNT5KG7T2E62Y4M6ZCAWTBA&name=1&owner=1&pattern=Signal&pulls=1&stargazers=1&theme=Light)

</div>

## Other Scraper

- [SEARCH-API](https://github.com/Xorizn/xorizn-search)
- [ALL-API](https://github.com/Xorizn/xorizn-apis)

## List Routes Download Api's
- `/` : Nothing
- `api/downloads/instagram`
- `api/downloads/facebook`
- `api/downloads/mediafire`
- `api/downloads/musicaldown`
- `api/downloads/tiktok`
- `api/downloads/pinterest`
- `api/downloads/soundcloud`
- `api/downloads/twitter`
- `api/downloads/youtube`

> Each API Endpoint have a query paramaters named 'title', and this query parameters will be useful if you want to search the API data by the title.

## Example and params

| Get json                    | query     | Method | Example  |
| :-----------------------    | :-------  | :--    | :--      |
| `api/downloads/instagram`   | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/instagram?url=https://www.instagram.com/p/CrGNt2KIfiM/) |
| `api/downloads/facebook`    | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/facebook?url=https://www.facebook.com/reel/947495549897838) |
| `api/downloads/mediafire`   | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/mediafire?url=https://www.mediafire.com/file/s9co8o5n5ftch9q/RULLMDV5.7z/file) |
| `api/downloads/musicaldown` | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/musicaldown?url=https://vt.tiktok.com/ZS87GQLkR/) |
| `api/downloads/tiktok`      | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/tiktok?url=https://vt.tiktok.com/ZS87GQLkR/) |
| `api/downloads/pinterest`   | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/pinterest?url=https://id.pinterest.com/pin/602356518925573319/) |
| `api/downloads/soundcloud`  | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/soundcloud?url=https://soundcloud.com/eugenia-birgitta-marsha/nadin-amizah-bertaut) |
| `api/downloads/twitter`     | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/twitter?url=https://twitter.com/MemeComicIndo/status/1532598433768300544?s=20) |
| `api/downloads/youtube`     | `url`     | GET    | [EXAMPLE](https://xorizn-downloads.vercel.app/api/downloads/youtube?url=https://www.youtube.com/watch?v=TGlgD1O_y8U) |
## Installation

If you want to add this project in your own machine, you can install this project by following the step below

1. Clone this repository

```
git clone https://github.com/Xorizn/xorizn-downloads.git
```

2. Install dependencies

In my case, i'm using pnpm for package manager, you can adjust with your favorite package manager

```
npm install
```

# MAKASIH LORT
* [`Satya Wikananda`](https://github.com/satyawikananda)
* [`BochilTeam`](https://github.com/BochilTeam/scraper)

ed by Express and vercel. Code licensed under [MIT License](https://raw.githubusercontent.com/Xorizn/xorizn-downloads/master/LICENSE)
