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

router.get("/polyuser/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allFavs = await pool.query("select * from fav inner join article on (fav_article = article_id) where fav_polyuser = $1",[id])
        res.json(allFavs.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/get/:article/:polyuser", async (req, res) => {
    try {
        const {article,polyuser} = req.params
        const fav = await pool.query("select * from fav where fav_article = $1 and fav_polyuser = $2",[article,polyuser])
        res.json(fav.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {article,polyuser} = req.body
        const newFav = await pool.query("insert into fav (fav_polyuser, fav_article) values ($1, $2) returning *",[article,polyuser])
        res.json(newFav.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})
router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteFav = await pool.query("delete from fav where fav_id = $1",[id])
        res.json({})
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router