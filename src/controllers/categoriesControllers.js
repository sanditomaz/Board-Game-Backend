async function insertCategory(req, res) {
  console.log(req.body);
  res.send("oksss");
}

async function listCategories(req, res) {
  res.send("ya");
}

export { insertCategory, listCategories };
