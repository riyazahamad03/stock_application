const mongoose = require("mongoose");
const Stock = require("../Models/stock");

exports.display_all = (req, res, next) => {
  Stock.find()
    .exec()
    .then((docs) => {
      const resp = {
        items: docs.map((doc) => {
          return {
            id: doc._id,
            name: doc.name,
            lower: doc.lower,
            upper: doc.upper,
            isTransacted: doc.isTransacted,
          };
        }),
      };
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.stock_create = (req, res, next) => {
  console.log(req.body);
  const stock = new Stock({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lower: req.body.lower,
    upper: req.body.upper,
    isTransacted: "N",
  });

  stock
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created Stock Successfully",
        createdStock: {
          id: result._id,
          name: result.name,
          lower: result.lower,
          upper: result.upper,
          isTransacted: "N",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_stock = (req, res, next) => {
  const id = req.params.stock_id;
  Stock.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateStock = async (req, res, next) => {
  const id = req.params.stock_id;

  try {
    const selectedStock = await Stock.findById(id);
    if (!selectedStock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    selectedStock.isTransacted = "Y";
    selectedStock.save();
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
