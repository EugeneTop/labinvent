const express = require('express');
const wifi = require('node-wifi');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require("jsonwebtoken");
const ip = require('ip');

const app = express();
let url = "mongodb://localhost:27017/mydb";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

process.env.SECRET_KEY = "mybadasskey";

app.get('/', (req, res) => {
    wifi.init({
        iface : null
    });
    wifi.scan(function(err, networks) {
        if (err) {
            console.log(err);
        } else {
            res.send(networks);
        }
    });
});

app.post('/ethernet', (req, res) => {
    let ips, mask, PrefDNS, ipAdress, adressDNS;
    if(req.body.ip === ""){
        ips = ip.address();
        mask = "255.255.255.0";
        ipAdress = false;
    }else{
        ips = req.body.ip;
        mask = req.body.mask;
        ipAdress = true;
    }
    if(req.body.prefDNS === ""){
        PrefDNS = "8.8.8.8";
        adressDNS = false;
    }else{
        PrefDNS = req.body.prefDNS;
        adressDNS = true;
    }
    let Ethernet = {
        ip: ips,
        mask: mask,
        gateway: req.body.gateway,
        prefDNS: PrefDNS,
        altDNS: req.body.altDNS,
        token: '',
        ipAdress: ipAdress,
        adressDNS: adressDNS
    }
    let token = jwt.sign(Ethernet, process.env.SECRET_KEY, {
        expiresIn: 4000
    });
    Ethernet.token = token;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("Ethernet").insertOne(Ethernet, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
    res.send(Ethernet.token);
})

app.get('/ip', (req, res) => {
    let ips = ip.address();
    let mask = "255.255.255.0";
    let PrefDNS = "8.8.8.8";
    res.send(ips);
})

app.post('/Wifi', (req, res) => {
    let ips, mask, PrefDNS, ipAdress, adressDNS, flagName, flagSecurity;
    if(req.body.ip === ""){
        ips = ip.address();
        mask = "255.255.255.0";
        ipAdress = false;
    }else{
        ips = req.body.ip;
        mask = req.body.mask;
        ipAdress = true;
    }
    if(req.body.prefDNS === ""){
        PrefDNS = "8.8.8.8";
        adressDNS = false;
    }else{
        PrefDNS = req.body.prefDNS;
        adressDNS = true;
    }
    if(req.body.name === ""){
        flagName = false;
    }else{
        flagName = true;
    }
    if(req.body.securityKey === ""){
        flagSecurity = false;
    }else{
        flagSecurity = true;
    }
    let wifi = {
        wifiName: req.body.name,
        securityKey: req.body.securityKey,
        ip: ips,
        mask: mask,
        gateway: req.body.gateway,
        prefDNS: PrefDNS,
        altDNS: req.body.altDNS,
        token: req.body.token,
        ipAdress: ipAdress,
        adressDNS: adressDNS, 
        flagSecurity:flagSecurity,
        name: flagName
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("wifi").insertOne(wifi, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
})

app.get('/ethernet/:token', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("Ethernet").find({token: req.params.token}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
})

app.get('/wifi/:token', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("wifi").find({token: req.params.token}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
})

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});