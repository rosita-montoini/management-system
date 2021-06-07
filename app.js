const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

app.use(express.json({ exteded: true }));
app.use('/auth', require('./routes/auth.routes'));
app.use('/task', require('./routes/task.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    });
}

const serverPort = 5000;
const port = process.env.PORT || serverPort;

async function start() {
    try {
        await mongoose.connect(config.get('MONGO_BD'), {
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