import mongoose from "mongoose";

// how our document look like
const bigformschema = mongoose.Schema(
  {
    email: String,
    status: String,
    propertyType: String,
    street: String,
    unit: String,
    streetName: String,
    streetSuffix: String,
    city: String,
    state: String,
    zipCode: String,
    listPrice: String,
    bedrooms: String,
    bathrooms: String,
    finishedsqft: String,
    acres: String,
    publicRemarks: String,
    imagePath: String,
  },
  {
    timestamps: true,
  }
);

// we need to turn it into a model
const bigformSch = mongoose.model("bigform", bigformschema);

export default bigformSch;
