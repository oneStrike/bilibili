import {playUrl} from "../api/api";

const app = getApp();
let data = {
  url: null,
  id: null,
  time: 0,
  flag: false,
  video: wx.createVideoContext('space')

};
//播放视频
async function playVideo(e) {
  let {aid, cid} = e.currentTarget.dataset;
  try {
    data.id = cid;
    data.url = (await playUrl({avid: aid, cid})).data.durl[0].url;
    console.log(23)
  } catch (e) {
    console.log(e);
  }
}
//记录播放的事件
function recordDuration(e) {
  if (data.flag) {
    data.time = e.detail.currentTime;
  }
}
//跳转至播放页并展示评论
function showReply(e, changeData) {
  if (Object.keys(e.currentTarget.dataset.id).length === 3) {
    data.flag = true;
    changeData()
    app.globalData.videoData = e.currentTarget.dataset.id;
    setTimeout(() => {
      wx.navigateTo({
        url: "/pages/playVideo/playVideo?plate=comment&currentTime=" + data.time,
        success(res) {
          data.video.pause()
        }
      })
    }, 150)
  }
}
//点赞
function giveLike() {
  wx.showToast({
    title: '需要登录,但是么有登录接口',
    duration: 2000,
    icon: 'none',
  })
}

export default {
  data,
  playVideo,
  showReply,
  recordDuration,
  giveLike
}