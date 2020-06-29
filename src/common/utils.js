import {
  getValue
} from '@/config/RedisConfig'

const checkCode = async (key, value) => {
  let result = false
  const redisData = await getValue(key)
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      result = true
    }
  }
  return result
}
export {
  checkCode
}