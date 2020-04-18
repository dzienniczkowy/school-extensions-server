const fastify = require('fastify')({logger: true});

const packageJson = require("../package.json");
const schools = [];
let serverInfo = {};

fastify.get('/', (request, reply) => {
    reply.send({
        success: true,
        message: "school extensions server is running",
        schools: schools,
        info: {
            instance: serverInfo,
            server: {
                version: packageJson.version,
                bugs: packageJson.bugs.url
            }
        }
    })
});

function setServerInfo(author, email, bugs) {
    serverInfo = {
        author: author,
        email: email,
        bugs: bugs
    };
}

function addSchool(symbol, schoolId, integrations) {
    const url = `/${symbol}/${schoolId}/`;
    schools.push(url);
    fastify.get(url, (request, response) => {
        response.send({integrations: integrations})
    });

    return url;
}

function addLuckyNumber(school, handler) {
    fastify.get(`${school}/lucky_number`, handler);
}

// Run the server!
fastify.listen(process.env.PORT || 3000, '0.0.0.0',(err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
});

exports.setServerInfo = setServerInfo;
exports.addSchool = addSchool;
exports.addLuckyNumber = addLuckyNumber;
