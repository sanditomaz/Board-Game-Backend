import express from "express";
import { insertCustomer } from "../controllers/customersControllers.js";
import { listCustomers } from "../controllers/customersControllers.js";
import { searchCustomer } from "../controllers/customersControllers.js";
import { updateCustomer } from "../controllers/customersControllers.js";
import { customerValidator } from "../middlewares/customersMiddleware.js";

const router = express.Router();

router.post("/customers", customerValidator, insertCustomer);
router.get("/customers", listCustomers);
router.get("/customers/:id", searchCustomer);
router.put("/customers/:id", customerValidator, updateCustomer);

export default router;
