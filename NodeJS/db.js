const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CrudDB' , {useUnifiedTopology: true,useNewUrlParser: true})
.then(() => console.log("Db connected"));

mongoose.connection.on('error' , err => {
    console.log(`DB connection error: ${err.message}`);
});

module.exports = mongoose;