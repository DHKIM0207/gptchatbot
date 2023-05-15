const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const config = require('./config.json');

const configuration = new Configuration({
  apiKey: config.openai_api_key,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());

app.use(express.static('views'));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    // res.sendFile()을 통해 안의 경로에 있는 파일이 띄워진다.
    // __dirname = 요청 파일의 경로를 단축시켜주는 절대경로 (현재 실행 중인 폴더 경로이다.)
    // __dirname + /src/index.html 파일을 보낸다.
    res.sendFile(__dirname + "/src/index.html");
});

app.post('/api/chat', async (req, res) => {

    console.log(req.body.prompt);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:req.body.prompt}],
    });

    res.json(completion.data.choices[0].message);
});
  
//port에 접속 성공하면 콜백 함수를 실행시킨다.
app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});