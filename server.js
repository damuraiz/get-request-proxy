const express = require('express');
const axios = require('axios');


const app = express();

const API_BASE_URL = 'https://api.themoviedb.org';
const STATIC_BASE_URL = 'https://image.tmdb.org';

app.use(express.json());

app.get('*', async (req, res) => {	
	console.log(req.originalUrl);
	
    let targetUrl;
    // Проверка расширения запрашиваемого файла
    if (/\.(jpg|jpeg|png|svg)$/i.test(req.path)) {
      targetUrl = STATIC_BASE_URL + req.originalUrl;
    } else {
      targetUrl = API_BASE_URL + req.originalUrl;
    }
	console.log(targetUrl);
 	//const targetUrl = 'https://api.themoviedb.org' + req.originalUrl;
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