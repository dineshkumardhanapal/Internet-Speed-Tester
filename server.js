const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.raw({ limit: '10mb', type: '*/*' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
    try {
        const fileSize = 10 * 1024 * 1024; // 10 MB
        const buffer = Buffer.alloc(fileSize, 'x');
        res.setHeader('Content-Length', fileSize);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-store');
        res.send(buffer);
    } catch (error) {
        console.error('Download error:', error.message);
        res.status(500).json({ error: 'Failed to process download' });
    }
});

app.post('/upload', (req, res) => {
    try {
        const startTime = Date.now();
        if (!Buffer.isBuffer(req.body)) {
            throw new Error('Invalid upload data: Expected a buffer');
        }
        const dataSize = req.body.length;
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        if (duration === 0) {
            throw new Error('Upload duration too short to measure');
        }
        const speedMbps = (dataSize * 8) / (duration * 1024 * 1024);
        res.json({ uploadSpeed: speedMbps.toFixed(1) });
    } catch (error) {
        console.error('Upload error:', error.message);
        res.status(400).json({ error: 'Failed to process upload: ' + error.message });
    }
});

app.get('/ping', (req, res) => {
    try {
        res.json({ time: Date.now() });
    } catch (error) {
        console.error('Ping error:', error.message);
        res.status(500).json({ error: 'Failed to process ping' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});