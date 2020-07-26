// pages/search/search.js
import {hotSearch, searchSuggest} from "../../api/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchData: [],//热搜
    historySearchData: ['Reol', '凉风KAZE'],//历史搜索
    searchContent: '',//用户搜索内容
    suggestData: [],//搜索建议
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearch();
    //本地缓存中读取历史记录
  },
  //获取热门搜索
  async getHotSearch() {
    try {
      this.setData({
        hotSearchData: (await hotSearch()).list
      })
    } catch (e) {
      console.log(e)
    }
  },
  //清空或删除某一个历史记录
  clearHistory(e) {
    let clearType = e.currentTarget.dataset.index;
    if (typeof clearType === 'undefined') {
      this.setData({
        historySearchData: [],
      })
    } else {
      this.data.historySearchData.splice(parseInt(clearType), 1);
      this.setData({
        historySearchData: this.data.historySearchData
      })
    }
  },
  //跳转至搜索结果页,不请求数据
  goToResult(e) {
    let keyword = e.currentTarget.dataset.key || this.data.searchContent;
    wx.navigateTo({
      url: '/pages/searchResult/searchResult?key=' + keyword,
    })
    if (this.data.historySearchData.indexOf(keyword) === -1) {
      this.data.historySearchData.push(keyword)
      this.setData({
        historySearchData: this.data.historySearchData,
      })
    }
  },
  bilateral(e) {
    //节流
    this.data.timer && clearTimeout(this.data.timer);
    this.setData({
      timer: setTimeout(() => {
        this.setData({
          searchContent: e.detail.value,
        })
        this.getSuggest()
        return this.data.searchContent
      }, 200)
    })
  },
  //获取搜索建议
  async getSuggest() {
    if (this.data.searchContent === '') return;
    try {
      //没有相关的搜索记录时会走catch语句，先记录一下
      this.setData({
        suggestData: (await searchSuggest({
          term: this.data.searchContent,
          rnd: Math.random()
        })).result.tag
      })
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(2)
    let self = this;
    wx.getStorage({
      key: 'history',
      success(res) {
        self.setData({
          historySearchData: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      key: 'history',
      data: this.data.historySearchData
    })
  },
})