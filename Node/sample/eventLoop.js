'use strict'
const express = require('express')
const superagent = require('superagent')
const app = express()

app.get('/', sendWeatherOfRandomCity)

function sendWeatherOfRandomCity (request, response) {
  getWeatherOfRandomCity(request, response)
  sayHi()
}

const CITIES = [
  'london',
  'newyork',
  'paris',
  'budapest',
  'warsaw',
  'rome',
  'madrid',
  'moscow',
  'beijing',
  'capetown',
]

function getWeatherOfRandomCity (request, response) {
  const city = CITIES[Math.floor(Math.random() * CITIES.length)]
  superagent.get(`wttr.in/${city}`)
    .end((err, res) => {
      if (err) {
        console.log('O snap')
        return response.status(500).send('There was an error getting the weather, try looking out the window')
      }
      const responseText = res.text
      response.send(responseText)
      console.log('Got the weather')
    })

  console.log('Fetching the weather, please be patient')
}

function sayHi () {
  console.log('Hi')
}

app.listen(3000)