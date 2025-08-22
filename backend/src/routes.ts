import { Router } from "express";
import { authentcate } from "./middlewares/authMiddleware";

import { loginController } from "./Controllers/Login/loginController"; 
import { CreateProductLine } from "./Controllers/ProductLine/CreateProductLine";
import { EditProductLine } from "./Controllers/ProductLine/EditProductLine";
import { DeleteProductLine } from "./Controllers/ProductLine/DeleteProductLine";
import { ListProductLine } from "./Controllers/ProductLine/ListProductLine";

const router = Router();

router.post("/login", new loginController().handle);

router.post("/creatProductLine", authentcate, new CreateProductLine().handle);
router.post("/editProductLine/:id", authentcate, new EditProductLine().handle);
router.delete("/deleteProductLine/:id", authentcate, new DeleteProductLine().handle);
router.get("/listProductLine", new ListProductLine().handle);


export default router;
