const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send(`<h3>Express server is running...<h3>`);
})

app.listen(PORT, () => {console.log(`listening to port ${PORT}...`)});