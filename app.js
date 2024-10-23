const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let tasks = [];
let products = [
    {"id": 1, "name": "TV", "price": 45000},
    {"id": 2, "name": "Iphone", "price": 78000},
    {"id": 3, "name": "AC", "price": 32000},
    {"id": 4, "name": "Monitor", "price": 24440},
    {"id": 5, "name": "Ipad", "price": 68000},
];
let users = [
    {"name": "Sam", "age": 23, "hobby": "Coin collecting"},
    {"name": "John", "age": 27, "hobby": "Knives"},
    {"name": "Winston", "age": 53, "hobby": "Guns"},
    {"name": "Barney", "age": 42, "hobby": "Wine"},
    {"name": "Luke", "age": 77, "hobby": "Stamp collecting"},
];

function time(){
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 15) return "Good Afternoon";
    else if (hour < 20) return "Good Evening";
    else return "Good Night";
}

app.get("/welcome", (req, res) => {
    let name = "John";
    let good = time();
    res.render('welcome', {name, good});
});

app.post("/add-task", (req, res) => {
    const newTask = req.body.task;
    if(newTask) tasks.push(newTask);
    res.redirect("/todo");
});

app.post("/delete-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    if(!isNaN(taskId) && taskId >= 0 && taskId < tasks.length){
        tasks.splice(taskId, 1);
    }
    res.redirect("/todo");
});

app.get("/todo", (req, res) => {
    res.render('todo', {tasks});
});

app.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    let productSearch = products;
    if(searchQuery){
        productSearch = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    res.render('products', {products: productSearch});
});

app.get("/profile/:username", (req, res) => {
    const username = req.params.username;
    const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());
    if(user) res.render('profile', {user});
    else res.status(404).send("User not found");
});

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
});