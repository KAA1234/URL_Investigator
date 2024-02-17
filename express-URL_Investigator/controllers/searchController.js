
const Results = require("../models/results");
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch');
require('dotenv').config();



exports.url_create_post = [
  asyncHandler(async (req, res, next) => {
    const searchResult = await Results.findOne({ url: req.body.search }).exec();

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
      const threatScoreHarmlessInstance = JSON.stringify(data['data']['attributes']['last_analysis_stats']['harmless']);
      const threatScoreMaliciousInstance = JSON.stringify(data['data']['attributes']['last_analysis_stats']['malicious']);
      const threatScoreSuspiciousInstance = JSON.stringify(data['data']['attributes']['last_analysis_stats']['suspicious']);
      const threatScoreUndetectedInstance = JSON.stringify(data['data']['attributes']['last_analysis_stats']['undetected']);


      const newResult = new Results({
        url: req.body.search,
        threatScoreHarmless: threatScoreHarmlessInstance,
        threatScoreMalicious: threatScoreMaliciousInstance,
        threatScoreSuspicious: threatScoreSuspiciousInstance,
        threatScoreUndetected: threatScoreUndetectedInstance
      });


      await newResult.save();
      res.render('results', { result: newResult });
    }
  })
];
