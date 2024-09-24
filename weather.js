const apikey = "93819ca575206d311669faef6b208d55";
const btn = document.getElementById("btn");
const input = document.getElementById("int");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
    const city = input.value.trim(); 
    if (city) {
        getWeather(city);
    } else {
        result.innerHTML = "<p>Please enter a city name.</p>";
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (response.ok) ;

        const data = await response.json();
        displayWeather(data); 
    } catch (error) {
        console.error( error);
        result.innerHTML = "<p>City not found. Please try again.</p>";
    }
}

function displayWeather(data) {
    const weatherDescription = data.weather[0].main; 
    document.body.style.backgroundImage = `url(${getBackgroundImage(weatherDescription)})`; 
    
    result.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>`;
}


const getBackgroundImage = (weatherType) => {
    const backgroundImages = {
        'Clear': 'https://i.pinimg.com/564x/b6/49/f3/b649f3ce697bab0070739bbdc0f8da8b.jpg',
        'Clouds': 'https://i.pinimg.com/564x/2c/69/44/2c694487859e1487f231f723d010acf1.jpg',
        'Rain': 'https://i.pinimg.com/736x/6a/34/50/6a34509f5309df38ce757502e4043a0f.jpg',
        'Snow': 'https://i.pinimg.com/564x/7a/0b/bf/7a0bbfc54919f61cac65fe48f2a9a639.jpg',
        'Thunderstorm': 'https://i.pinimg.com/564x/aa/cc/b4/aaccb4d977112ed5526a66d129b42e62.jpg',
        'Drizzle': 'https://i.pinimg.com/736x/e0/e0/9b/e0e09bd071563d5a6510c0ef25b71955.jpg',
        'Mist': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2euiyfzgjgqyKyrVDGDA1Be-lLBDrM-qwA&s',
    };
    return backgroundImages[weatherType] || 'https://i.pinimg.com/564x/55/2d/e0/552de0ca0380f4b7155550f111c5a52c.jpg'; 
}

