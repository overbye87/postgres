const express = require("express");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", userRouter);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
