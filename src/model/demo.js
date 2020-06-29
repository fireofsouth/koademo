import User from './test'


//　增
const user = {
  name: 'haha',
  age: 30,
  email: 'heheh@11.com'
}
const insertMethod = async () =>{
   const data = new User(user)
   const result =  await data.save()
   console.log(result)
}
 
// 查
const findMethod = async () =>{
  const result =  await User.find()
  console.log(result)
}

// 改
const updateMethod = async () =>{
  const result =  await User.updateOne({name:'hufangyi'}, {
    email:'hahha@hahah.com'
  })
  console.log(result)
}
// 删 
const deleteMethod = async () =>{
  const result =  await User.deleteOne({name:'haha'})
  console.log(result)
}
deleteMethod()