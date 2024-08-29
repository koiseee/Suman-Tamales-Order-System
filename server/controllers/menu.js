const Item = require("../models/Item");

exports.allMenu = (req, res, next) => {
  Item.findAll()
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Emergency Hotline available",
        });
      }

      const all_menu = data.map((item) => ({
        id: item.id,
        food_name: item.food_name,
        price: item.price,
        item_img: item.item_img,
      }));

      return res.status(200).json({
        success: true,
        all_menu,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.seedMenu = () => {
  Item.findAll()
    .then((existingData) => {
      if (existingData.length === 0) {
        const initialData = [
          { food_name: "Suman", price: 7, item_img: "suman-data.jpg" },
          { food_name: "Tamales", price: 12, item_img: "tamales.png" },
          { food_name: "Carioca", price: 10, item_img: "karioka.jpg" },
          { food_name: "Suman Daleng", price: 12, item_img: "daleng.jpg" },
          { food_name: "Pinindot", price: 10, item_img: "pinindot.png" },
          { food_name: "Sinukmani", price: 15, item_img: "sinukmani.jpg" },
          { food_name: "Kutsinta", price: 7, item_img: "kutsinta.jpg" },
          { food_name: "Atsara", price: 25, item_img: "atsara.jpg" },
          { food_name: "Buchi-Buchi", price: 5, item_img: "buchi.jpg" },
          { food_name: "Pichi-pichi", price: 10, item_img: "pichi.jpg" },
        ];

        return Item.bulkCreate(initialData, { validate: true })
          .then(() => {
            console.log("Menu data seeded successfully.");
          })
          .catch((error) => {
            console.error("Error seeding Menu data:", error);
          });
      } else {
        console.log("Menu data already exists. Skipping seeding.");
      }
    })
    .catch((error) => {
      console.error("Error checking existing Menu data:", error);
    });
};
