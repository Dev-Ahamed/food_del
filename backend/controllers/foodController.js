import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.json({ success: false, message: "Error: Product not added" });
  }
};

// Retreive All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id); // Find the food item with an id
    fs.unlink(`uploads/${food.image}`, () => {}); // Delete image from uploads folder
    await foodModel.findByIdAndDelete(req.body.id); // Delete document from database
    res.json({ success: true, message: "Food Item Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
