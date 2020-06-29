import send from '../config/MailConfig';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';
import User from '@/model/User';
import { checkCode } from '@/common/utils';

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    try {
      let result = await send({
        code: ' ',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'fanyihu'
      });
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      };
    } catch (e) {}
  }
  async login(ctx) {
    //接受用户的数据
    //验证图片验证码的时效性、正确性
    // 验证用户账号密码是否正确
    //返回token
    const { body } = ctx.request;
    let sid = body.sid;
    let code = body.code;
    const result = await checkCode(sid, code);
    if (result) {
      // 验证用户账号密码是否正确
      let checkUserPasswd = false;
      let user = await User.findOne({
        username: body.username
      });
      if (user && user.password === body.password) {
        checkUserPasswd = true;
      }
      if (checkUserPasswd) {
        // 验证通过，返回Token数据
        let token = jsonwebtoken.sign(
          {
            _id: 'hufangyi',
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
          },
          config.JWT_SECRET
        );
        ctx.body = {
          code: 200,
          token
        };
      } else {
        // 用户名 密码验证失败， 返回提示
        ctx.body = {
          code: 200,
          msg: '用户名或密码不正确'
        };
      }
    } else {
      // 图片验证码校验不过
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确，请检查'
      };
    }
  }
}
export default new LoginController();
