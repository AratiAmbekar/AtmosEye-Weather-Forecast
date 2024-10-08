const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const data_hide = document.querySelector('.middle_layer')

const getInfo = async (event) => {
    event.preventDefault(); 

    let cityVal = cityName.value;
    if (cityVal === ' ') {
        city_name.innerText = 'Please write the city name before search';
        data_hide.classList.add('data_hide')
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=de551e076dd66456cd7d4150e14a3a68&units=metric`; 
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`; 
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            // condition to check sunny or cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML = 
                "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }else if (tempMood == "Clouds"){
                temp_status.innerHTML = 
                "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }else if (tempMood == "Rain"){
                temp_status.innerHTML = 
                "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }else{
                temp_status.innerHTML = 
                "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            data_hide.classList.remove('data_hide')

        } catch {
            city_name.innerText = 'Please enter the city name properly.';
            data_hide.classList.add('data_hide')
        }
    }
};

// Function to return appropriate weather icons based on the weather status
const getWeatherIcon = (weatherStatus) => {
    switch (weatherStatus.toLowerCase()) {
        case 'clear':
            return 'sun';
        case 'clouds':
            return 'cloud';
        case 'rain':
            return 'cloud-rain';
        case 'snow':
            return 'snowflake';
        default:
            return 'cloud'; // Default icon
    }
};

submitBtn.addEventListener('click', getInfo);
