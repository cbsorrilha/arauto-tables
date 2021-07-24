import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
}, {
  timestamps: {
    createdAt: "creationDate",
    updatedAt: "modifiedDate",
  }
});
