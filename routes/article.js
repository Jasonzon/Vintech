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

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const article = await pool.query("select * from article natural join polyuser where article_id = $1",[id])
        if (article.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            res.json(article.rows[0])
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/polyuser/:id", async (req,res) => {
    try {
        const {id} = req.params
        const allArticles = await pool.query("select * from article where article_polyuser = $1",[id])
        res.json(allArticles.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {pic,title,description,polyuser,price,city} = req.body
        const newArticle = await pool.query("INSERT INTO article (article_name, article_polyuser, article_price, article_city, article_pic, article_description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, polyuser, price, city, pic, description])
        if (newArticle.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            res.json(newArticle.rows[0])
        }
} catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {pic,title,description,polyuser,price,city} = req.body
        const updateArticle = await pool.query("UPDATE article SET article_title = $2, article_price = $3, article_pic = $4, article_description = $5, article_city = $6, article_polyuser = $7 WHERE article_id = $1 RETURNING *",[id, title, price, pic, description, city, polyuser])
            if (updateArticle.rows.length === 0) {
                return res.status(403).send("Not Authorized")
            }
            else {
                res.json(updateArticle.rows[0])
            }
    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteArticle = await pool.query("DELETE FROM article WHERE article_id = $1",[id])
        if (deleteArticle.rows.length === 0) {
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
