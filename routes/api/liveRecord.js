const express = require("express");
const router = express.Router();

const Live = require("../../models/liveBets");

router.get('/getLives',async(req,res) => {
  try{
    console.log("-----------getLives-----------");
    const result = await Live.find();
    res.json(result);
  } catch(err){
    console.log(err);
  }
})

module.exports = router;
