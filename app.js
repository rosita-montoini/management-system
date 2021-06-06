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

//const port = process.env.PORT || 8000;

async function start() {
    try {
        await mongoose.connect(config.get('MONGO_URL'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        })
    } catch (err) {
        console.log('Something went wrong', err.message);
        process.exit(1);
    }
}
start();