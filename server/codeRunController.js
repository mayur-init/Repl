const axios = require('axios');
const config = require('./config');
const fs = require('fs');
let API_KEY1 = config.API_KEY;
const API_KEY2 = config.API_KEY2;
const BASE_URL = config.BASE_URL;


const API_KEY = API_KEY2;
let remainingRunCount = 200; 

const currentTime = new Date().toLocaleString('en-US', {timeZone: 'Asia/kolkata'}).split(',')[1];
//console.log(currentTime);

if(currentTime === '11:59:59 PM'){
    remainingRunCount = 200;
}

if(remainingRunCount === 99){
    API_KEY = API_KEY1;
}

const codeRunController = {

    async make_submission(lang_id, source_code, input) {

        if(input !== null){
            input = Buffer.from(input).toString('base64');
        }

        let data = {
            "language_id": lang_id,
            "source_code": Buffer.from(source_code).toString('base64'),
            "stdin": input,
        }
        /*if(lang_id === 62){
            await fs.appendFile('./server/Java_files/Test.java', source_code, (err) =>{
                console.log(err);
            })
            data = {
                "language_id": lang_id,
                "source_file": require('./Java_files/Test.java'),
                "stdin": input,
            }
        }*/

        const options = {
            method: 'POST',
            url: BASE_URL,
            params: { base64_encoded: 'true', fields: 'token' },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY,
            },
            data: data
        };

        try {
            const response = await axios.request(options);
            const token = response.data.token
            //console.log('token:', token);
            return (token);
        } catch (err) {
            console.log(err.response.data.message);
        }
    },

    async get_result(token) {
        const options = {
            method: 'GET',
            url: BASE_URL + `/${token}`,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': 'b0e520ee8fmshcab43f4f751636dp1176dbjsn85454dfddf6a'
            }
        };

        try {
            const response = await axios.request(options);
            const result = response.data
            //console.log(result);

            /*if (result.compile_output) {
                console.log('\n' + Buffer.from(result.compile_output, 'base64').toString('ascii'));
            } else {
                console.log(`\nlang_name:${result.language.name}`)
                console.log('stdout:', Buffer.from(result.stdout, 'base64').toString('ascii'));
                console.log(`execution_time:${result.time}s`);
                console.log(`memory:${result.memory}kb`);
            }*/

            return result;

        } catch (err) {
            //console.log(err);
        }
    },

    async codeRun(req, res) {
        const langs = new Map([
            ['C', 50],
            ['C++', 54],
            ['Java', 62],
            ['Javascript', 63],
            ['Python', 71]

        ]);
        try {
            //console.log(req.body);
            let lang_id = langs.get(req.body.lang);
            //console.log(lang_id);
            const token = await codeRunController.make_submission(lang_id, req.body.source, req.body.input);
            const response = await codeRunController.get_result(token);
            //console.log(response);
            if(response){
                remainingRunCount--;
            }
            res.send(response);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = codeRunController;