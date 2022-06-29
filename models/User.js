import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    unique: true,
  },
  namaLengkap: {
    type: String,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

export default mongoose.model("User", User);
