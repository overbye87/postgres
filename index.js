const express = require("express");
const authRouter = require("./routes/authRouter");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
