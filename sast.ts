String query = "SELECT * FROM users WHERE name = '" + userInput + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);
const { exec } = require('child_process');
const userInput = req.query.cmd;
exec(userInput, (err, stdout, stderr) => {
  console.log(stdout);
});
