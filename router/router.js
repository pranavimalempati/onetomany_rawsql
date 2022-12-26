const Service = require("../controller/controller");

const router = require("express").Router();

router.post("/insert", Service.add);
router.post("/find", Service.find);
router.put("/update", Service.update);
// router.put("/updatedept", Service.updatedept);
router.delete("/delete", Service.remove);
// router.delete("/deleteemp/:emp_id", Service.deleteemp);



module.exports = router;