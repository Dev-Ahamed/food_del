import mongoose from "mongoose";

// mongodb+srv://Ahamed:Ahamed@cluster0.zwmohzg.mongodb.net/?

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Ahamed:Ahamed@cluster0.zwmohzg.mongodb.net/foodDelivery"
    )
    .then(() => console.log("DB Connected"));
};
