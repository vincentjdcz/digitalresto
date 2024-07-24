const express = require("express");

const Model = require("../models/model");

const router = express.Router(); //creates an Express Router object which we can use to define route handlers for HTTP requests

//NOTE: Should have named Model "Orders"

//POST New Order
router.post("/addOrder", async (req, res) => {
  const data = new Model({
    orderId: req.body.orderId,
    item: req.body.item,
    price: req.body.price,
  });

  try {
    const dataToSave = await data.save(); //save data to database. A promise that resolves to the saved document (remember, a document is an entry in mongoDB database) is returned to dataToSave
    res.status(200).json(dataToSave); //response to req. Status is set to 200 (OK) and the newly created document (dataToSave) is attached to the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET All Orders
router.get("/getAllOrders", async (req, res) => {
  try {
    const data = await Model.find(); //by default, when no args are passed to find() it will retrieve all documents from this Model's collection
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE Order by orderId
router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.deleteOne({ orderId: id });
    res.send(`Document with orderId: ${id} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; //export router object for use in other files
