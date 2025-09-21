
const mongoose = require('mongoose');
const Sweets = require('../models/sweets');

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity = 0 } = req.body;

    // Basic validation
    if (!name || !category || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Required fields: name, category, price"
      });
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity || 0);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ success: false, message: "Price must be a non-negative number" });
    }
    if (Number.isNaN(numericQuantity) || numericQuantity < 0) {
      return res.status(400).json({ success: false, message: "Quantity must be a non-negative number" });
    }

    const isAlreadyAvailable = await Sweets.findOne({ name: name.trim() });
    if (isAlreadyAvailable) {
      return res.status(409).json({
        success: false,
        message: "This sweet already exists"
      });
    }

    const created = await Sweets.create({
      name: name.trim(),
      category: category.trim(),
      price: numericPrice,
      quantity: numericQuantity
    });

    return res.status(201).json({
      success: true,
      message: "Sweet added successfully",
      data: created
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || String(error)
    });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const data = await Sweets.find();
    return res.status(200).json({
      success: true,
      message: "All sweets fetched successfully",
      count: data.length,
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || String(error)
    });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    console.log("Query params:", req.query);
    const { name, category, lowPrice, highPrice } = req.query;
    const filter = {};
    if (name && name.trim() !== "") {
      filter.name = { $regex: name.trim(), $options: "i" };
    }
    if (category && category.trim() !== "") {
      filter.category = { $regex: category.trim(), $options: "i" };
    }
    const priceFilter = {};
    if (lowPrice != null && lowPrice !== "") {
      const lp = Number(lowPrice);
      if (Number.isNaN(lp)) {
        return res.status(400).json({ success: false, message: "lowPrice must be a number" });
      }
      priceFilter.$gte = lp;
    }
    if (highPrice != null && highPrice !== "") {
      const hp = Number(highPrice);
      if (Number.isNaN(hp)) {
        return res.status(400).json({ success: false, message: "highPrice must be a number" });
      }
      priceFilter.$lte = hp;
    }
    if (Object.keys(priceFilter).length > 0) {
      filter.price = priceFilter;
    }

    console.log("Filter applied:", filter);
    const sweets = await Sweets.find(filter);

    return res.status(200).json({
      success: true,
      message: "Search results",
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || String(error)
    });
  }
};



exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Valid sweet id is required" });
    }

    const { name, category, price, quantity } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = String(name).trim();
    if (category !== undefined) updateFields.category = String(category).trim();
    if (price !== undefined) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ success: false, message: "Price must be a non-negative number" });
      }
      updateFields.price = numericPrice;
    }
    if (quantity !== undefined) {
      const numericQuantity = Number(quantity);
      if (Number.isNaN(numericQuantity) || numericQuantity < 0) {
        return res.status(400).json({ success: false, message: "Quantity must be a non-negative number" });
      }
      updateFields.quantity = numericQuantity;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: "At least one field (name, category, price, quantity) must be provided to update" });
    }

    const updated = await Sweets.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Details updated successfully",
      data: updated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || String(error)
    });
  }
};

exports.removeSweet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting sweet with id:", id); 
    if (!id) {
      return res.status(400).json({ success: false, message: "Valid sweet id is required to delete" });
    }
    const deleted = await Sweets.findOneAndDelete({sweetId: id});
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Sweet removed successfully",
      data: deleted
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || String(error)
    });
  }
};
