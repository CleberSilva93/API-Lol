const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser')

module.exports = () => {

    const app = express();
    
    app.use(bodyParser.json({strict: true}));
    app.use(bodyParser.urlencoded({extended: true}));

    consign()
        .include('controllers')
        .into(app)

    return app;
}
    
