import { Schema, Document, model, models } from "mongoose";

interface DurationType {
  days: number;
  nights: number;
  breakdown: {
    location: string;
    days: number;
  }[];
}

export interface TourPackage extends Document {
  title: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  duration: DurationType; 
  price: number;
  discountPrice?: number;
  description: string;

  highlights: string[];

  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];

  inclusions: string[];
  exclusions: string[];

  gallery: string[];

  rating: number;
  totalRatings :  number;

  faqs?: {
    title: string;
    question: string;
    answer: string;
  }[];
  published : boolean;
  publishedAt : Date;

  createdAt: Date;
  updatedAt: Date;
}

const TourPackageSchema = new Schema<TourPackage>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

   duration: {
    days: Number,
    nights: Number,
    breakdown: [
      {
        location: String,
        days: Number
      }
     ]
    },


    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    highlights: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    inclusions: [
      {
        type: String,
        required : true
        
      },
    ],

    exclusions: [
      {
        type: String,
        required : true
      },
    ],

    gallery: [
      {
        type: String,
        required : true
        
      },
    ],

    rating: {
      type: Number,
      default: 0,
      required : true
    },
    totalRatings : {
      type : Number,
      default : 0,
      required : true
    }
    ,

    faqs: [
      {
        title: { type: String },
        question: { type: String },
        answer: { type: String },
      },
    ],

    published : {
        type : Boolean ,
        default : false
      }
      ,

      publishedAt : {
          type : Date,
          default : null
      }
  },

  { timestamps: true }
);

export const TourPackage =
  models.TourPackage || model<TourPackage>("TourPackage", TourPackageSchema);
