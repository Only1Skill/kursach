const express = require('express');
const cors = require('cors');
const participantsRouter = require('./routes/participants');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/participants', participantsRouter);

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
