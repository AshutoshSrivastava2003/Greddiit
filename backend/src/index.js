require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
const DB = "mongodb+srv://greddiit_user:greddiit_password@cluster0.gvupvis.mongodb.net/Greddiit?retryWrites=true&w=majority"
//database connection
mongoose.set('strictQuery', true);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then((result) => {
    console.log('connection success')
}).catch((err) => {
    console.log(err)
});

app.use("/api/Greddiit/Users", require('./routes/user_route.js'))
app.use("/api/Greddiit/Posts", require('./routes/post_route.js'))
app.use("/api/Greddiit/Report", require('./routes/report_route.js'))
app.use("/api/Greddiit/Subgreddiit", require('./routes/subgreddiit_route.js'))

app.listen(port, () => {
    console.log("Server Started at http://localhost:" + port)
})