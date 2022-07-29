import * as mongoose from "mongoose";

export const PageCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  parent_id: String,
  link: String,
  order: Number,
  type: {
    type: String,
    default: null,
  },
});
