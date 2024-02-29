

const Results = require("../models/results");
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch');
require('dotenv').config();

const { streamGenerateContent } = require('../test_VertexAI_API_Call.js');

s
exports.add_comment = [
  asyncHandler(async (req, res, next) => {
    const filter = { url: req.body.search }; // find doc for searched url
    const currentDate = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    const update = { $push: { comments: currentDate + ": " + req.body.comment } }; // append comment to comments array

    // `doc` is the document _before_ `update` was applied
    let doc = await Results.updateOne(filter, update).exec();

    // render page with updated comment
    const result = await Results.findOne({ url: req.body.search }).exec();

    res.render('results', { result: result });
  })
];


exports.url_create_post = [
  asyncHandler(async (req, res, next) => {
    const searchResult = await Results.findOne({ url: req.body.search }).exec();

    if (searchResult) {
      const result = await Results.findOne({ url: req.body.search }).exec();
      res.render('results', { result: result });
   

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

      const aiOutput = await streamGenerateContent(req.body.search);

      


      const newResult = new Results({
        url: req.body.search,
        threatScoreHarmless: threatScoreHarmlessInstance,
        threatScoreMalicious: threatScoreMaliciousInstance,
        threatScoreSuspicious: threatScoreSuspiciousInstance,
        threatScoreUndetected: threatScoreUndetectedInstance,
        genAI: aiOutput
      });


      await newResult.save();

      const result = await Results.findOne({ url: req.body.search }).exec();
    
      res.render('results', { result: result });
    }
    
  })
];