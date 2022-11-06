const router = require("express").Router()
const pool = require("../db")

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const category = await pool.query("select * from category where category_article = $1",[id])
        res.json(article.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {article,name} = req.body
        const category = await pool.query("insert into category (category_name, category_article) values ($1, $2) returning *",[name,article])
        res.json(category.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const category = await pool.query("delete from category where category_id = $1",[id])
        return res.status(200).send("OK")
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router