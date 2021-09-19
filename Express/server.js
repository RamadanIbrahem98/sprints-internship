const express = require("express");

const app = express();
const doctorsRoutes = require("./routes/doctors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/doctors', doctorsRoutes);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
