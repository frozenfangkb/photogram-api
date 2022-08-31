import Server from "./classes/server";
import userRoutes from "./routes/user.routes";

const server = new Server();

server.app.use("/user", userRoutes);

server.start(() => console.log(`Server running on port ${server.port}`));
