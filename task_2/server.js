const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const countFile = path.join(__dirname, 'count.json');

// Initialize count file if not present
if (!fs.existsSync(countFile)) {
  fs.writeFileSync(countFile, JSON.stringify({ count: 0 }));
}

function getCount() {
  const data = fs.readFileSync(countFile);
  return JSON.parse(data).count;
}

function setCount(newCount) {
  fs.writeFileSync(countFile, JSON.stringify({ count: newCount }));
}

app.get('/count', (req, res) => {
  res.json({ count: getCount() });
});

app.post('/increment', (req, res) => {
  const { value } = req.body;

  if (typeof value !== 'number' || isNaN(value)) {
    return res.status(400).json({ error: 'Invalid increment value' });
  }

  const current = getCount();
  const updated = current + value;
  setCount(updated);

  res.json({ count: updated });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
