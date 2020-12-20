import express from "express";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

  //when app receives request having userID, it will execute userID controller 
router.param("userId", userCtrl.userByID);

export default router;
