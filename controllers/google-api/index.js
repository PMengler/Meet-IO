import dotenv from "dotenv"
import express from "express";
import events from "./calendar-event"

// Import env file
dotenv.config()

const app = express();
const apiRoutes = require('./google-api')
const {google} = require('googleapis');
//const calendar = require(

const PORT = process.env.PORT || 3001;
// Invoke 
app.listen(PORT,() => {
  console.log('listening on port', PORT);
});

// Request access token from Google's OAuth 2.0 server.
async function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
// Ask for permission to retrieve an access token
const auth = require('auth');
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)
// Generates a url that asks permissions for Google Calendar scopes
const scopes = [
  'https://googleapis.com/auth/calendar'
] 

// Log user in
app.get("/googleCalendar", (req, res) => {
   req.url = oauth2Client.getAuthUrl({
    // 'Online' (default) and 'Offline' (gets refresh_token)
    access_type: "offline",
    scope: scopes,
   });
   res.redirect(url);
});

// This will provide an object with the access_token and refresh_token.
const {tokens} = await oauth2Client.getToken(code)
oauth2Client.setCredentials(tokens);

// Automatically use a refresh token to obtain a new access token if it is about to expire
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

app.get('/goolge/redirect', (req, res) => {
  console.log("all green lights");
});


module.exports = router;



  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': 'YOUR_CLIENT_ID',
                  'redirect_uri': 'YOUR_REDIRECT_URI',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }