import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Melayani file bundle dari Webpack
app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/', (req, res) => {
   res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
});