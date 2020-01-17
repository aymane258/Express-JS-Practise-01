var express = require('express');
var router = express.Router();

const fs = require('fs');
let data;
fs.readFile('products.json','utf-8',(err,products) => {
if(err)
throw err;
data =JSON.parse(products);

})

/* GET products listing. */
router.get('/', function(req, res, next) {
res.json(data)
});

router.get('/:id([A-Z]{3}-[0-9]{2})',(req , res , next )=> {

  res.json(data.products.filter(product =>  product.id == req.params.id
  ))
})

router.delete('/:id([A-Z]{3}-[0-9]{2})',(req,res,next) => {
 let newProducts = data.products.filter((product) => product.id != req.params.id);

 fs.writeFile('products.json',JSON.stringify(newProducts),() =>{
  res.send(`Product met id ${req.params.id} is verwijderd`)
 });
})
module.exports = router;
