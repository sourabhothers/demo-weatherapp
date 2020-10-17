console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent=''

    fetch(`/weather?city=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent ="Error = "+ data.error
            } else {
                messageOne.textContent = "City = "+data.city
                messageTwo.textContent = "Temperature = "+data.temperature
                messageThree.textContent = "Humidity = "+data.humidity

            }
        })
    })
})