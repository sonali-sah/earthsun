const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/user");

const app = express();

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/FormDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB connection error:", err));

// ✅ Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, images, etc.)
app.set("view engine", "ejs");                            // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));          // Optional: Set views directory explicitly
app.use(bodyParser.urlencoded({ extended: true }));       // Parse form data

// ✅ Routes
app.get("/", (req, res) => {
    res.render("form"); // Renders views/form.ejs
});

app.get("/form", (req, res) => {
  res.render("form"); // 👈 this renders views/about.ejs
});

app.get("/about", (req, res) => {
  res.render("about"); // 👈 this renders views/about.ejs
});

app.get("/amity", (req, res) => {
  res.render("amity"); // 👈 this renders views/about.ejs
});

app.get("/contact", (req, res) => {
  res.render("contact"); // 👈 this renders views/about.ejs
});


app.get("/course", (req, res) => {
  res.render("course"); // 👈 this renders views/about.ejs
});

app.get("/fee", (req, res) => {
  res.render("fee"); // 👈 this renders views/about.ejs
});

app.get("/galgotia", (req, res) => {
  res.render("galgotia"); // 👈 this renders views/about.ejs
});

app.get("/MPU", (req, res) => {
  res.render("MPU"); // 👈 this renders views/about.ejs
});

app.get("/online", (req, res) => {
  res.render("online"); // 👈 this renders views/about.ejs
});

app.get("/RGPV", (req, res) => {
  res.render("RGPV"); // 👈 this renders views/about.ejs
});

app.get("/scholarship", (req, res) => {
  res.render("scholarship"); // 👈 this renders views/about.ejs
});

app.get("/sharda", (req, res) => {
  res.render("sharda"); // 👈 this renders views/about.ejs
});

app.get("/SRM", (req, res) => {
  res.render("SRM");
});

app.get("/vacancies", (req, res) => {
  res.render("vacancies");
});

app.get("/VIT", (req, res) => {
  res.render("VIT");
});


app.post("/submit", async (req, res) => {
    const { name, email, number, message } = req.body;

    try {
        const user = new User({ name, email, number, message });
        await user.save();

        const allUsers = await User.find(); // Fetch ALL submissions
        res.render("success", { user, users: allUsers }); // Send both to EJS
    } catch (err) {
        console.error("❌ Error saving user:", err);
        res.status(500).send("Something went wrong");
    }
});



app.get('/submissions', async (req, res) => {
  const users = await User.find();
  res.render('submissions', { users });
});



// ✅ Start the server
app.listen(4000, () => {
    console.log("🚀 Server running on http://localhost:4000");
});
