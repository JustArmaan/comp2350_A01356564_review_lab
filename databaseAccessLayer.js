const database = include("/databaseConnection");

async function getItems() {
  let sqlQuery = `
        SELECT purchase_item_id, item_name, item_description, cost, quantity
        FROM purchase_item;
    `;

  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select restaurant table");
    console.log(err);
    return null;
  }
}

async function addItem(postData) {
  console.log("postData: ", postData);

  let sqlInsertRestaurant = `
        INSERT INTO purchase_item (item_name, item_description, cost, quantity)
        VALUES (:item_name, :item_description, :cost, :quantity);
    `;

  let params = {
      item_name: postData.item_name,
      item_description: postData.description,
      cost: parseFloat(postData.cost),
      quantity: parseFloat(postData.quantity),
  };

  console.log(sqlInsertRestaurant);

  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteItem(itemID) {
  let sqldeleteItem = `
        DELETE FROM purchase_item
        WHERE purchase_item_id = :itemID
    `;
  let params = {
    itemID
  };
  console.log(sqldeleteItem);
  try {
    await database.query(sqldeleteItem, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function addQuantity(itemID) {
  let sqlUpdateQuantity = `
        UPDATE purchase_item
        SET quantity = quantity + 1
        WHERE purchase_item_id = :itemID;
    `;
  let params = {
    itemID
  };

  try {
    await database.query(sqlUpdateQuantity, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function removeQuantity(itemID) {
  let sqlUpdateQuantity = `
        UPDATE purchase_item
        SET quantity = CASE WHEN quantity > 0 THEN quantity - 1 ELSE 0 END
        WHERE purchase_item_id = :itemID;
    `;
  let params = {
    itemID
  };

  try {
    await database.query(sqlUpdateQuantity, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
  addQuantity,
  removeQuantity
};


// async function deleteReview(reviewId) {
//   let sqlDeleteRestaurant = `
//         DELETE FROM review
//         WHERE review_id = :reviewId
//     `;
//     let params = {
//       reviewId: reviewId,
//     };
//   console.log(sqlDeleteRestaurant);
//   try {
//     await database.query(sqlDeleteRestaurant, params);
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }
// addReview

// async function addReview(postData) {
//   console.log("postData: ", postData);
//   let sqlInsertRestaurant = `
//         INSERT INTO review ( restaurant_id, reviewer_name, details, rating)
//         VALUES (:restaurant_id, :name, :review, :rating);
//     `;
//   let params = {
//     restaurant_id: postData.restaurant_id,
//     name: postData.name,
//     review: postData.review,
//     rating: postData.rating
//   };
//   console.log(sqlInsertRestaurant);
//   try {
//     const results = await database.query(sqlInsertRestaurant, params);
//     let insertedID = results.insertId;

//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }

