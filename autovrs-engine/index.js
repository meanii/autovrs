import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routers/index.js';
import { Mongo } from './client/mongo.client.js';

const PORT = process.env.PORT ?? 4000;
const MONGO_URL = process.env.MONGO_URL ?? `mongodb://localhost:27017/auto-vrs-engine`;

const app = express();

app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());

app.use(`/auto-vrs-engine`, router);


app.listen(PORT, async () => {
    await new Mongo(MONGO_URL).connect();
    console.log(`server is running at http://0.0.0.0:${PORT}/auto-vrs-engine/`)
})