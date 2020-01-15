const server = require("../src/server");

server.setServerInfo("mklkj", "email@example", "https://github.com/mklkj");

const school = server.addSchool("powiatwulkanowy", "0123456", [
    "lucky_number"
]);

server.addLuckyNumber(school, (req, res) => {
    res.send({
        "lucky_number": "21",
        "lucky_number_future": {
            "tommorow": "37"
        }
    });
});
