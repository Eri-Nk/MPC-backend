import express from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import productsRouter from "./routes/products";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Product API is running"));

app.use("/products", productsRouter);

// global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
