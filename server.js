const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors({
    credentials:true,
    origin: "https://plannerevtor-be.onrender.com"
}));
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(cookieParser());
app.get('*', (req, res)=>{
    const refresh = req.cookies.refreshToken;
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.cookie('refreshToken', refresh, {maxAge: 30 * 24 * 60 * 1000, httpOnly: false, secure: true})
})

app.listen(PORT)