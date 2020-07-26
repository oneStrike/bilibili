import wxRequest from '../utils/request'

//热门
export const popular = (data = {}) => wxRequest('/x/web-interface/dynamic/region', data)

//追番
export const follow = (data = {}) => wxRequest('/pgc/web/timeline/v2', data)

//番剧排行
export const rank = (data = {}) => wxRequest('/pgc/web/rank/list', data)

//视频数据
export const getVideo = (data = {}) => wxRequest('/x/web-interface/view', data)

//播放链接
export const playUrl = (data = {}) => wxRequest('x/player/playurl?platform=html5&otype=json&qn=16&type=mp4&html5=1', data)

//弹幕
export const getDanmu = (data = {}) => wxRequest('x/v1/dm/list.so', data)

//up主
export const up = (data = {}) => wxRequest('/x/web-interface/card', data)

//视频标签
export const videoTagData = (data = {}) => wxRequest('/x/tag/archive/tags', data)

//视频推荐
export const rcommend = (data = {}) => wxRequest('/x/web-interface/archive/related', data)

//评论
export const comment = (data = {}) => wxRequest('/x/v2/reply', data)

//详细评论
export const detailComment = (data = {}) => wxRequest('/x/v2/reply/reply', data)

//搜索
export const search = (data = {}) => wxRequest('/x/web-interface/search/type', data)

//热搜
export const hotSearch = (data) => wxRequest('/main/hotword', data)

//搜索建议
export const searchSuggest = (data) => wxRequest('/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&bangumi_acc_num=3&special_acc_num=0&upuser_acc_num=0&tag_num=10', data)

//空间用户
export const spaceUser = (data = {}) => wxRequest('/x/web-interface/card', data)

//用户点赞数量
export const spaceLikeCount = (data = {}) => wxRequest('/x/space/upstat', data)

//空间动态
export const spaceDynamic = (data) => wxRequest('/dynamic_svr/v1/dynamic_svr/space_history', data)

//空间视频
export const spaceVideo = (data = {}) => wxRequest('/x/space/arc/search', data)

//空间相簿
export const spacePhoto = (data = {}) => wxRequest('link_draw/v1/Doc/photo_list_ones', data)

//话题用户
export const topicUser = (data = {}) => wxRequest('topic_svr/v1/topic_svr/get_active_users', data)

//话题数据
export const topicData = (data = {}) => wxRequest('topic_svr/v1/topic_svr/fetch_dynamics', data)

//国际地区代码
export const country = (data = {}) => wxRequest('/web/generic/country/list', data)

//申请验证码参数
// export const verificationCombine = (data = {}) => wxRequest('web/captcha/combine?plat=6', data)
//
// //申请极验
// export const applicationGeetest = (data = {}) => wxRequest('get.php', data)
//
// //发送验证码
// export const verification = (data) => wxRequest('/web/sms/general/v2/send', data, 'POST')