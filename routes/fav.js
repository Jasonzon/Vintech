const router = require("express").Router()
const pool = require("../db")

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const allFavs = await pool.query("select * from fav where fav_polyuser = $1",[id])
        res.json(allFavs.rows)
    }
    catch (err) {
        console.log(err.message)
    }
})

router.get("/article/:id", async (req,res) => {
    try {
        const {id} = req.params
        const allFavs = await pool.query("select count * from fav where fav_article = $1",[id])
        res.json(allFavs.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {article,polyuser} = req.body
        const newFav = await pool.query("insert into fav (fav_polyuser, fav_article) values ($1, $2) returning *",[article,polyuser])
        res.json(newFav.rows)
    } catch (err) {
        console.log(err.message)
    }
})
router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteFav = await pool.query("delete from fav where fav_id = $1",[id])
        if (deleteFav.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            return res.status(200).send("OK")
        }
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router