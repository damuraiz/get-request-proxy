const express = require('express');
const axios = require('axios');
const https = require('https');

const app = express();

const API_BASE_URL = 'https://api.themoviedb.org';
const STATIC_BASE_URL = 'https://image.tmdb.org';

app.use(express.json());

app.get('*', async (req, res) => {	
	console.log(req.originalUrl);
	
    let targetUrl;
    // Проверка расширения запрашиваемого файла
    if (/\.(jpg|jpeg|png|svg|ico)$/i.test(req.path)) {
		targetUrl = STATIC_BASE_URL + req.originalUrl;
    } else {
      	targetUrl = API_BASE_URL + req.originalUrl;
    }
	console.log(targetUrl);
	try {

		const response = await axios({
		      method: req.method,
		      url: targetUrl,
		      data: req.body,
		      headers: { ...req.headers, host: new URL(targetUrl).hostname },
		      httpsAgent: new https.Agent({
		        rejectUnauthorized: false // Указывается для разработки, в продакшене должно быть true
		      }),
		      responseType: 'arraybuffer' // сохраняем бинарный ответ, если это изображение или другой бинарный контент
		    });

		    // Транслируем хедеры ответа
		    res.set(response.headers);

		    // Отправляем статус и данные ответа
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