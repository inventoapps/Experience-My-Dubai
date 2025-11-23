import { Schema, Document, model, models } from "mongoose";

export interface BlogArticle extends Document {
  slug: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string; 
  content: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  views: number;
  published: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogArticleSchema = new Schema<BlogArticle>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    thumbnail: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    faq: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    published: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    metaTitle: {
      type: String,
    },

    metaDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog =
  models.Blog || model<BlogArticle>("Blog", BlogArticleSchema);
