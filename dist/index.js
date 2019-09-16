"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data = __importStar(require("./data.json"));
const app = express_1.default();
const port = 9000;
// routes
app.get("/users", (req, res) => {
    const users = [];
    data.users.forEach((user) => {
        users.push(user.email);
    });
    res.json(users);
});
app.get("/events", (req, res) => {
    const event = [];
    data.users.forEach((element) => {
        const user = { email: "", events: [{ type: "", created: 0 }] };
        user.email = element.email;
        user.events = element.events;
        event.push(user);
    });
    res.json(event);
});
app.get("/events/user", (req, res) => {
    const id = req.query.id;
    const user = { email: "", events: [{ type: "", created: 0 }] };
    data.users.forEach((element) => {
        if (id === element.email) {
            user.email = element.email;
            user.events = element.events;
        }
    });
    if (user.email === "") {
        res.json({ Error: "User does not exist" });
    }
    else {
        res.json(user);
    }
});
app.get("/events/last24h", (req, res) => {
    // Would normally get current time, but since this isnt real data
    // current time would yield a time that has no logins within the last
    // 24 hr period
    const currentTime = 1568330494;
    const twentyFourHours = 24 * 60 * 60;
    const event = [];
    data.users.forEach((element) => {
        const user = { email: "", events: [{ type: "", created: 0 }] };
        user.email = element.email;
        user.events.pop();
        element.events.forEach((eventData) => {
            if (eventData.created >= (currentTime - twentyFourHours)) {
                user.events.push(eventData);
            }
        });
        if (user.events.length > 0) {
            event.push(user);
        }
    });
    res.json(event);
});
// start server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`API started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map