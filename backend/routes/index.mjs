import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (_req, res, _next) {
  res.status(200).json({
    message: "index",
  });
});

export default router;
