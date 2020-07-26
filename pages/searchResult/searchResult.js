// pages/searchResult/searchResult.js
import {search} from "../../api/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    searchType: '',
    totalrankData: null,//综合排序
    mostData: null,//最多播放
    newestData: null,//最新发布
    page: 1,//页码
  },
  //发送请求
  async sendSearch(order, page = 1) {
    try {
      return (await search({
        keyword: this.data.keyword,
        order,
        page,
        search_type: 'video',
      })).data
    } catch (e) {
      console.log(e);
    }
  },
  //保存数据
  async saveResult(e) {
    let type = e ? e.currentTarget.dataset.type : 'totalrank',
        source = e ? e.currentTarget.dataset.source : '';
    if (e && e.detail.value) {
      this.setData({
        keyword: e.detail.value,
        totalrankData: null,
        mostData: null,
        newestData: null,
      })
    }
    if (type !== this.data.searchType || source === 'result') {
      try {
        if (type === 'click' && !this.data.mostData) {
          this.setData({
            mostData: await this.sendSearch(type, 1),
          })
        } else if (type === 'pubdate' && !this.data.newestData) {
          this.setData({
            newestData: await this.sendSearch(type, 1),
          })
        } else if (type === 'totalrank' && !this.data.totalrankData) {
          this.setData({
            totalrankData: await this.sendSearch(type, 1),
          })
        }
        this.setData({
          searchType: type,
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  //播放搜索的视频
  playSearchVideo(e) {
    getApp().globalData.videoData = e.currentTarget.dataset.video
    wx.navigateTo({
      url: "/pages/playVideo/playVideo",
    })
  },
  //上拉加载更多搜索数据
  async loadSearchResult() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      keyword: options.key,
    });
    await this.saveResult()
  },
})