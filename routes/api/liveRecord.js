const express = require("express");
const router = express.Router();

const Live = require("../../models/liveBets");

router.get('/getLives',async(req,res) => {
  try{
    console.log("-----------getLives-----------");
    const result = await Live.find();
    let response = [];
    for(let i = 0 ; i < result.length ;i++){
      const _response= {
        transaction: result[i].transaction,
        date: result[i].date,
        playAddress:result[i].playAddress,
        wager:result[i].wager,
        numbets:result[i].numbets,
        multiplier:result[i].multiplier,
        profit:result[i].profit
      }
      response.push(_response);
    }
    res.json(response);
  } catch(err){
    console.log(err);
  }
})

module.exports = router;
