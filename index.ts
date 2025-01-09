
import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import users from "./src/routers/users";
import avail from './src/routers/availabilities'
import meetings from './src/routers/meetings';
import { handleErrors } from "./src/middleware/middleware";
import cors from 'cors';
import { login } from "./src/callbacks/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser());
app.use(handleErrors);

app.use('/v1/users', users);
app.use('/v1/meetings', meetings);
app.use('/v1/availabilities', avail);

app.get('/v1/login/:email', login);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});