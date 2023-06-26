import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { router } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

const PORT = process.env.PORT;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4200"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Novo cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
