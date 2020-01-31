const rp = require('request-promise');
const querystring = require('querystring');

const headers = require('./headers');
const config = require('./config');

let getLoginBody = () =>querystring.stringify({
    mode: 191,
    username: config.username,
    password: config.password,
    a: Date.now(),
    producttype: 0,
});


let getLogoutBody = () => querystring.stringify({
    mode: 193,
    producttype: 0,
    username: config.username,
    a: Date.now(),
});


let getConnectionActiveBody = () => querystring.stringify({
    mode: 192,
    producttype: 0,
    username: config.username,
    a: Date.now(),
});


let moduleExports = {};

moduleExports.login = async function () {
    let response = await rp({
        headers: headers,
        uri: config.loginURI,
        body: getLoginBody(),
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
    });
    if (response.indexOf("You are signed in as") > 0)
        console.log("Logged in successfully as " + config.username);
    else if (response.indexOf("maximum login limit") > 0)
        throw new Error("Maximum login limit reached for user " + config.username);
    else if (response.indexOf("Invalid user") > 0)
        throw new Error("Username or password invalid");
    else
        throw new Error("UNKNOWN RESPONSE - " + response);
}

moduleExports.keepConnectionAlive = async function () {
    await rp({
        headers: headers,
        uri: config.keepConnAliveURI + "?" + getConnectionActiveBody(),
        method: 'GET',
        rejectUnauthorized: false,
        requestCert: true,
    });
    console.log('Connection active request sent successfully');
}

moduleExports.logout = async function () {
    await rp({
        headers: headers,
        uri: config.logoutURI,
        body: getLogoutBody(),
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
    });
    console.log('Logged out successfully');
}

moduleExports.checkOnline = async function () {
    await rp({
        uri: config.internetCheckURI,
        method: 'GET',
        rejectUnauthorized: true,
        requestCert: true,
    });
}

module.exports = moduleExports;