const express = require('express')
const mysql = require('mysql')
// create connection to database 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
})
 // connect to mysql
 db.connect((err) => {
     if(err){
         throw err
     }
     console.log('Mysql connected')
 })
 const app = express()
 // create dabase 
 app.get('/createdb', (req,res) =>{
     let sql = "CREATE DATABASE nodemysql"
     db.query(sql,(err) =>{
         if(err){
             throw err
         }
         res.send("Database Created")
     })
  })
  //create table 
  app.get('/createtable',(req,res) => {
      let sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))"
      db.query(sql,(err) =>{
        if(err){
            throw err
        }
        res.send(" Employee table  Created")
    })
  })
  // insert employee into the table employee
  app.get('/insertemployee', (req,res) =>{
      let post = {name:"Ibrahim Mohammed", designation:"Chief Executive Officer"}
      let sql = "INSERT INTO  employee SET ?"
      let query = db.query(sql, post, err => {
          if(err){
              throw err
          }
          res.send("An employee was added successfully")
      })
  })
  // select  employee
  app.get('/selectemployee', (req,res) => {
      let sql = "SELECT * FROM employee"
      let query = db.query(sql,(err,results)=> {
           if(err){
               throw err
           }
           console.log(results)
           res.send('Employee details fetched')
      })
})
  //update employee
  app.get('/updateemployee/:id', (req, res) =>{
    let id = req.params.id
    let data = new Array()
    data[0] = "Ibrahim Mohammed"
    data[1] = id
    let sql = "UPDATE employee SET name = ? WHERE id = ?"
    let query = db.query(sql,data,err => {
        if(err){
            throw err
        }
        res.send("Employee updated successfully")
    })
    
  })
   //Delete  employee
   app.get('/deleteemployee/:id', (req, res) =>{
    let id = req.params.id
    let sql = "DELETE  FROM  employee  WHERE id = ?"
    let query = db.query(sql, id, err => {
        if(err){
            throw err
        }
        res.send("Employee Deleted Sucessfully")
    })
  })
   app.listen('2000',() => {
       console.log('Server started')
   })