import wepy from 'wepy'

const tokenKey = '_token'
const expireKey = '_expire'

// 验证
const validate = () => {
  let token = wepy.getStorageSync(tokenKey)
  let expire = wepy.getStorageSync(expireKey)
  let now = Date.parse(new Date()) / 1000

  if (token && expire >= now) {
    return true
  }
  // 清空
  wepy.removeStorageSync(tokenKey)
  wepy.removeStorageSync(expireKey)

  return false
}

// 保存
const save = (token, expire) => {
  wepy.setStorageSync(tokenKey, token)
  wepy.setStorageSync(expireKey, expire)
}

const token = {
  validate: validate,
  save: save
}

export default token
