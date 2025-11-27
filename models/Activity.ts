import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IActivity extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;

  location: {
    city: string;
    country: string;
    area?: string;
  };

  duration: {
    label: string;      
    hours?: number;     
    days?: number;     
  };

  price: number;
  discountPrice?: number;

  categories: string[];      
  tags: string[];             

  highlights: string[];      
  inclusions: string[];
  exclusions: string[];

  gallery: string[];    
  rating : number;
  totalRatings : number;
   faq?: {
    question: string;
    answer: string;
  }[];  


  metaTitle?: string;
  metaDescription?: string;

  relatedPackages?: mongoose.Types.ObjectId[]; 

  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    location: {
      city: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      area: { type: String, trim: true },
    },

    duration: {
      label: { type: String, required: true },
      hours: { type: Number },
      days: { type: Number },
    },

    price: {
      base: { type: Number, required: true },
      sale: { type: Number },
      currency: { type: String, default: "AED" },
    },
    faq: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

    categories: [{ type: String }],
    tags: [{ type: String }],

    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],

    gallery: [{ type: String }],

    metaTitle: { type: String },
    metaDescription: { type: String },

    relatedPackages: [
      { type: Schema.Types.ObjectId, ref: "TourPackage" },
    ],
  },
  {
    timestamps: true, 
  }
);



const Activity =
  models.Activity || model<IActivity>("Activity", ActivitySchema);

export default Activity;
