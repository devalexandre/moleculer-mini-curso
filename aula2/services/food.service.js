"use strict";

const { get } = require("http");

module.exports = {
  name: "food",
  actions: {
    async get() {
      const result = await new Promise((resolve, reject) => {
        get("http://taco-food-api.herokuapp.com/api/v1/food", (res) => {
          let dataRaw = "";
          res.on("data", (value) => (dataRaw += value));
	  res.on('error', ( error ) => reject(error))	
          res.on("end", () => resolve(JSON.parse(dataRaw)));
        });
      });

      return result;
    },
  },
};
