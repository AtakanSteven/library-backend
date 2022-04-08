const getDatabaseUrl = (): string => {
  let dbName = process.env["DB_NAME"];
  let user = process.env["DB_USER"];
  let pass = process.env["DB_PASSWORD"];
  let url = process.env["DB_URL"];
  return "mongodb+srv://" + user + ":" + pass + "@" + url + "/" + dbName + "?retryWrites=true&w=majority";

};

export default getDatabaseUrl;
