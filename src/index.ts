import express from "express";
import * as data from "./data.json";

const app = express();
const port = 9000;

interface IEvents {
  type: string;
  created: number;
}

interface IUsers {
  email: string;
  password?: string;
  phoneNumber?: string;
  events: [IEvents];
}

// routes
app.get("/users", (req, res) => {
  const users: string[] = [];

  data.users.forEach((user) => {

    users.push(user.email);
  });

  res.json(
    users
  );
});

app.get("/events", (req, res) => {
  const event: object[] = [];

  data.users.forEach((element: any) => {
    const user: IUsers = {email: "", events: [{type: "", created: 0}]};

    user.email = element.email;
    user.events = element.events;
    event.push(user);
  });

  res.json(
    event
  );
});

app.get("/events/user", (req, res) => {
  const id: string = req.query.id;
  const user: IUsers = {email: "", events: [{type: "", created: 0}]};

  data.users.forEach((element: any) => {
    if (id === element.email) {
      user.email = element.email;
      user.events = element.events;
    }
  });
  if (user.email === "") {
    res.json(
      {Error: "User does not exist"}
    );
  } else {
      res.json(
        user
      );
    }
});

app.get("/events/last24h", (req, res) => {
  // Would normally get current time, but since this isnt real data
  // current time would yield a time that has no logins within the last
  // 24 hr period
  const currentTime = 1568330494;
  const twentyFourHours = 24 * 60 * 60;
  const event: object[] = [];

  data.users.forEach((element: any) => {
    const user: IUsers = {email: "", events: [{type: "", created: 0}]};
    user.email = element.email;
    user.events.pop();
    element.events.forEach((eventData: IEvents) => {
      if (eventData.created >= (currentTime - twentyFourHours)) {
        user.events.push(eventData);
      }
    });
    if (user.events.length > 0) {
      event.push(user);
    }
  });

  res.json(
    event
  );
});

// start server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`API started at http://localhost:${port}`);
});
