const productModel = require("./models/model");
const createproduct = async (title, price) => {
  console.log("Create Product");
  let product = new productModel();
  product.title = title;
  product.price = price;
  await product.save();
  return product;
};
const updateproduct = async (_id, title,price) => {
  let product = await productModel.findById(_id);
  product.title = title;
  product.price = price;
  await product.save();
  return product;
};
const getAllproduct = async () => {
  let product = await productModel.find();
  return product;
};
const deleteproduct= async (_id) => {
  let product = await productModel.findByIdAndDelete(_id);
  return product;
};
const getproductById = async (_id) => {
  let product = await productModel.findById(_id);
  return product;
};
module.exports.createproduct= createproduct;
module.exports.getAllproduct= getAllproduct;
module.exports.deleteproduct= deleteproduct;
module.exports.updateproduct = updateproduct;
module.exports.getproductById = getproductById;