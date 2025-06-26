//step 1 import ...

const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

// การ Import ปกติทีละตัว
// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')

// middleware
app.use(morgan('dev'))
app.use(express.json({limit:'20mb'})) //อ่านตัว json
app.use(cors())


// การ Import ปกติทีละตัว (ต้องทำตัวจากตัวบนที่เป็น Import ปกติ)
// app.use('/api',authRouter)
// app.use('/api',categoryRouter)
readdirSync('./routes').map((c)=>app.use('/api',require('./routes/'+c))) // Import Auto ใช้ทั้ง project





// Step 3 Router
// app.post('/api',(req,res)=>{
//     //code
//     console.log(req.body.email)
//     res.send('IEIE 555+')
// })


//step 2 start server
app.listen(5001,()=> console.log('Server is running on port 5001'))