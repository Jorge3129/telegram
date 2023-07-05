## Telegram clone

This is my pet project aimed at implementing the basic features of Telegram.

### Scripts

To run the client:

```
cd client
npm install
npm start
```

To run the server:

```
cd server
npm install
npm run start:dev
```

### Client

On the client, I am mainly cloning the interface of Telegram Desktop, not Telegram Web.

As of now, the user can send messages and photos, see who is online and when his messages are seen by the recipient.

I use React, Redux Toolkit and TypeScript for development.

Default interface:

![default_interface](telegram_screenshot_1.png)

Photo sending form:

![photo sending form](telegram_screenshot_2.png)

### Server

On the server, I use NestJS, TypeORM, Postgres and Socket.io.
