import {topicData, topicUser} from "../../api/api";
import commonPlay from "../../utils/commonPlay";

Page({
  data: {
    topicName: '',
    topicData: {},
    topUser: {},
    topicOffset: null,
    topicId: null,
    playId: 0,//动态中播放视频的id
    playUrl: '',//播放的url
    currentTime: '',
  },
  onLoad: async function (options) {
    try {
      this.setData({
        topicId: options.tid
      })
      await this.getTopicData(options.tid)
    } catch (e) {
      console.log(e);
    }
    this.setData({
      topicName: options.name
    })
  },
  //获取话题数据
  async getTopicData(tid) {
    try {
      let [topic, user] = await Promise.all([
        topicData({
          topic_id: tid,
          sortby: 2,
          platform: 'h5',
          baseUrl: 'space'
        }),
        topicUser({
          topic_id: tid,
          baseUrl: 'space'
        })
      ])
      this.setData({
        topicData: topic.data.cards,
        topicOffset: topic.data.offset,
        topUser: user.data,
      })
    } catch (e) {
      console.log(e);
    }
  },
  //跳转用户页
  skipSpaceUser(e) {
    wx.navigateTo({
      url: '/pages/userSpace/userSpace?user=' + e.currentTarget.dataset.mid
    })
  },
  //刷新话题
  async showTopic(e) {
    let {tid, name} = e.currentTarget.dataset.topic;
    if (tid) {
      wx.redirectTo({
        url: '/pages/topic/topic?tid=' + tid + '&name=' + name,
      })
    }
  },
  //播放视频
  async playDynamic(e) {
    try {
      await commonPlay.playVideo(e);
      this.commonData()
    } catch (e) {
      console.log(e);
    }
  },
  //改变数据为公共数据
  commonData() {
    this.setData({
      playUrl: commonPlay.data.url,
      playId: commonPlay.data.id,
      currentTime: commonPlay.data.time
    })
  },
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
  //刷新
  async onReachBottom() {
    try {
      let temp = (await topicData({
        topic_id: this.data.topicId,
        sortby: 2,
        platform: 'h5',
        baseUrl: 'space',
        offset: this.data.topicOffset
      })).data;
      this.setData({
        topicData: this.data.topicData.concat(temp.cards),
        topicOffset: temp.offset,
      })
      temp = null;
    } catch (e) {
      console.log(e);
    }
  }
});