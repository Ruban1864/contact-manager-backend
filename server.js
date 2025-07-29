const express = require("express");
const errHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
require("dotenv").config(); 
const cors = require("cors");

connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup for both localhost (dev) and Netlify (prod)
app.use(cors({
  origin: ['http://localhost:3000', 'https://contactsphere.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server Running on port ${PORT}`);
});
