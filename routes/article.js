const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req,res) => {
    try {
        const allArticles = await pool.query("select * from article")
        res.json(allArticles.rows)
    }
    catch (err) {
        console.log(err.message)
    }
})

module.exports = router
