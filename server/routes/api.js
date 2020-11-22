const { default: Axios } = require('axios')
const express = require('express')
const Transaction = require('../model/Transaction-model')

const router = express.Router()

const serverPort = 3001


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
        res.send('ok')
    })
})



module.exports =router