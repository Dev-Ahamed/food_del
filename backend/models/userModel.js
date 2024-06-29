import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
); // if not specify minimize:false, the cart data will not created without any data

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
