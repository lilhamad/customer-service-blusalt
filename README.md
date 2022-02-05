# Customer Service

Backend technology used : Node.js/Express.js
service-to-service communication used : RabbitMQ  
//
run service
npm run start:dev

//
migrate
npm run migrate

//
seed
npx sequelize-cli db:seed:all 

Note
- fund account service runs every 5mins to fund the seeded customer's(with id 1) account
