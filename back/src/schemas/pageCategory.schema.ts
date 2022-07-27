import * as mongoose from "mongoose";

export const PageCategorySchema = new mongoose.Schema({
  name: String,
  parent: String,
  link: String,
  order: Number,
});
