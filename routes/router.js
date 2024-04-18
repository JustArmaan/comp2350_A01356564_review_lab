const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');
//getRestaurants, addRestaurant, deleteRestaurant
router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getItems();
    let cost = 0;
    
    for (const item of result) {
      if (parseFloat(item.cost) != NaN) {
          for (let index = 0; index < item.quantity; index++) {
              cost += parseFloat(item.cost);
          }
      }
  }
  console.log(result)
  res.render("index", { result, cost })

  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/addItem", async (req, res) => {
  console.log(req.body);
  try {
    const success = await dbModel.addItem(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/deleteItem", async (req, res) => {
  console.log(req.query);
  let itemID = req.query.id;
  if (itemID) {
    const success = await dbModel.deleteItem(itemID);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});


router.get("/addQuantity", async (req, res) => {
  try {
    const itemID = req.query.id;
    const success = await dbModel.addQuantity(itemID);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error updating quantity in MySQL" });
      console.log("Error updating quantity in MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error updating quantity in MySQL" });
    console.log("Error updating quantity in MySQL");
    console.log(err);
  }
});

router.get("/removeQuantity", async (req, res) => {
  try {
    const itemID = req.query.id;
    const success = await dbModel.removeQuantity(itemID);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error updating quantity in MySQL" });
      console.log("Error updating quantity in MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error updating quantity in MySQL" });
    console.log("Error updating quantity in MySQL");
    console.log(err);
  }
});

module.exports = router;
