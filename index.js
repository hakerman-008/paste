const express = require('express');
const app = express();

app.get('/create', (req, res) => {
    try {
        const userText = req.query.paste;

        if (!userText) {
            return res.status(400).json({ error: 'User text is required' });
        }

       
        const encodedText = encodeURIComponent(userText);
        const link = `https://paste-kshitiz.onrender.com/paste/${encodedText}`;

        return res.json({ link });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
