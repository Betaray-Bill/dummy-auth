import express from 'express';
import { addDistrict, addState, getDistrictByState, getDistrictPrice } from '../controllers/stateController.js';
import { isAdminValidation, protect, verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route("/addState").post(verifyUser, addState)
router.route("/addDistrict").post(verifyUser, isAdminValidation, addDistrict)
router.route("/getDistrict/:districtId").get(verifyUser, getDistrictPrice)
router.route("/getState/:stateId").get(verifyUser, getDistrictByState)


export default router;