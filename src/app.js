const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define path for express congig
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'kavan'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about me',
    name:'kavan'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    msg:'contact us : 1223444444',
    title:'help',
    name:'myself'

  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please Enter location'
    })
  }
  geocode(req.query.address,(error,{longitude,lattitude,location}={})=>{
    if(error){
      return res.send({error})
    }

    forecast(longitude,lattitude,(error,forecastData)=>{
      if(error){
       return res.send({error})
      }

      res.send({
        forecast:forecastData,
        location:location,
        address:req.query.address
     })
    })
  })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'provide search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'kavan',
    errmsg:'help not found'
  })
})

app.get('*',(req,res)=>{
res.render('404',{
  title:'404',
  name:'kavan',
  errmsg:'page not found'
})
})


app.listen(port,()=>{
  console.log('server is running')
})
