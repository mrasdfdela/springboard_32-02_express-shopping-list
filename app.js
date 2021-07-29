const express = require('express');
const morgan = require('morgan');
const ExpressError = require('./expressError');
const items = require('./fakeDb');
const fs = require('fs');

const app = express();
app.use(express.json());
// app.use(morgan('dev'));

app.get('/',function(req, res, next){
  return res.send("<h1>Welcome to ShopRite of Jerryville!</h1>");
});

app.get("/items", function (req, res, next) {
  try {
    if (!items) {
      throw new ExpressError("Unable to read data", 400);
    } else {
      return res.json(items);
    }
  } catch (e) {
    return next(e);
  }
});

app.post("/items", function (req, res, next) {
  try {
    if (Object.keys(req.body).length == 0) {
      throw new ExpressError("No data sent", 400);
    } else {
      newItem = req.body;
      items.push(newItem);
      return res.status(201).json({ added: newItem });
    }
  } catch (e) {
    return next(e);
  }
});

app.get("/items/:name", function (req, res, next) {
  try {
    filteredItems = items.filter((el) => el.name === req.params.name)
    if (filteredItems.length === 0) {
      throw new ExpressError("Unable to read data", 400);
    } else {
      item = filteredItems;
      return res.json(item);
    }
  } catch (e) {
    return next(e);
  }
});

app.patch("/items/:name", function (req, res, next) {
  try {
    filteredItems = items.filter((el) => el.name === req.params.name);
    if (filteredItems.length === 0) {
      throw new ExpressError("Unable to read data", 400);
    } else {
      item = items.filter((el) => el.name === req.params.name);
      if (req.body.name) {
        item[0].name = req.body.name;
      }
      if (req.body.price) {
        item[0].price = req.body.price;
      }
      return res.json({ updated: item });
    }
  } catch (e) {
    return next(e);
  }
});

app.delete("/items/:name", function (req, res, next) {
  item = items.filter((el) => el.name === req.params.name);

  try {
    if (item.length === 0) {
      throw new ExpressError("Unable to read data", 400);
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

app.use(function(err, req, res, next){
  let status = err.status || 500;
  let msg = err.msg;
  return res.status(status).json({
    error: {msg, status}
  })
})
module.exports = app;