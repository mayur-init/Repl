
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const codeRunController = {

    async make_submission(lang_id, source_code, input) {
        let data = {
            "language_id": lang_id,
            "source_code": source_code,
            "stdin": input,
        }
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
            console.log(err);
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

            if (result.compile_output) {
                console.log('\n' + Buffer.from(result.compile_output, 'base64').toString('ascii'));
            } else {
                console.log(`\nlang_name:${result.language.name}`)
                console.log('stdout:', Buffer.from(result.stdout, 'base64').toString('ascii'));
                console.log(`execution_time:${result.time}s`);
                console.log(`memory:${result.memory}kb`);
            }


        } catch (err) {
            console.log(err);
        }
    },

    async codeRun(req, res) {
        try {
            const token = await make_submission();
            const respose = await get_result(token);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = codeRunController;