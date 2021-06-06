import express from 'express';
import mongoose from 'mongoose';
import { keys } from './index.mjs';
import authRouter from './routes/auth.routes.mjs';
import taskRouter from './routes/task.routes.mjs';
import path from 'path';

const app = express();

app.use(express.json({ exteded: true }));
app.use('/auth', authRouter);
app.use('/task', taskRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    });
}

const port = process.env.PORT || ":";

async function start() {
    try {
        await mongoose.connect(keys.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (err) {
        console.log('Something went wrong', err.message);
        process.exit(1);
    }
}
start();