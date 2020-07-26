let baseUrl1 = 'http://49.234.125.167/bilibili/';
let baseUrl2 = 'http://49.234.125.167/space/';
let baseUrl3 = 'http://49.234.125.167/passport/';
let baseUrl4 = 'http://49.234.125.167/geetest/';
export default (url, data = {}, method = 'GET', header,) => {
  if (data.baseUrl === 'space') {
    delete data.baseUrl;
    url = baseUrl2 + url;
  } else if (data.baseUrl === 'passport') {
    delete data.baseUrl
    url = baseUrl3 + url;
  } else if (data.baseUrl === 'geetest') {
    url = baseUrl4 + url;
  } else {
    url = baseUrl1 + url;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      success: (response) => {
        resolve(response.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}