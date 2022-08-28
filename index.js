const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const PORT = process.env.PORT || 5500
const path = require("path")

/*
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}
*/

app.use(cors())
app.use(express.json())

app.use("/article", require("./routes/article"))

/*
app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname,"client/build/index.html"))
})
*/

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
})
