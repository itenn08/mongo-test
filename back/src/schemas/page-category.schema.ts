import * as mongoose from "mongoose";

export const PageCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  parent: {
    type: {},
    default: null,
  },
  link: String,
  order: Number,
  type: {
    type: String,
    default: null,
  },
});
