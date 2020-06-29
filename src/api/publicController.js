import svgCaptcha from 'svg-captcha'
import {
  getValue,
  setValue
} from '@/config/RedisConfig';
class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      width: 150,
      height: 38,
      noise: 1
    })
    setValue(body.sid, newCaptcha.text, 600)
    ctx.body = {
      code: 200,
      data: newCaptcha.data,
    }
  }
}
export default new PublicController()