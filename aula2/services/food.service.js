"use strict";

const { get } = require("http");

module.exports = {
  name: "food",
  actions: {
    async get() {
      
      return await this.get()
    },
    async categories() {

      return await this.getCategories()
    },
    async filter({params}) {
   
      const { name } = params

      const result = await  this.get()
      const filtered = result.filter(value => value.category.toLowerCase().includes(name.toLowerCase()))
      return filtered
    },
 
  },
  methods:{
    async get(){
      const categories = await this.getCategories()

      const result = await new Promise((resolve, reject) => {
        get("http://taco-food-api.herokuapp.com/api/v1/food", (res) => {
          let dataRaw = "";
          res.on("data", (value) => (dataRaw += value));
	        res.on('error', ( error ) => reject(error))	
          res.on("end", () => {
            const result = JSON.parse(dataRaw)
            const obj = result.map(item =>{
              const { id , description }  = item
              const { category } = categories.find(value => value.id === item.category_id)
              return { id , description, category } 
            })
            resolve(obj)
          });
        });
      });

      return result
    },
    async getCategories(){
      const result = await new Promise((resolve, reject) => {
        get("http://taco-food-api.herokuapp.com/api/v1/category", (res) => {
          let dataRaw = "";
          res.on("data", (value) => (dataRaw += value));
	  res.on('error', ( error ) => reject(error))	
          res.on("end", () => resolve(JSON.parse(dataRaw)));
        });
      });
      return result;
    }
  }
};
