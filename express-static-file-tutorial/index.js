const express = require('express');
const app = express();
const PORT = 5501;



app.get('/index.html', (req, res) => {
    app.use(express.static('public'));
});

app.get('/investigate', (req, res) => {
    const { q } = req.query; 
    res.send(`<h1>investigating ${q}</h1>`);
});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));