import mongoose from '../lib/mongoose';
import Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  hash: string;
};

var userSchema = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  hash: String
});

export default mongoose.model<IUser>('User', userSchema);
