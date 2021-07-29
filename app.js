const express = require('express');
const ExpressError = require('./expressError');
const items = require('./fakeDb');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/',function(req, res, next){
  return res.send("<h1>Welcome to ShopRite of Jerryville!</h1>");
});

app.get("/items", function (req, res, next) {
  try {
    if (!items) {
      throw newExpressError("Unable to read data", 400);
    } else {
      return res.json(items);
    }
  } catch (e) {
    return next(e);
  }
});

app.post("/items", function (req, res, next) {
  try {
    if (!req.body) {
      throw newExpressError("No data sent", 400);
    } else {
      newItem = req.body;
      items.push(newItem);
      return res.json({"added": newItem});
    }
  } catch (e) {
    return next(e);
  }
});

app.get("/items/:name", function (req, res, next) {
  try {
    if (!items.filter((el) => el.name === req.params.name)) {
      throw newExpressError("Unable to read data", 400);
    } else {
      item = items.filter((el) => el.name === req.params.name);
      return res.json(item);
    }
  } catch (e) {
    return next(e);
  }
});

app.patch("/items/:name", function (req, res, next) {
  try {
    if (!items.filter((el) => el.name === req.params.name)) {
      throw newExpressError("Unable to read data", 400);
    } else {
      item = items.filter((el) => el.name === req.params.name);
      if (req.body.name) { item[0].name = req.body.name }
      if (req.body.price){ item[0].price = req.body.price }
      return res.json({ updated: item });
    }
  } catch (e) {
    return next(e);
  }
});

app.delete("/items/:name", function (req, res, next) {
  try {
    if (!items.filter((el) => el.name === req.params.name)) {
      throw newExpressError("Unable to read data", 400);
    } else {
      items.forEach( (item,idx)=>{
        if (item.name === req.params.name) {
          items.splice(idx,1)
        }
      });
      return res.json({ "message":"deleted" });
    }
  } catch (e) {
    return next(e);
  }
});

app.listen(3000, function(req,res){
  console.log('Routing and Middleware Exercise');
});