// pages/index/index.js
import request from "../../utils/request"
import {popular, follow, rank} from "../../api/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePlate: 0,//活跃板块，0=热门，1=追番
    popularData: [],//热门
    popularPn: 1,
    currentId: 0,//点击的id
    currentIndex: 0,//点击的索引
    followData: [],//追番
    showMoreFollow: false,//展示全部番剧
    rankData: [],//推荐
    sevenRanking: []//排行榜前七位
  },
  /**d
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      popularData: await this.homePopular()
    });
    this.weekCenter();
  },
  //获取首页热门数据
  async homePopular(rid = 1, pn = this.data.popularPn, ps = 20) {
    try {
      return (await popular({
        rid,
        pn,
        ps
      })).data.archives
    } catch (e) {
      console.log(e)
    }
  },
  //让对应的礼拜天始终处于最中间
  weekCenter() {
    let localWeek = (new Date().getDay()) === 0 ? 7 : new Date().getDay();
    this.setData({
      currentId: localWeek,
    })
    for (let i = 0; i < this.data.followData.length; i++) {
      if (this.data.followData[i].dateId === this.data.currentId) {
        this.setData({
          currentIndex: i,
        })
        return;
      }
    }
  },

  //展示热门
  handlerPopular() {
    if (this.data.activePlate !== 0) {
      this.setData({
        activePlate: 0,
      })
    }
  },
  //=>请求追番列表数据
  async handlerFollow() {
    if (this.data.activePlate !== 1) {
      this.setData({
        activePlate: 1,
      })
    }
    //已经请求过追番数据后不再请求
    if (this.data.followData.length === 0) {
      try {
        let [followData, rankData] = await Promise.all([
          follow({season_type: 1}),
          rank({season_type: 1, day: 3})
        ])
        this.setData({
          followData: followData.result.timeline,
          rankData: rankData.result.list,
        })
        this.setData({
          sevenRanking: this.data.rankData.slice(0, 7)
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  //=>动态切换新番更新
  handlerFollowData(e) {
    let targetId = e.currentTarget.dataset.id,
        targetIndex = e.currentTarget.dataset.index;
    this.setData({
      currentId: targetId,
      currentIndex: targetIndex,
    })
  },
  //展示完成番剧
  handlerFollowMore() {
    this.setData({
      showMoreFollow: true
    })
  },
  // 播放点击的视频
  playCurrentVideo(e) {
    getApp().globalData.videoData = this.data.popularData[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: "/pages/playVideo/playVideo",
    })
  },
  playSeason() {
    wx.showToast({
      title: '番剧播放接口以全崩！数据展示仍可用',
      icon: 'none',
      duration: 2500
    })
  },
  //展示搜索页面
  showSearch() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    //=>不处于热门板块不进行上拉刷新
    if (this.data.activePlate !== 0) return;
    try {
      let temp = await this.homePopular(1, ++this.data.popularPn)
      this.setData({
        popularData: this.data.popularData.concat(temp),
        popularPn: this.data.popularPn
      })
      temp = null;
    } catch (e) {
      console.log(e)
    }
  },
})