const express = require('express');
const app = express();

app.use(() => {
    console.log("new request")
})

app.listen(3000, () => {
    console.log('listing on port 3000')
})

app.get('', function(req, res) {
    res.send("hello world")
})