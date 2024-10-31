const express = require("express"),
	app = express(),
	port = 3000,
	bodyParser = require("body-parser");
	models = require("./models");

app.use(bodyParser.json(), bodyParser.text());

app.get("/api/getModels", (req, res) => {
	res.status(200).send(models);
});

app.get("/api/getModel/:id", (req, res) => {
	const {id} = req.params;
	const model = models.find(item => item.id === id);
	res.status(200).send(model);
});
app.post("/api/updateModel/:id", (req, res) => {
	console.log(req.body);
	const {id} = req.params;
	res.status(200).send(req.body);
});
app.listen(port, () =>	 {
	console.log(`Example app listening on port ${port}`);
})
