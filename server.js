const express = require('express');
const axios = require('axios');


const app = express();

app.use(express.json());

app.get('*', async (req, res) => {
  const targetUrl = 'https://api.themoviedb.org' + req.originalUrl;
  
  try {
    const response = await axios.get(targetUrl);
    console.log('Data:', response.data);
	res.status(response.status).send(response.data);
    
  } catch (error) {
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
	res.status(error.response?.status || 500).send(error.message);
  }
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});