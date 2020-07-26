// pages/playVideo/playVideo.js
import {
  getVideo,
  up,
  videoTagData,
  rcommend,
  playUrl,
  comment,
  detailComment,
  getDanmu
} from "../../api/api";

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeContent: 'brief',//展示的板块
    videoUrl: '',//视频链接
    videoData: null,//视频数据
    videoTag: [],//视频标签
    videoCid: 0,//正在播放的视频cid
    videoRecommend: [],//推荐的视频
    upData: {},//up数据
    isPlay: true,//是否正在播放
    danmu: false,//是否开启弹幕
    danmuData: '',//弹幕数据 xml
    showMore: false,//展示更多视频简介
    commentData: null,//评论数据
    commentPn: 2,//评论的页数，每页20条
    commentAll: false,//展示完整评论
    commentAllData: null,//二级评论数据
    commentCurrentRpid: [],//当前正在查看的评论的id
    commentAllPn: 2,//二级页数，每页20条
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 从App中获取视频数据，不包含视频url和分p信息
    //cid为必需，除热门视频以外都需要额外请求
    let video = app.globalData.videoData;
    try {
      this.setData({
        videoData: (await getVideo({aid: video.aid})).data
      })
      await this.getVideo(video.aid, this.data.videoData.cid, this.data.videoData.owner.mid)
    } catch (e) {
      console.log(e)
    }
    //直接展示评论页
    if (options.plate === 'comment') {
      let currentTime = Math.round(parseFloat(options.currentTime))
      await this.showComment();
      this.setData({
        activeContent: 'comment'
      })
      this.video.stop()
      this.video.seek(currentTime)
      this.video.play();
    }
  },
  //获取视频数据
  async getVideo(aid, cid, mid) {
    try {
      //视频所有的请求之间都没关联，使用Promise.all同时请求，缩减时间
      let [upData, videoTag, videoRecommend, url] =
          await Promise.all([
            up({mid, photo: false}),
            videoTagData({aid}),
            rcommend({aid}),
            playUrl({avid: aid, cid}),
            getDanmu({oid: cid})
          ])
      this.setData({
        videoUrl: url.data.durl[0].url,
        upData: upData.data,
        videoTag: videoTag.data,
        videoRecommend: videoRecommend.data,
        isPlay: true,
        videoCid: cid,
      })
    } catch (e) {
      console.log(e)
    }
  },
  //弹幕颜色
  // danmuColor(color) {
  //   switch (color) {
  //     case '16646914':
  //       return '#fe0302';
  //       break;
  //     case '16740868':
  //       return '#FF7204';
  //       break;
  //     case '16755202':
  //       return '#FFAA02';
  //       break;
  //     case '16765698':
  //       return '#FFD302';
  //       break;
  //     case '16776960':
  //       return '#FFFF00';
  //       break;
  //     case '10546688':
  //       return '#A0EE00';
  //       break;
  //     case '52480':
  //       return '#00CD00';
  //       break;
  //     case '104601':
  //       return '#019899';
  //       break;
  //     case '4351678':
  //       return '#4266BE';
  //       break;
  //     case '9022215':
  //       return '#89D5FF';
  //       break;
  //     case '13369971':
  //       return '#CC0273';
  //       break;
  //     case '2236962':
  //       return '#222222';
  //       break;
  //     case '10197915':
  //       return '#9B9B9B';
  //       break;
  //     case '16777215':
  //       return '#FFFFFF';
  //       break;
  //     default:
  //       return "#FFFFFF"
  //   }
  // },
  //解析弹幕文件
  parseDanmu() {
    // setTimeout(() => {
    //   let reg = /<d[^>]*?((>.*?<\/d>)|(\/>))/g;
    //   let reg2 = /<d p="(.*)"[^<](.*)<\/d>/g;
    //   let danmuArr = [];
    //   this.setData({
    //     danmuData: this.data.danmuData.match(reg)
    //   })
    //   for(let i = 0;i<this.data.danmuData.length;i++){
    //     let temp = reg2.exec(this.data.danmuData[i]);
    //     if (temp !== null) {
    //       let danmuAtt = temp[1].split(',')
    //       let tempObj = {
    //         content: temp[2],
    //         time: danmuAtt[0],
    //         type: danmuAtt[1],
    //         size: danmuAtt[2],
    //         color: this.danmuColor(danmuAtt[3])
    //       };
    //       danmuArr.push(tempObj);
    //     }else{
    //       i--;
    //     }
    //   }
    //   this.setData({
    //     danmuData:danmuArr
    //   })
    // }, 3000)
  },
  // 视频播放出错
  playError() {
    this.setData({
      isPlay: false,
    })
  },
  // 开关弹幕
  toggleDanmu() {
    this.setData({
      danmu: !this.data.danmu
    })
  },
  //展示更多视频信息
  showMoreDesc() {
    this.setData({
      showMore: !this.data.showMore,
    })
  },
  //播放分P
  async playSegment(e) {
    let i = e.currentTarget.dataset.index,
        cid = e.currentTarget.dataset.cid;
    if (cid === this.data.videoCid) return;
    try {
      this.setData({
        videoUrl: (await playUrl({
          avid: this.data.videoData.aid,
          cid: this.data.videoData.pages[i].cid
        })).data.durl[0].url,
        isPlay: true,
        videoCid: cid,
      })
    } catch (e) {
      console.log(e)
    }
  },
  //播放推荐视频
  async playRecommend(e) {
    let i = e.currentTarget.dataset.index,
        targetVideo = this.data.videoRecommend[i];
    try {
      this.setData({
        videoData: (await getVideo({aid: targetVideo.aid})).data
      })
      await this.getVideo(targetVideo.aid, targetVideo.cid, targetVideo.owner.mid)
    } catch (e) {
      console.log(e);
    }
    //切换视频时清空评论
    this.setData({
      commentData: null,
      commentPn: 2,
    })
  },
  //跳转到用户空间
  userSpace() {
    wx.navigateTo({
      url: "/pages/userSpace/userSpace?user=" + this.data.upData.card.mid,
    })
  },
  //跳转到话题页面
  showTopic(e) {
    let {tid, name} = e.currentTarget.dataset;
    if (tid) {
      wx.navigateTo({
        url: '/pages/topic/topic?tid=' + tid + '&name=' + name
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取video组件
    this.video = wx.createVideoContext('video')
  },
  showBrief() {
    this.setData({
      activeContent: 'brief'
    })
  },
  //显示评论区
  async showComment() {
    this.setData({
      activeContent: 'comment'
    })
    if (!this.data.commentData) {
      this.setData({
        commentData: (await comment({oid: this.data.videoData.aid, type: 1, pn: 1})).data
      })
    }
  },
  //展示所有的评论并请求详细评论数据
  async showAllComment(e) {
    let rpid = e.currentTarget.dataset.rpid,
        count = e.currentTarget.dataset.count;
    if (count <= 3) return;
    this.setData({
      commentAll: true,
    })
    if (this.data.commentCurrentRpid === rpid) return;
    this.setData({
      commentAllData: null,
      commentAllPn: 2,
      commentCurrentRpid: rpid
    })
    this.setData({
      commentAllData: (await detailComment({
        oid: this.data.videoData.aid,
        type: 1,
        pn: 1,
        root: this.data.commentCurrentRpid
      })).data
    })
  },
  //加载更多详细评论
  async loadMoreReply() {
    if (this.data.commentAllData.replies.length < this.data.commentAllData.page.count) {
      let temp = (await detailComment({
        oid: this.data.videoData.aid,
        type: 1,
        pn: this.data.commentAllPn,
        root: this.data.commentCurrentRpid
      })).data.replies;
      this.data.commentAllPn++;
      this.setData({
        commentAllPn: this.data.commentAllPn,
        'commentAllData.replies': this.data.commentAllData.replies.concat(temp)
      })
    }
  },
  //隐藏详细评论
  hiddenAllComment() {
    this.setData({
      commentAll: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.parseDanmu()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    //不处于评论页面或者评论已经加载完毕后直接返回
    if (this.data.activeContent !== 'comment') return
    if (this.data.commentData.replies.length < this.data.commentData.page.count) {
      let temp = (await comment({
        oid: this.data.videoData.aid,
        type: 1,
        pn: this.data.commentPn
      })).data.replies;
      this.data.commentPn++;
      this.setData({
        commentPn: this.data.commentPn,
        'commentData.replies': this.data.commentData.replies.concat(temp)
      })
    }
  },
})