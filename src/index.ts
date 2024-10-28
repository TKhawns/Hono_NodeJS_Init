import { Hono } from "hono";
import { Server } from "./web/server.js";
import { serve } from "@hono/node-server";
import { env } from "process"

const app = new Hono();

const server = new Server(app);
server.configure();

const port = parseInt(env.PORT || "8090");
console.log(`Server is running on port: ${port}`);

serve({ fetch: app.fetch, port: port});