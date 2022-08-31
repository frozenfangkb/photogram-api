import Server from "./classes/server";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const server = new Server();

server.app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.app.use(bodyParser.json());
server.app.use(cors({ origin: "*" }));

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
