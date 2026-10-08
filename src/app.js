const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();

app.use(express.json());

// Serve HTML, CSS and JavaScript from src
app.use(express.static(__dirname));

const client = new MongoClient("mongodb://127.0.0.1:27017");

let donors = null;


// HOME PAGE

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// CONNECT TO MONGODB

async function connectDB() {

    try {

        await client.connect();

        const db = client.db("bloodDB");

        donors = db.collection("donors");

        console.log("MongoDB connected");

    } catch (error) {

        console.log("MongoDB is not available");

    }
}

connectDB();


// ADD DONOR

app.post("/donor", async (req, res) => {

    if (!donors) {
        return res.send("MongoDB is not connected");
    }

    await donors.insertOne(req.body);

    res.send("Donor added successfully");

});


// SEARCH DONOR

app.get("/donor/:id", async (req, res) => {

    if (!donors) {
        return res.send("MongoDB is not connected");
    }

    let donor = await donors.findOne({
        donorId: req.params.id
    });

    if (donor) {
        res.json(donor);
    } else {
        res.send("Donor not found");
    }

});


// DELETE DONOR

app.delete("/donor/:id", async (req, res) => {

    if (!donors) {
        return res.send("MongoDB is not connected");
    }

    let result = await donors.deleteOne({
        donorId: req.params.id
    });

    if (result.deletedCount > 0) {
        res.send("Donor deleted successfully");
    } else {
        res.send("Donor not found");
    }

});


// START SERVER

app.listen(3000, () => {

    console.log("Server running on port 3000");

});