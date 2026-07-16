import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({path:'./production.env'})
const server = express()
const directory = process.cwd()


function createAccount(){

}

function getData(id,res){
    fs.readFile('./secret.txt',{encoding:'utf8'},(error,data)=>{
        if (error) {console.log(`Error Reading USERS:/n ${error}`)}
        else {
            let rawData = JSON.parse(data)
            for(let i = 0; i < rawData.length;i++){
                if (rawData[i].id == id){
                    return res.json({username:rawData[i].username});
                }
            }
        }
    })
}


function verifyData(userData,res){
    fs.readFile('./secret.txt',{encoding:'utf8'},(error,data)=>{
        if (error) {console.log(`Error Reading USERS:/n ${error}`)}
        else {
            let rawData = JSON.parse(data)
            for(let i = 0; i < rawData.length;i++){
                if (rawData[i].username == userData.username && rawData[i].password == userData.password){
                    console.log('User Found'); return res.json({message:'Sucess',id:rawData[i].id});
                }
            }
            console.log('No user Was found')
            return res.json({message:'Failed'})
        }
    })
}


server.use(express.static('./public'))
server.use(express.urlencoded())
server.use(express.json())

server.get('/',(req,res)=>{
    console.log('entered')
    res.sendFile(path.join(directory,'public','index'))
})

server.post('/data',(req,res)=>{
    console.log(req.body)
     verifyData(req.body,res)
    
})
server.get('/home/:id',(req,res)=>{
    console.log(`POST request has been filed: ${req.params.id}`)
    getData(req.params.id,res)
})


server.listen(process.env.PRODUCTION_PORT,(err)=>{
    if (err) { console.log('Error') }
    else { console.log(`Server is running on port: ${3000}`) }
})