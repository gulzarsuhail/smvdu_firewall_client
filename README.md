# smvdu_firewall_client

This is a CLI based client for the Shri Mata Vaishno Devi University firewall.

This nodejs app emulates the HTTP requests your browser sends while logging in via the browser based authentication page. Being a nodejs app, this client supports almost all system architecture provided you can install nodejs and npm on your machine.

This client was tested on WSL Linux, Linux Mint and Raspbian (arm).

## Features

- Headless, thus can be used via terminal over ssh and even on Raspberry Pi's
- Automatically detects when internet goes down and proceeds to re-login
- Can be set to login your device automatically using pm2

## Setup

1. **Install nodejs and npm on your machine.**

 For ubuntu based Linux Distributions (e.g Linux Mint, Raspbian), while connected to the internet, use the command

       $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
       $ sudo apt-get install -y nodejs

   For other operating systems, check the [nodejs website](https://nodejs.org/en/).

2. **Clone this repository**

       $ git clone https://github.com/gulzarsuhail/smvdu_firewall_client.git

3. **Install the dependencies**

       $ cd smvdu_firewall_client
       $ npm install

4. **Configure your firewall username and password**

 Open the **config.js** file in  **smvdu_firewall_client** folder and set the following values
 

       username:  "your_firewall_username",
       password:  "your_firewall_password",

5. **(Optional) Test the client**

 Log out of the browser based authentication and while in the smvdu_firewall_client folder, run
 
       $ npm start
   You should output similar to
    
       > smvdu_fw_client@1.0.0 start /home/user/smvdu_firewall_client
       > node index.js
       
       [01/02/2020 01:31:44] [LOG]   Logged out successfully
       [01/02/2020 01:31:44] [LOG]   Logged in successfully as your_firewall_username

 To stop the client, press ctrl+c on your keyboard

6. **Set up client as a pm2 service and auto start on start-up**

 While in the  **smvdu_firewall_client** folder and while connected to the internet,
 
       $ sudo npm install -g pm2
       $ pm2 start app.js
       $ pm2 save
    
   From now on, you can use
   - `$ pm2 start app` - to start the client
   - `$ pm2 stop app` - to stop the client
   - `$ pm2 logs app` - to check client logs

   To run the client automatically at startup, use
   
       $ pm2 startup

