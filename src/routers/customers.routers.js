import express from "express";
import * as customersController from "../controllers/customersControllers.js";

const router = express.Router();

router.post("/customers", customersController.insertCustomer);
router.get("/customers", customersController.listCustomers);
router.get("/customers/:id", customersController.searchCustomer);
router.put("/customers/:id", customersController.updateCustomer);

export default router;
