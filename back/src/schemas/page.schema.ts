import * as mongoose from "mongoose";

export const PageSchema = new mongoose.Schema({
  title: String,
  url: String,
  content: String,
  seoTitle: String,
  seoDescription: String,
  date: Date,
  isActive: Boolean,
  category: {
    type: {},
    default: null,
  },
});
