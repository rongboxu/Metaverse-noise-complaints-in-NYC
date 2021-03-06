const express = require("express");
const app = express();
const port = 8723;
const db = require("./conn")

// Solve cross-domain problems
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

// get time range
app.get("/getDateInterval", async (req, res) => {
  let sql = "select MIN(CONCAT(year,'-',month)) start , MAX(CONCAT(year,'-',month)) end from noise_complain ;"
  let result = await db.query(sql, [])
  res.send({
    code: 200,
    data: {
      start: result[0].start,
      end: result[0].end
    },
  });
});

// Get noise data
app.get("/getNoiseDate", async (req, res) => {
  const { year, month } = req.query;
  let sql = "select * from noise_complain where year = ? and month = ? ;"
  let params = [year,month]
  let result = await db.query(sql,params)

  const resData = {}

  // Data zipcode mapping
  for (const item of result) {
    resData[item.zipcode] = item.unique_key
  }

  res.send({
    code: 200,
    data: resData,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
