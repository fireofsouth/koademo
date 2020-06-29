import {getValue, setValue} from './RedisConfig';
setValue('imooc', 'imooc message from redis client')

getValue('imooc').then((res) => {
  console.log('getValue:' + res)
})
