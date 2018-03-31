let faker = require('faker');
let db = require('./index');
let Recipe = db.Recipe;
let mongoose = require('mongoose');
let num = process.argv[2] || 50;

// run this file in node to generate seeds
// it will default to 50 seeds, please specify an argument for more or less seeds:
// ex: node models/seeds.js 30

let recipeOperations = [];

for( let i = 0; i < num; i++ ){
    recipeOperations.push(seedRecipeAsync());
};

Promise.all(recipeOperations)
    .then( () => Recipe.count() )
    .then( (count) => {
        console.log(`All done. Seeded ${num} recipes. Total recipes now total ${count}`);
        mongoose.connection.close();
        process.exit();
    })
    .catch( (err) => console.error(err) );

function seedRecipeAsync() {
    return new Promise( (resolve, reject) => {
        Recipe.create({
            title: faker.commerce.product(),
            description: faker.company.bs(),
            author: `${faker.name.firstName()} ${faker.name.lastName()}`,
            ingredients: [
                faker.commerce.color(),
                faker.commerce.productMaterial(),
                faker.commerce.productName(),
            ],
            steps: [
                faker.hacker.phrase(),
                faker.company.catchPhrase(),
                faker.lorem.sentence(),
            ]
        })
        .then( () => resolve() )
        .catch( err => reject(err) )
    })
}