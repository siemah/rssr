import { config } from 'dotenv';
config();
const app = require("./app").default;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});