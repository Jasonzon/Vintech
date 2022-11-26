const router = require("express").Router()
const pool = require("../db")
const jwt = require("jsonwebtoken")
const auth = require("../utils/auth")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")

router.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        const polyuser = await pool.query("SELECT polyuser_name, polyuser_role, polyuser_description, polyuser_id, polyuser_city FROM polyuser WHERE polyuser_id = $1",[id])
        if (polyuser.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            res.json(polyuser.rows[0])
        }
    } catch (err) {
        console.error(err.message)
    }
})

router.get("/mail/:id", async (req,res) => {
    try {
        const {id} = req.params
        const polyuser = await pool.query("SELECT * FROM polyuser WHERE polyuser_mail = $1",[id])
        res.json(polyuser.rows)
    } catch (err) {
        console.error(err.message)
    }
})

router.get("/auth", async (req,res) => {
    try {
        const jwtToken = req.header("token")
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        res.json({polyuser_id:payload.polyuser,polyuser_mail:payload.mail})
    } catch (err) {
        console.error(err.message)
    }
})

router.post("/", async (req,res) => {
    try {
        const {name, mail, password, polytech} = req.body
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        const newPolyuser = await pool.query("INSERT INTO polyuser (polyuser_name, polyuser_mail, polyuser_password, polyuser_city) VALUES ($1, $2, $3, $4) RETURNING *", [name, mail, bcryptPassword, polytech])
        if (newPolyuser.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            const token = jwtGenerator(newPolyuser.rows[0].polyuser_id,newPolyuser.rows[0].polyuser_role,newPolyuser.rows[0].polyuser_mail)
            res.json({rows:newPolyuser.rows,token})
        }
    } catch (err) {
        console.error(err.message)
    }
})

router.post("/connect", async (req,res) => {
    try {
        const {mail, password} = req.body
        const newPolyuser = await pool.query("SELECT * FROM polyuser WHERE polyuser_mail = $1", [mail])
        if (newPolyuser.rows.length !== 0) {
            const validPassword = await bcrypt.compare(password,newPolyuser.rows[0].polyuser_password)
            if (validPassword) {
                const token = jwtGenerator(newPolyuser.rows[0].polyuser_id,newPolyuser.rows[0].polyuser_role,newPolyuser.rows[0].polyuser_mail)
                res.json({rows:newPolyuser.rows,token})
            }
            else {
                return res.json({rows:[]}).send("Erreur").status(403)
            }
        }
        else {
            return res.status(403).send("Not Authorized")
        }
    } catch (err) {
        console.error(err.message)
    }
})

router.put("/:id", auth, async (req,res) => {
    try {
        const {id} = req.params
        const {name, description, city, role, mail} = req.body
        const user = req.polyuser
        if (user && user.toString() === id.toString()) {
            const updatePolyuser = await pool.query("UPDATE polyuser SET polyuser_name = $2, polyuser_description = $3, polyuser_city = $4, polyuser_mail = $5, polyuser_role = $6 WHERE polyuser_id = $1 RETURNING *",[id, name, description, city, mail, role])
            if (updatePolyuser.rows.length === 0) {
                return res.status(403).send("Not Authorized")
            }
            else {
                res.send(updatePolyuser.rows[0])
            }
        }
        else {
            return res.status(403).send("Not Authorized")
        }
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router