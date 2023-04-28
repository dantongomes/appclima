document.querySelector('.busca').addEventListener('submit', async event => {
        event.preventDefault()
        let input = document.querySelector('#searchInput').value
        
        if (input !== '') {
        clearInfo()
        showWarning('Carregando...')
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
        )}&appid=96475ff8423fcf9c9366c6446a1d165a&units=metric&lang=pt_br`
        
        let results = await fetch(url)
        let json = await results.json()
        if (json.cod === 200) {
        showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        description: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
        })
        } else {
        clearInfo()
        showWarning('Não encontramos a localização...')
        }
        }
        })
        
        function showInfo(json) {
        showWarning('')
        
        document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
        document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
        document.querySelector(
        '.ventoInfo'
        ).innerHTML = `${json.windSpeed} <span>km/h</span>`
        
        document
        .querySelector('.temp img')
        .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
        )
        document.querySelector('.tempDescrition').innerHTML = `${json.description}`
        document.querySelector('.ventoPonto').style.transform = `rotate(${
        json.windAngle - 90
        }.deg)`
        document.querySelector('.resultado').style.display = 'block'
        }
        
        function showWarning(msg) {
        document.querySelector('.aviso').innerHTML = msg
        }
        
        function clearInfo() {
        showWarning('')
        document.querySelector('.resultado').style.display = 'none'
        }