import mongoose from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  guests : number;
  arrivalDate : string;
  comments:string;
  pageUrl : string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    guests: { type: Number },
    arrivalDate: { type: String},

    comments: { type: String },

    pageUrl: { type: String, required: true }, // hidden field
  },
  { timestamps: true }
);


const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
