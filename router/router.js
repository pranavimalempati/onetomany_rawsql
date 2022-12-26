const Service = require("../controller/controller");

const router = require("express").Router();

router.post("/insert", Service.add);
router.post("/find", Service.find);
router.put("/update", Service.update);
router.delete("/delete", Service.remove);



module.exports = router;