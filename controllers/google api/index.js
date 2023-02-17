//Google Calendar API Code
import express from "express";
import {googleCalendar} from 'googleapi'

const app = express();

const PORT = process.env.PORT || 3000;

const auth = require('auth');
const auth = new google.auth.OAuth(
   process.env.CLIENT_ID,
)