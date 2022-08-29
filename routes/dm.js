const router = require("express").Router()
const pool = require("../db")

router.get("/:from&:to&:bottom&:top", async (req,res) => {
    try {
        const {from,to,bottom,top} = req.params
        const allDms = await pool.query("select * from dm where (dm_from = $1 and dm_to = $2) or (dm_from = $2 and dm_to = $1)",[from,to])
        res.json(allDms.rows.filter((dm,index) => bottom <= index <= top))
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {message,from,to} = req.body
        const newDm = await pool.query("INSERT INTO dm (dm_message, dm_from, dm_to) VALUES ($1, $2, $3) RETURNING *", [message,from,to])
        if (newDm.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            res.json(newArticle.rows[0])
        }
} catch (err) {
        console.log(err.message)
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deleteDm = await pool.query("DELETE FROM dm WHERE dm_id = $1",[id])
        if (deleteDm.rows.length === 0) {
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