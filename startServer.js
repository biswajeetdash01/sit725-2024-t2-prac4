var express = require("express");
const mongoose = require("mongoose");
var app = express();
var port = 3040;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Send the HTML file when accessing the root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Database connection
mongoose.connect("mongodb+srv://biswas25277:WcCsA59ZoiAfkLV0@cluster0.tdth3oi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log("Error connecting to database", e);
});

// Define the schema and model for storing contacts
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Controller logic for saving contact data
const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send('Contact saved successfully');
    } catch (error) {
        res.status(400).send('Error saving contact: ' + error.message);
    }
};

// Route to handle form submissions
app.post('/contact', saveContact);

// Start the server
app.listen(port, () => {
    console.log("App listening on port: " + port);
});
