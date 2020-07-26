// pages/userSpace/userSpace.js
import {spaceDynamic, spaceLikeCount, spacePhoto, spaceUser, spaceVideo} from "../../api/api";
import commonPlay from "../../utils/commonPlay";

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,//用户信息
    activePlate: 'dynamic',//展示的板块
    contribution: [],//
    photoData: [],//相簿数据
    playId: 0,//动态中播放视频的id
    playUrl: '',//播放的url
    currentTime: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getSpaceHomeData(options)
  },
  //改变数据为公共数据
  commonData() {
    this.setData({
      playUrl: commonPlay.data.url,
      playId: commonPlay.data.id,
      currentTime: commonPlay.data.time
    })
  },
  //获取空间首页数据
  async getSpaceHomeData(options) {
    let [user, like, dynamic] = await Promise.all([
      (await spaceUser({
        mid: options.user,
        photo: true
      })),
      (await spaceLikeCount({
        mid: options.user
      })),
      (await spaceDynamic({
        baseUrl: 'space',
        host_uid: options.user,
        need_top: 1
      }))
    ])
    this.setData({
      userInfo: user.data,
      'userInfo.likes': like.data.likes,
      spaceData: dynamic.data
    })
  },
  //获取投稿的视频
  async getContribution(mid, ps = 20, pn = 1) {
    try {
      this.setData({
        contribution: (await spaceVideo({
          mid,
          pn,
          ps
        })).data.list.vlist
      })
    } catch (e) {
      console.log(e);
    }
  },
  //获取相簿
  async getPhoto(uid, ps = 20) {
    this.setData({
      photoData: (await spacePhoto({
        uid,
        baseUrl: 'space',
      })).data.items
    })
  },
  //切换展示内容
  async toggleContent(e) {
    if (e.currentTarget.dataset.type === this.data.activePlate) return;
    if (e.currentTarget.dataset.type === 'video') {
      await this.getContribution(this.data.userInfo.card.mid)
    } else if (e.currentTarget.dataset.type === 'photo') {
      await this.getPhoto(this.data.userInfo.card.mid)
    }
    this.setData({
      activePlate: e.currentTarget.dataset.type,
      playId: 0,
      isComment: false
    })
  },
  //播放投稿视频，跳转播放页
  playVideo(e) {
    app.globalData.videoData = e.currentTarget.dataset.video;
    wx.navigateTo({
      url: "/pages/playVideo/playVideo",
    })
  },
  //播放动态内容的视频，不跳转播放页
  async playDynamic(e) {
    try {
      await commonPlay.playVideo(e);
      this.commonData()
    } catch (e) {
      console.log(e);
    }
  },
  //跳转至话题页
  showTopic(e) {
    let {tid, name} = e.currentTarget.dataset.topic;
    if (tid) {
      wx.navigateTo({
        url: '/pages/topic/topic?tid=' + tid + '&name=' + name
      })
    }
  },
  //分享
  onShareAppMessage(res) {
    return {
      title: '哔哩哔哩',
      path: '/pages/index/index'
    }
  },
  //评论，跳转至播放页面
  showReply(e) {
    commonPlay.showReply(e, this.commonData)
  },
  //点赞
  giveLike() {
    commonPlay.giveLike()
  },
  //记录播放事件
  recordDuration(e) {
    commonPlay.recordDuration(e);
  },
})