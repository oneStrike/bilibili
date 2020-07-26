// pages/profile/profile.js
import {country, verification, verificationCombine, applicationGeetest} from "../../api/api";
import request from "../../utils/request";

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    loginType: null,
    passportData: {passport: [], index: 0, areaCode: '86'},
    loginOptions: {phone: '', verificationCode: '', countDown: 0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handlerUserInfo()
  },
  //获取用户信息
  handlerUserInfo() {
    let self = this;
    wx.getUserInfo({
      success(res) {
        if (res.userInfo) {
          self.setData({
            userInfo: res.userInfo,
            loginType: 'wx'
          })
        } else {
          wx.showToast({
            title: '登录获取更多服务',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    })
  },
  //用户授权弹窗
  userInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      loginType: 'wx'
    })
  },
  //使用bilibili手机号登录
  async biliLogin() {
    let temp = (await country({baseUrl: 'passport'})).data;
    let passport = temp.common.concat(temp.others)
    this.setData({
      loginType: 'bili',
      'passportData.passport': passport
    })
    wx.showToast({
      title: '需要使用第三方插件，个人无法申请',
      icon: 'none',
      duration: 2000
    })
  },
  //关闭bilibili手机号登录
  closeLogin() {
    this.setData({
      loginType: 'wx'
    })
  },
  //选择区域
  selectPassPort(e) {
    let value = e.detail.value;
    if (value) {
      this.setData({
        'passportData.index': value,
        'passportData.areaCode': this.data.passportData.passport[value].country_id
      })
    }
  },
  //手机号
  phoneInput(e) {
    this.setData({
      'loginOptions.phone': e.detail.value.replace(/\s+/g, "")
    })
    return this.data.loginOptions.phone
  },
  //验证码
  verificationCodeInput(e) {
    this.setData({
      'loginOptions.verificationCode': e.detail.value
    })
    return this.data.loginOptions.verificationCode.replace(/\s+/g, "")
  },
  //发送验证码
  async sendVerification() {
    if (this.data.loginOptions.countDown > 0) return;
    //验证手机号
    if (!(/^1[3456789]\d{9}$/.test(this.data.loginOptions.phone))) {
      wx.showToast({
        title: '手机号格式错误',
        duration: 2000,
        image: '/static/images/error.svg'
      })
      return;
    }
    //发送请求开启定时器
    this.data.loginOptions.countDown = 60;
    let timer = setInterval(() => {
      this.setData({
        'loginOptions.countDown': --this.data.loginOptions.countDown
      })
      if (this.data.loginOptions.countDown === 0) {
        clearInterval(timer)
        this.setData({
          'loginOptions.countDown': 0,
        })
      }
    }, 1000)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})