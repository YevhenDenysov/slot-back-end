const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const { createServer } = require("http");
const { Contract, providers, utils } = require("ethers");
const contracts = require("./contract/abi.json");
const connectDB = require("./config/db");
const SaveLives = require('./routes/saveLive')
const httpServer = createServer(app);

require("dotenv").config();
// Connect to Database
connectDB();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Initialize Middleware
app.use(express.json({ strict: false }));

app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use("/api/live", require("./routes/api/liveRecord"));

// Set Static Folder
// app.use(express.static(__dirname + "/build"));
// app.get("/*", function (req, res) {
//   res.sendFile(__dirname + "/build/index.html", function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

const PORT = process.env.PORT || 5000;

const provider = new providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s2.binance.org:8545"
);

const slotContract = new Contract(
  contracts.slotContract.address,
  contracts.slotContract.abi,
  provider
);

const slotListener = async (
  playerAddress,
  wager,
  payout,
  tokenAddress,
  slotIds,
  multipliers,
  payouts,
  numGames,
  event
) => {
  try {
    console.log("------------------------slotListener--------------");
    console.log("playerAddress", playerAddress);
    console.log("wager", utils.formatEther(wager));
    console.log("payout", utils.formatEther(payout));
    console.log("tokenAddress", tokenAddress);
    console.log("slotIdlength", slotIds.length);
    console.log("multipliersLength", multipliers.length);
    console.log("payoutsLength", payouts.length);
    console.log("numGames", numGames);
    console.log("EventHash", event.transactionHash)

    SaveLives({
      transaction: event.transactionHash,
      playerAddress: playerAddress,
      wager: utils.formatEther(wager),
      numbets: slotIds.length,
      multiplier: utils.formatEther(payout) / (utils.formatEther(wager) * slotIds.length),
      profit: utils.formatEther(payout) - utils.formatEther(wager) * slotIds.length,
    });
  } catch (err) {
    console.log(err);
  }
};

const InitializeContract = async () => {
  console.log("------------------InitializeContract-------------------------");
  slotContract.on("Slots_Outcome_Event", slotListener);
};

InitializeContract();

httpServer.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
