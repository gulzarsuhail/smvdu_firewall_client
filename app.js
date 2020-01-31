const fwhttp = require('./fwhttp');
require('console-stamp')(console, "dd/mm/yyyy HH:MM:ss");

async function relogin() {
    try {
        await fwhttp.logout();
        await fwhttp.login();
    } catch (e){
        console.log("Error occured while relogin. " + e.toString());
    };
}

setInterval (async function(){
    try {
        try {
            await fwhttp.checkOnline();
        } catch (e) {
            throw new Error("Error internet inactive. " + e.toString());
        }
        try {
            await fwhttp.keepConnectionAlive();
        } catch (e) {
            throw new Error("Error trying to keep connection alive. " + e.toString());
        }
    } catch (e) {
        console.log(e.message);
        console.log('Trying to relogin');
        relogin();
    }
}, 300000)

async function exitHandler(){
    console.log('Process exited');
    await fwhttp.logout();
    process.exit(0);
}

process.once('SIGINT', exitHandler);
process.once('SIGTERM', exitHandler);

relogin();
