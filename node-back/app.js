const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({      // cors 설정을 해줘야 front 서버와 통신 가능
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDirectory = 'myImg/';
app.use('/mypage/images', express.static(path.join(__dirname, uploadDirectory)))

app.listen(3000, function() {
    console.log('Server Running at http://localhost:3000');
});