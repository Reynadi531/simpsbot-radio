import { config } from 'dotenv';
config();
const Youtube = require('simple-youtube-api')
const youtube = new Youtube(process.env.youtube_api)

const ytplaylistvideo = async(pl) => {
    let playlist: any = await youtube.getPlaylist(pl);
    let video: any = await playlist.getVideos()
    let videoids: any[] = video.map(a => (`https://www.youtube.com/watch?v=${a.id}`))
    let send_data = {
        'title': playlist.title,
        'videos': videoids
    }
    return send_data
}

const youtubeVideo = async(url) => {
    youtube.getVideo('https://www.youtube.com/watch?v=3odIdmuFfEY')
        .then(video => {
            console.log(`The video's title is ${video.title}`);
            console.log(video)
        })
        .catch(console.log);
}

export { ytplaylistvideo, youtubeVideo }