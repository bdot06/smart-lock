# smart-lock 
<img src="public/images/login.png" width="846">


# Materials
- NodeMCU Microcontroller
- Servo Motor
- Dead Bolt Lock Holder

# Set up nodeMCU Environment

- **[NodeMCU Setup](https://docs.losant.com/getting-started/losant-iot-dev-kits/environment-setup/)**
- Copy the "arduinoCode" file from the "arduinoCode" folder in the "myapp" directory and paste it in to the Arduino IDE.
- Adjust the Wifi and losant credentials. (The DEVICE_ID is located in the upper right corner of the applications tab in a grey box. You will get the ACCESS_KEY and ACCESS_SECRET after creating a losant account).
```
// WiFi credentials.
const char* WIFI_SSID = "";
const char* WIFI_PASS = "";

// Losant credentials.
const char* LOSANT_DEVICE_ID = "";
const char* LOSANT_ACCESS_KEY = "";
const char* LOSANT_ACCESS_SECRET = "";
```

# create a losant account and application

**[How to create a losant account and application](https://docs.losant.com/getting-started/losant-iot-dev-kits/builder-kit/)**

(stop after the "generate an Access Key" section)

# create a webhook
 - Click the "webhook" button in the applications tap at the top of the page then click the "add webhook" button in the upper right corner of the page. 
- Name your webhook "unlock-button", then click "create webhook" at the bottom of the page.
- Copy the url next to the webhook you created.
- go to the "main.js" file in the "javascripts" folder, in the "public" folder, in the "myapp" directory, and paste the webhook url in the get request for "#unlockButton"
- Click the "webhook" button in the applications tap at the top of the page then click the "add webhook" button in the upper right corner of the page. 
- Name your webhook "lock-button", then click "create webhook" at the bottom of the page.
- Copy the url next to the webhook you created.
- go to the "main.js" file in the "javascripts" folder, in the "public" folder, in the "myapp" directory, and paste the webhook url in the get request for "#lockButton"
```
/*------------------- Smart Lock Top Page ----------------------------------*/


$(document).ready(function() {

$('#logoutButton').click(function(){
	window.location.href = '/';
});

$('#unlockButton').click(function() {
  $.get("");
  alert('you unlocked the door');

});

$('#lockButton').click(function() {
  $.get("");
  alert('you locked the door');

});

});
```

# create a workflow

Click the "workflow" button in the applications tab at the top of the page and select "create new workflow." You can name the workflow whatever you would like. Then begin to mimmic the workflow below.

<img src="public/images/workflow.png" width="846">

- click on the first webhook on the workflow and on the right hand side of the page, the webhook menu should appear
- scroll to the bottom and under choose hook, choose the "unlock-button" webhook.
- click the device command connected to the "unlock-button" webhook and on the right hand side of the page, the device command menu should appear.
- on the menu, under "command name template" type "unlock"
- click on the second webhook on the workflow and on the right hand side of the page, the webhook menu should appear
- scroll to the bottom and under choose hook, choose the "lock-button" webhook.
- click the device command connected to the "lock-button" webhook and on the right hand side of the page, the device command menu should appear.
- on the menu, under "command name template" type "lock"


# Install all dependencies

```bash
$ npm install
```
# Start smart-lock app at `http://localhost:3000/`:

```bash
$ node ./bin/www
```

# How to login

<img src="public/images/register.png" width="846">

go to the register page and fill out all fields with the appropriate credenials and press register.
Then use the email address and password that you used to register to log in.

# How smart-lock works

<img src="public/images/smartLock.png" width="846">
The unlock and lock buttons use javascript to communicate with a nodeMCU microcontroller, that I have connected to a motor, to turn the device counter clockwise or clockwise depending on the command.
