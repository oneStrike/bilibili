import request from "../../utils/request";
import {popular} from "../../api/api";

Page({
  data: {
    mainPar: null,
    currentIndex: 0,
    partitionData: {},
  },
  onLoad: async function (options) {
    this.setData({
      mainPar: JSON.parse(options.par)
    })
    await this.getPartitionData(this.data.mainPar.item[this.data.currentIndex].tid, 1)
  },
  //切换类型
  async toggleType(e) {
    if (this.data.currentIndex === e.currentTarget.dataset.index) return;
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
    })
    await this.getPartitionData(this.data.mainPar.item[this.data.currentIndex].tid, 1)
  },
  //请求数据
  async getPartitionData(rid, pn = 1) {
    if (this.data.partitionData[this.data.currentIndex]) return;
    try {
      this.data.partitionData[this.data.currentIndex] = (await popular({rid, pn, ps: 20})).data.archives;
      this.setData({
        partitionData: this.data.partitionData
      })
    } catch (e) {
      console.log(e)
    }
  },
  //播放
  playPartition(e) {
    getApp().globalData.videoData = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/playVideo/playVideo',
    })
  },
});