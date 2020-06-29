
 
import koa from 'koa'
import path from 'path'
import router from './routes/routes'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import koaBody from 'koa-body' 
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import JWT from 'koa-jwt'
import compose from 'koa-compose'
import compress from 'koa-compress'
import config from './config/index'
import  errorHandle from './common/ErrorHandle'
const app = new koa()

const isDev = process.env.NODE_ENV  === 'production' ? false : true

// 定义公共路径不需要鉴权
const jwt = JWT({secret: config.JWT_SECRET}).unless({path:[/^\/public/,/\/login/]})
/**
 * 使用koa-compose 集成中间件
 */
const middleWare = compose([
  koaBody(),
  statics(path.join(__dirname,'../public')),
  cors(), 
  jsonutil({pretty:false,param:'pretty'}),
  helmet(),
  errorHandle,
  jwt
])
if(!isDev) {
  app.use(compress())
}
app.use(middleWare)
app.use(router())
app.listen(3000)