const request=require('request')
const forecast=(lattitude,longitude,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=7ba24f18cb5ed12d99932fb08f1aa177&query='+(lattitude,longitude)
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('unable to connect',undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
       callback(undefined,body.current.weather_descriptions[0]+". current temp is " +body.current.temperature+ " but feels like "+body.current.feelslike +" .")
    }
  })
}

module.exports=forecast
