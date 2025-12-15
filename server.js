const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// JSON faylı yoxdursa yarat
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Bütün iştirakçıları getir
app.get('/api/participants', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const participants = JSON.parse(data);
        res.json(participants);
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Məlumatları oxumaq mümkün olmadı' });
    }
});

// Yeni iştirakçı əlavə et
app.post('/api/participants', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const participants = JSON.parse(data);
        
        const newParticipant = {
            id: Date.now(),
            ...req.body,
            addedDate: new Date().toLocaleString('az-AZ')
        };
        
        participants.push(newParticipant);
        fs.writeFileSync(DATA_FILE, JSON.stringify(participants, null, 2));
        
        res.status(201).json(newParticipant);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Məlumatları yadda saxlamaq mümkün olmadı' });
    }
});

// İştirakçını yenilə
app.put('/api/participants/:id', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        let participants = JSON.parse(data);
        const id = parseInt(req.params.id);
        
        const index = participants.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'İştirakçı tapılmadı' });
        }
        
        participants[index] = {
            ...participants[index],
            ...req.body,
            id: id // ID-ni dəyişmə
        };
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(participants, null, 2));
        res.json(participants[index]);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Məlumatları yeniləmək mümkün olmadı' });
    }
});

// İştirakçını sil
app.delete('/api/participants/:id', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        let participants = JSON.parse(data);
        const id = parseInt(req.params.id);
        
        const index = participants.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'İştirakçı tapılmadı' });
        }
        
        const deletedParticipant = participants.splice(index, 1)[0];
        fs.writeFileSync(DATA_FILE, JSON.stringify(participants, null, 2));
        
        res.json(deletedParticipant);
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Məlumatları silmək mümkün olmadı' });
    }
});

// Bütün iştirakçıları sil
app.delete('/api/participants', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        res.json({ message: 'Bütün iştirakçılar silindi' });
    } catch (error) {
        console.error('Error clearing data:', error);
        res.status(500).json({ error: 'Məlumatları təmizləmək mümkün olmadı' });
    }
});

// Ana səhifə
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} ünvanında işləyir`);
});