import { Router } from "express";
import { authentcate } from "./middlewares/authMiddleware";

import { loginController } from "./Controllers/Login/loginController"; 

import { CreateProductLine } from "./Controllers/ProductLine/CreateProductLine";
import { EditProductLine } from "./Controllers/ProductLine/EditProductLine";
import { DeleteProductLine } from "./Controllers/ProductLine/DeleteProductLine";
import { ListProductLine } from "./Controllers/ProductLine/ListProductLine";

import { CreateColorLine } from "./Controllers/ColorLine/CreateColortLine";
import { EditColorLine } from "./Controllers/ColorLine/EditColorLine";
import { DeleteColorLine } from "./Controllers/ColorLine/DeleteColorLine";
import { ListColorLine } from "./Controllers/ColorLine/ListColorLine";

const router = Router();

router.post("/login", new loginController().handle);

router.post("/creatProductLine", authentcate, new CreateProductLine().handle);
router.post("/editProductLine/:id", authentcate, new EditProductLine().handle);
router.delete("/deleteProductLine/:id", authentcate, new DeleteProductLine().handle);
router.get("/listProductLine", new ListProductLine().handle);

router.post("/creatColorLine", authentcate, new CreateColorLine().handle);
router.post("/editColorLine/:id", authentcate, new EditColorLine().handle);
router.delete("/deleteColorLine/:id", authentcate, new DeleteColorLine().handle);
router.get("/listColorLine", new ListColorLine().handle);

export default router;
