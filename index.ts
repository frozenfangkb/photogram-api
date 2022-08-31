import Server from "./classes/server";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const server = new Server();

server.app.use("/user", userRoutes);

mongoose.connect(
  process.env.MONGO_DB_CONNECTION_STRING as string,
  {},
  (err) => {
    if (err) {
      throw err;
    }

    console.log("Database online");
  }
);

server.start(() => console.log(`Server running on port ${server.port}`));
