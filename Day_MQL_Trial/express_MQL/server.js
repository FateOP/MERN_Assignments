const express = require("express")
const studentRouter = require("./routes/student")

const app = express()

app.use(express.json())
app.use("/students", studentRouter)

app.listen(4000, () => {
    console.log("Server has started at port 4000")
    
})
