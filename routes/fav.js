const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req,res) => {
    try {
        const allFavs = await pool.query("select * from fav")
        res.json(allFavs.rows)
    }
    catch (err) {
        console.log(err.message)
    }
})

module.exports = router