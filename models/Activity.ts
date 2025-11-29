import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IActivity extends Document {
  title: string;
  slug: string;
 
  description: string;

  location: string;
  city: string;
  country: string;

  duration : number;
  price: number;
  discountPrice?: number;

  categories: string;      
  tags: string[];             

  highlights: string[];      
  inclusions: string[];
  exclusions: string[];
  

  gallery: string[];  

  rating : number;

  itinerary: {
    title : string;
    description : string;
  }[],

  totalRatings : number;
   faq?: {
    question: string;
    answer: string;
  }[];  


  metaTitle?: string;
  metaDescription?: string;


  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    description: { type: String, required: true },

    location: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    rating : {
      type : Number,
      required : true,
    },
    itinerary: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ]
    ,
    totalRatings : {
      type : Number,
      required : true
    },

    country: {
      type: String,
      required: true,
    },

    duration : {
      type : Number,
      required : true
    },

    price : {
      type : Number,
      required : true
    },

    discountPrice : {
       type : Number,
       required : true
    },
    
    faq: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

    categories: { type: String },
    tags: [{ type: String }],

    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],

    gallery: [{ type: String }],

    metaTitle: { type: String },
    metaDescription: { type: String },

   
  },
  {
    timestamps: true, 
  }
);



const Activity =
  models.Activity || model<IActivity>("Activity", ActivitySchema);

export default Activity;
