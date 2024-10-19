import { app } from "./app.js";

const port = process.env.PORT || 4000;
app.listen(port,(req,res)=>{
    console.log("App is listening at port",port);
})

