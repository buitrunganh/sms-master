const express = require('express');

const user = require('./routes/user');
const index = require('./routes/index');
const reminder = require('./routes/reminder');

const { remindUser } = require('./sub_modules/send_reminder');

const app = express();
app.use(express.json());
app.use(index)
app.use(user);
app.use(reminder);

require('./sub_modules/send_reminder');

app.listen(8000, () => console.log('server listening on port 8000'));

remindUser();