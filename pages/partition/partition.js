// pages/partition/partition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //没找到接口，手写
    partitionList: [{
        svgName: 'anime',
        partitionName: '番剧',
        tid: 13,
        item: [{
            itemName: '连载动画',
            tid: 33,
          },
          {
            itemName: '已完结',
            tid: 32,
          }, {
            itemName: '相关资讯',
            tid: 51,
          }, {
            itemName: '宣传节目',
            tid: 152,
          },
        ]
      },
      {
        svgName: 'chinse',
        partitionName: '国创',
        tid: 167,
        item: [{
            itemName: '国产动画',
            tid: 153
          },
          {
            itemName: '原创相关',
            tid: 168
          },
          {
            itemName: '布袋戏',
            tid: 169
          },
          {
            itemName: '广播剧',
            tid: 195
          },
          {
            itemName: '咨询',
            tid: 170
          },
        ],
      },
      {
        svgName: 'documentary',
        partitionName: '记录片',
        tid: 177,
        item: [{
            itemName: '人文.历史',
            tid: 37
          },
          {
            itemName: '科学·探索·自然',
            tid: 178
          },
          {
            itemName: '军事',
            tid: 179
          },
          {
            itemName: '社会·美食·旅行',
            tid: 180
          },
        ],
      },
      {
        svgName: 'douga',
        partitionName: '动画',
        tid: 1,
        item: [{
            itemName: 'MAD·AMV',
            tid: 24
          },
          {
            itemName: 'MMD·3D',
            tid: 25
          },
          {
            itemName: '短片·手书·配音',
            tid: 47
          },
          {
            itemName: '特摄',
            tid: 86
          },
          {
            itemName: '综合',
            tid: 27
          },
        ]
      },
      {
        svgName: 'music',
        partitionName: '音乐',
        tid: 3,
        item: [{
            itemName: '原创音乐',
            tid: 28
          },
          {
            itemName: '翻唱',
            tid: 31
          },
          {
            itemName: 'VOCALOID.UTAU',
            tid: 30
          },
          {
            itemName: '电音',
            tid: 194
          },
          {
            itemName: '演奏',
            tid: 59
          },
          {
            itemName: 'MV',
            tid: 193
          },
          {
            itemName: '音乐现场',
            tid: 29
          },
          {
            itemName: '音乐综合',
            tid: 130
          },
        ]
      },
      {
        svgName: 'dance',
        partitionName: '舞蹈',
        tid: 129,
        item: [{
            itemName: '宅舞',
            tid: 20
          },
          {
            itemName: '街舞',
            tid: 198
          },
          {
            itemName: '明星舞蹈',
            tid: 199
          },
          {
            itemName: '中国舞',
            tid: 200
          },
          {
            itemName: '舞蹈综合',
            tid: 154
          },
          {
            itemName: '舞蹈教程',
            tid: 156
          },

        ]
      },
      {
        svgName: 'game',
        partitionName: '游戏',
        tid: 4,
        item: [{
            itemName: '单机游戏',
            tid: 17
          },
          {
            itemName: '电子竞技',
            tid: 171
          },
          {
            itemName: '手机游戏',
            tid: 172
          },
          {
            itemName: '网络游戏',
            tid: 65
          },
          {
            itemName: '桌游棋牌',
            tid: 173
          },
          {
            itemName: 'GMV',
            tid: 121
          },
          {
            itemName: '音游',
            tid: 136
          },
          {
            itemName: 'Mugen',
            tid: 19
          },
        ]
      },
      {
        svgName: 'technology',
        partitionName: '知识',
        tid: 36,
        item: [{
            itemName: '科学科普',
            tid: 201
          },
          {
            itemName: '财经',
            tid: 207
          },
          {
            itemName: '校园学习',
            tid: 208
          },
          {
            itemName: '职业职场',
            tid: 209
          },
          {
            itemName: '野生技术协会',
            tid: 122
          },

        ]
      },
      {
        svgName: 'digital',
        partitionName: '数码',
        tid: 188,
        item: [{
            itemName: '手机平板',
            tid: 95
          },
          {
            itemName: '电脑装机',
            tid: 189
          },
          {
            itemName: '摄影摄像',
            tid: 190
          },
          {
            itemName: '影音智能',
            tid: 191
          },

        ]
      },
      {
        svgName: 'life',
        partitionName: '生活',
        tid: 160,
        item: [{
            itemName: '搞笑',
            tid: 138
          },
          {
            itemName: '日常',
            tid: 21
          },
          {
            itemName: '美食圈',
            tid: 76
          },
          {
            itemName: '动物圈',
            tid: 75
          },
          {
            itemName: '手工',
            tid: 161
          },
          {
            itemName: '绘画',
            tid: 162
          },
          {
            itemName: '运动',
            tid: 163
          },
          {
            itemName: '汽车',
            tid: 176
          },
          {
            itemName: '其他',
            tid: 174
          },
        ]
      },
      {
        svgName: 'kichiku',
        partitionName: '鬼畜',
        tid: 119,
        item: [{
            itemName: '鬼畜调教',
            tid: 22
          },
          {
            itemName: '音MAD',
            tid: 26
          },
          {
            itemName: '人力VOCALOID',
            tid: 126
          },
          {
            itemName: '教程演示',
            tid: 127
          },

        ]
      },
      {
        svgName: 'fashion',
        partitionName: '时尚',
        tid: 155,
        item: [{
            itemName: '美妆',
            tid: 157
          },
          {
            itemName: '服饰',
            tid: 158
          },
          {
            itemName: '健身',
            tid: 164
          },
          {
            itemName: 'T台',
            tid: 159
          },
          {
            itemName: '风尚标',
            tid: 192
          },

        ]
      },
      {
        svgName: 'ent',
        partitionName: '娱乐',
        tid: 5,
        item: [{
            itemName: '综艺',
            tid: 71
          },
          {
            itemName: '明星',
            tid: 137
          },
          {
            itemName: 'Korea相关',
            tid: 131
          },

        ]
      },
      {
        svgName: 'cinephile',
        partitionName: '影视',
        tid: 181,
        item: [{
            itemName: '影视杂谈',
            tid: 182
          },
          {
            itemName: '影视剪辑',
            tid: 183
          },
          {
            itemName: '短片',
            tid: 85
          },
          {
            itemName: '预告·资讯',
            tid: 184
          },
        ]
      },
      {
        svgName: 'movie',
        partitionName: '电影',
        tid: 23,
        item: [{
            itemName: '华语电影',
            tid: 147
          },
          {
            itemName: '欧美电影',
            tid: 145
          },
          {
            itemName: '日本电影',
            tid: 146
          },
          {
            itemName: '其他国家',
            tid: 83
          },

        ]
      },
      {
        svgName: 'teleplay',
        partitionName: '电视剧',
        tid: 11,
        item: [{
            itemName: '国产剧',
            tid: 185
          },
          {
            itemName: '海外剧',
            tid: 187
          },

        ],
      }
    ],
  },
  showPartition(e) {
    if (e.currentTarget.dataset.par.tid === 13) {
      wx.showToast({
        title: '番剧播放接口以全崩！其他仍可用',
        icon: 'none',
        duration: 2500
      })
    } else {
      let query = JSON.stringify(e.currentTarget.dataset.par)
      console.log(query)
      wx.navigateTo({
        url: '/pages/partitionContent/partitionContent?par=' + query
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})