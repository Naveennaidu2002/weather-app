const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to get weather by city name
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const weatherData = response.data;

        res.json({
            location: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            icon: weatherData.weather[0].icon,
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
