require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

const SECRET = process.env.GUESS;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/verify', (req, res) => {
    const { attempt } = req.body;
    
    if (!SECRET) {
        return res.status(500).json({ 
            status: 'error', 
            msg: 'Server configuration missing.' 
        });
    }

    if (attempt === SECRET) {
        return res.json({ 
            status: 'win', 
            msg: 'Access Granted' 
        });
    }
    
    res.json({ 
        status: 'fail', 
        msg: 'Access Denied' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
