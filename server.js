let express = require('express');
let exphbs = require('express-handlebars'); 
let PORT = process.env.PORT || 8080; 
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/webScrapperController.js")(app);


app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
})
