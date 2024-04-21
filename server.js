const express = require('express');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(express.json());

const httpsOptions = {
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
};



app.all('*', async (req, res) => {
  const targetUrl = 'https://api.themoviedb.org' + req.originalUrl; // Используйте HTTPS в URL
  
  try {
    const response = await axios.get(targetUrl);
//    console.log('Status:', response.status);
    console.log('Data:', response.data);
	res.status(response.status).send(response.data);
    
  } catch (error) {
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
	res.status(error.response?.status || 500).send(error.message);
   // throw error;  // Выкидываем ошибку дальше, чтобы можно было её обработать
  }
  
});

const PORT = 3000;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS сервер запущен на порту ${PORT}`);
});