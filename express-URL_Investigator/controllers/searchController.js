
const Searches = require("../models/searches");
const Results = require("../models/results");
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch');
require('dotenv').config();



exports.url_create_post = [
  asyncHandler(async (req, res, next) => {
    const searchResult = await Searches.findOne({ url: req.body.search }).exec();

    if (searchResult) {
      const result = await Results.findOne({ url: req.body.search }).exec();
      res.render('results', { result });
    } else {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-apikey': process.env.API_KEY
        }
      };

      const response = await fetch('https://www.virustotal.com/api/v3/domains/' + req.body.search, options);
      const data = await response.json();
      const threatScore = JSON.stringify(data['data']['attributes']['last_analysis_stats']);

      const newResult = new Results({
        url: req.body.search,
        virusTotal: threatScore,
        threatScore: threatScore
      });


      await newResult.save();
      res.render('results', { result: newResult });
    }
  })
];
          