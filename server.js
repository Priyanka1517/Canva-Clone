const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')


dotenv.config()
app.use(express.json())

if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3000'],
        credentials: true
    }))
    console.log('local')
} else {
    app.use(cors({
        credentials: true
    }))
}

app.use('/api', require('./routes/designRoutes'))
app.use('/api', require('./routes/authRoutes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./frontend/dist")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"))
    })
}

const dbConnect = async () => {
    try {
        if (process.env.NODE_ENV === 'local') {
            console.log('local database is connecting...', process.env.LOCAL_DB_URI)
            await mongoose.connect(
                process.env.LOCAL_DB_URI)
            console.log('Local database is connected...')
        } else {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('production database is connect....')
        }
    } catch (error) {
        console.log('database connection failed', error.message)
    }
}

dbConnect()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}..`))