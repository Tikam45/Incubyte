const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model("Counter", CounterSchema);

const SweetSchema = new mongoose.Schema({
  sweetId: { type: Number, unique: true, index: true },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Indian", "Foreign"],
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  }
});

SweetSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "sweetId" },         
      { $inc: { seq: 1 } },        
      { new: true, upsert: true }  
    );
    this.sweetId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Sweet", SweetSchema);
