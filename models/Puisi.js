import mongoose from "mongoose";
const { Schema } = mongoose;

const Puisi = new Schema(
  {
    puisi: {
      type: String,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    puisi_with_header: {
      type: String,
    },
    comment: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Puisi", Puisi);
