const { HOCKEY_TOKEN, HOCKEY_APP_ID } = process.env;
const axios = require('axios');
const baseURL = `https://rink.hockeyapp.net/api/2/apps/${HOCKEY_APP_ID}`;
const headers = { 'X-HockeyAppToken': HOCKEY_TOKEN };

module.exports = axios.create({ baseURL, headers });
