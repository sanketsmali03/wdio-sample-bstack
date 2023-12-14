var request = require('request');

class SessionUpdate {
    async updateSession(sessionName, sessionID) {
        console.log('here');
        var headers = {
            'Content-Type': 'application/json'
        };
        
        var dataString = '{"name":"' + sessionName + '"}';
        
        var options = {
            url: 'https://api.browserstack.com/automate/sessions/' + sessionID + '.json',
            method: 'PUT',
            headers: headers,
            body: dataString,
            auth: {
                'user': process.env.BROWSERSTACK_USERNAME,
                'pass': process.env.BROWSERSTACK_ACCESS_KEY
            }
        };

        console.log('and now here');

        request(options, callback);

        function callback(error, response, body) {
            console.log("Status Code: " + response.statusCode)
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    }
}

module.exports = new SessionUpdate()