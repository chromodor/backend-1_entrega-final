const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  status: Boolean,
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
