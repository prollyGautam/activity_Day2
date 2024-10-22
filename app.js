const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
app.set('view engine', 'ejs');
app.use(express.json());

filepath = path.join(__dirname, "/views/index.ejs");
// app.get("/", (req, res)=>{
//     let name = "Sam";
//     let place = "Hyderabad";
//     res.render(filepath, {name, destination:place});
// })

function time(){
    const hour = new Date().getHours();
    if(hour < 12) return "Good Morning";
    else if(hour < 15) return "Good Afternoon";
    else if(hour < 15 && hour >= 12) return "Good Afternoon";
    else if(hour < 20 && hour >= 16) return "Good Evening";
    else return "Good Night";
}
app.get("/welcome", (req, res)=>{
    let name = "John";
    let good = time();
    res.render(filepath, {name, good});
})

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
})