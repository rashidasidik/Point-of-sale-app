const Item = require("../models/itemsModel");

//add new item to db
async function addNewItem(req, res) {
  try {
    const newitem = await Item.create({
      name: req.body.name,
      costPrice: req.body.costPrice,
      sellPrice: req.body.sellPrice,
      qnty: req.body.qnty,
    });
    res.status(201).json(newitem);
  } catch (error) {
    throw new Error("not save");
  }
}

//get all items from db
const getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

//get a single item by NAME
const getAnItem = async (req, res) => {
  const item = await Item.findOne({ name: req.params.name });
  if (item) {
    res.json(item);
  } else {
    throw new Error(res.status(404).json("item not found"));
  }
};

//delete a single item
async function deleteItem(req, res) {
  const item = await Item.findById(req.params._id);
  if (!item) {
    throw new Error("item not found");
  } else {
    const deletedItem = await item.remove();
    res.json(`${deletedItem.name} removed successfully`);
  }
}

//update an item
const updateItem = async (req, res) => {
  const item = await Item.findById(req.params._id);
  const { name, costPrice, sellPrice, qnty } = req.body;
  if (item) {
    item.name = name ? name : item.name;
    item.costPrice = costPrice ? costPrice : item.costPrice;
    item.sellPrice = sellPrice ? sellPrice : item.sellPrice;
    item.qnty = qnty ? qnty : item.qnty;

    const updatedItem = await item.save();
    return res.json(`${updatedItem.name} updated successfully`);
  } else {
    return res.json("oops!! something went wrong");
  }
};

module.exports = {
  addNewItem,
  getAllItems,
  getAnItem,
  deleteItem,
  updateItem,
};
