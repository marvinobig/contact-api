const app = require("../app");
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});

app.on("error", (err) => {
  console.log(`Error: ${err}`);
});
