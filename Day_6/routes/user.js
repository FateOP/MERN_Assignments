const express = require('express')
const cryptojs = require('crypto-js')
const pool= require('../db/pool')
const result= require('../utils/result')

const router= express.Router()

router.post('/signup', (req, res)=> {
    const { name,email,password, mobile }= req.body
    const sql= `INSERT INTO users1(name,email,password,mobile) VALUES (?,?,?,?)`
    const hashedPassword = cryptojs.SHA256(password).toString()
    pool.query(sql, [name,email,hashedPassword,mobile],(error,data)=> {
        res.send(result.createResult(error,data))
    })

})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT * FROM users1 WHERE email = ? AND password = ?`
    pool.query(sql, [email, hashedPassword], (error, data) => {
        if (error)
            res.send(result.createResult(error))
        else if (data.length == 0)
            res.send(result.createResult("Invalid email or password"))
        else {
            // JWT
            res.send(result.createResult(null, data))
        }
    })
})

// query paramaters
router.get('/', (req, res) => {
    const { email } = req.query
    const sql = `SELECT * FROM users1 WHERE email = ?`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

// request parameters
router.delete('/:uid', (req, res) => {
    const uid = req.params.uid
    const sql = `DELETE FROM users1 WHERE uid = ?`
    pool.query(sql, [uid], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router



