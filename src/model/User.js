import mongoose from '../config/DBhelp'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  'name': {
    type: String
  },
  'password': {
    type: String
  },
})

const UserModel = mongoose.model('users', UserSchema)
export default UserModel