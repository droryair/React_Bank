const { default: Axios } = require('axios')
const express = require('express')
const router = express.Router()
const Transaction = require('../model/Transaction-model')


const serverPort = 3001
// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

router.get(`/transactions`,async function (req, res) {
    const results = await Transaction.find({})
    res.send(results)
})


router.post('/transaction',async function (req, res) {
    const transaction = req.body
    const amount = transaction.amount
    const category = transaction.category
    const vendor = transaction.vendor
    const t = new Transaction({
        amount,
        category,
        vendor
    })
    await t.save()
    res.send(t)
})

router.delete(`/transaction`, async function (req, res) {
    const id = req.query.id 
    await Transaction.findByIdAndDelete(id, function (err) {
        if (err) console.log(err);
    })
})



//Dummy data,only run once!
// const transactions=[
//     { id:'d0',amount: 3200, vendor: "Elevation", category: "Salary" },
//     { id:'w1',amount: -7, vendor: "Runescape", category: "Entertainment" },
//     { id:'w2',amount: -20, vendor: "Subway", category: "Food" },
//     { id:'w3',amount: -98, vendor: "La Baguetterie", category: "Food" }
//   ]

//   transactions.forEach(t=>{
//     const tr = new Transaction({
//         amount:t.amount,
//         category:t.category,
//         vendor:t.vendor
//     })
//     tr.save()
//   })
//
module.exports =router