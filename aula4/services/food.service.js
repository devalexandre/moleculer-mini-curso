"use strict";

const { get } = require("http");

module.exports = {
  name: "food",
  actions: {
    async get() {
      const [ foods  , categories] = await Promise.all([this.getFood(), this.getCategories()])
      
      return foods.map(food =>({
        id: food.id,
        description: food.description,
        category: categories.find(category => category.id === food.category_id).category
      }));
    },

    async categories() {
      return await this.getCategories()
    }
  },
  methods :{
    async getCategories() {

      const result = await new Promise((resolve, reject) => {
        get("http://taco-food-api.herokuapp.com/api/v1/category", (res) => {
          let dataRaw = "";
          res.on("data", (value) => (dataRaw += value));
          res.on('error', ( error ) => reject(error))
          res.on("end", () => resolve(JSON.parse(dataRaw)));
        });
      });

      return result;

    },

    async getFood() {
      const result = await new Promise((resolve, reject) => {
        get("http://taco-food-api.herokuapp.com/api/v1/food", (res) => {
          let dataRaw = "";
          res.on("data", (value) => (dataRaw += value));
          res.on('error', (error) => reject(error))
          res.on("end", () => resolve(JSON.parse(dataRaw)));
        });
      });

      return result;
    },
  }
};
