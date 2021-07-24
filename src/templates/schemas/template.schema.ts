import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
}, {
  timestamps: {
    createdAt: "creationDate",
    updatedAt: "modifiedDate",
  }
});
