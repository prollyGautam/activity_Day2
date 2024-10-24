const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let isLoggedIn = false; // Simulate login status

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
let searchList = [
    {"name": "books", "items": ["JJK VOL 1", "Highschool dxd volume 15", "Highschool of the dead vol 1", "The Silent Patient", "The Picture of Dorian Gray"]},
    {"name": "movies", "items": ["Interstellar", "Not Another Teen Movie", "Inception", "The Dark Knight", "The Dictator"]},
    {"name": "tv", "items": ["Rick and Morty", "Breaking Bad", "Prison Break", "Inception", "Lucifer"]},
];

function time(){
    const hour = new Date().getHours();
    if(hour < 12) return "Good Morning";
    else if(hour < 15) return "Good Afternoon";
    else if(hour < 20) return "Good Evening";
    else return "Good Night";
}

app.get("/welcome", (req, res) => {
    let name = "John";
    let good = time();
    res.render('welcome', {name, good, isLoggedIn});
});

// Task-related routes
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
    res.render('todo', {tasks, isLoggedIn});
});

// Product-related routes
app.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    let productSearch = products;
    if(searchQuery){
        productSearch = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    res.render('products', {products: productSearch, isLoggedIn});
});

// User profile route
app.get("/profile/:username", (req, res) => {
    const username = req.params.username;
    const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());
    if(user) res.render('profile', {user, isLoggedIn});
    else res.status(404).send("User not found");
});

// Search-related routes
app.get("/search", (req, res) =>{
    const searchQuery = req.query.q;
    let searchRes = [];
    if(searchQuery){
        searchRes = searchList.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    res.render('search', {searchQuery, searchRes, isLoggedIn});
});

// Toggle login status
app.get("/login", (req, res) => {
    isLoggedIn = true;
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    isLoggedIn = false;
    res.redirect("/");
});

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
});
