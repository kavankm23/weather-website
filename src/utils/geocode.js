const request=require('request')
const geocode=(address,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2F2YW5rbSIsImEiOiJja2NiZ3kwbGUyMjg4MnpxcDU3Mmpwcjd5In0.XhQP54KsyvIE0bU6E2BfSQ&limit=1'
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('unable to connect',undefined)    //callback(error,data)
    }else if(body.features.length===0){
      callback('enter valid address',undefined)
    }else{
      callback(undefined,{
        longitude:body.features[0].center[0],
        lattitude:body.features[0].center[1],
        location:body.features[0].place_name
      })
    }
  })
}



module.exports=geocode
