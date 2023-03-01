const Live = require('../models/liveBets');

const SaveLives = async({transaction,playerAddress,wager,numbets,multiplier,profit} ) => {
    try{
        console.log("------------saveLives-------------");
        console.log("transaction", transaction);
        console.log("playerAddress", playerAddress);
        console.log("wager", (wager));
        console.log("numbets", (numbets));
        console.log("multiplier", multiplier);
        console.log("profit", profit);

        const newLive = new Live({
            transaction: transaction,
            playAddress: playerAddress,
            wager: Number(wager).toFixed(2),
            numbets: numbets,
            multiplier: Number(multiplier).toFixed(2),
            profit: Number(profit).toFixed(2)
        });
        newLive.save();
    } catch(err){
        console.log(err);
    }
}

module.exports = SaveLives;