# smart-lock 
<img src="public/images/login.png" width="846">

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
## The unlock and lock buttons use javascript to communicate with a nodeMCU microcontroller, that I have connected to a motor, to turn the device counter clockwise or clockwise depending on the command.
