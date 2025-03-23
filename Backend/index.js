const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const courserouter = require('./src/routes/course.route')
const { AuthVerify,adminVerify } = require('./src/middlewares/AuthVerify');
const userroute = require("./src/routes/user.route.js")
const courseenroll = require("./src/routes/course.enrollment.js")

const app = express();
const port = 5002; 

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/api/users',userroute)
app.use('/api/courses', AuthVerify, courserouter)
app.use('/api/status', AuthVerify, courseenroll)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
