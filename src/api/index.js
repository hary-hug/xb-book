import wepy from 'wepy'

// 接口域名
// const host = 'http://10.2.212.10:8080/api'
// const host = 'http://192.168.0.104:8080/api'
const host = 'https://song.eye-note.com/api'

// 接口列表
const uri = {
  v1Series: '/v1/series',
  v1SeriePoems: '/v1/serie/poems',
  v1search: '/v1/search',
  v1Poem: '/v1/poem',
  wxLogin: '/v1/wxlogin',
  user: '/v1/user',
  favourites: '/v1/user/favourites',
  favouriteGroups: '/v1/user/favourite/groups',
  addFavourite: '/v1/user/favourite/add',
  cancelFavourite: '/v1/user/favourite/cancel',
  v1TaskInit: '/v1/task/init',
  v1TaskAddCount: '/v1/task/count/add',
  v1TaskSetting: '/v1/user/task/setting',
  v1TaskSettingSave: '/v1/user/task/setting/save',
  v1FeedbackAdd: '/v1/user/feedback/add'
}

// 网络请求
const request = async (options) => {
  // 补全接口地址
  if (options.url.indexOf('http') === -1) {
    options.url = host + options.url
  }
  let token = wepy.getStorageSync('_token')
  if (token) {
    // header始终带上token
    if (options.header) {
      options.header['x-token'] = token
    } else {
      options.header = {
        'x-token': token
      }
    }
  }
  let res = await wepy.request(options)
  // 服务器错误
  if (res.statusCode !== 200) {
    wepy.showToast({
      title: '服务器出错误了:' + res.statusCode,
      icon: 'none',
      duration: 2000
    })
    return
  }
  return res.data
}

const api = {
  host: host,
  uri: uri,
  request: request
}

export default api
