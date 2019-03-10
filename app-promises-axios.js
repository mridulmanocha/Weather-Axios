const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
	a : { demand: true,
		alias : 'address',
		describe : " address to fetch weather for",
		string : true
}})
.help()
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=38ae89c02aab44eaa5dc3b3f006979b9`;

axios.get(url).then((response) => {


  if(response.data.total_results === 0){
  	console.log('Unable to find address');

  } else 

   var lat = response.data.results[0].geometry.lat;
   var lng = response.data.results[0].geometry.lng;
   var location = response.data.results[0].formatted;
   var weatherurl = `https://api.darksky.net/forecast/6c0a7e8aaf76a98fa6ebccb241c7cad2/${lat},${lng}`
   setTimeout(() => {
 				console.log(location);
 			},1000);

   return axios.get(weatherurl);

}).then((response) => {
  

  console.log(`Temperature is ${response.data.currently.temperature}°F, feels like ${response.data.currently.apparentTemperature}°F `);
  console.log('-------------------------------------------');
  console.log(`Summary : ${response.data.currently.summary}`);

}).catch((e) => {});

