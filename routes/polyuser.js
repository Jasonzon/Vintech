const router = require("express").Router()
const pool = require("../db")
const jwt = require("jsonwebtoken")
const auth = require("../utils/auth")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")


router.get("/", async (req,res) => {
    try {
        const allPolyusers = await pool.query("select * from polyuser")
        res.json(allPolyusers.rows)
    }
    catch (err) {
        console.log(err.message)
    }
})

module.exports = router