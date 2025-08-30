const express = require("express");
const env = require("dotenv").config();
const ConnectDb = require("./db/ConnectDb");
const AuthRouter = require("./routers/AuthRouter");
const ProductsRouter = require("./routers/ProductRouter");
const BlogRouter = require("./routers/BlogRouter");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
const PORT = 3001;
ConnectDb();
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api", ProductsRouter);
app.use("/api", BlogRouter); 

app.listen(PORT, () => {
  console.log(`Server is Runing ${PORT}`);
});