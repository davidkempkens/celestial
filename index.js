const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;


app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
