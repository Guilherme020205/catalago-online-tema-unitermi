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

import { CreateProductCapacity } from "./Controllers/ProductCapacity/CreateProductCapacity";
import { EditProductCapacity } from "./Controllers/ProductCapacity/EditProductCapacity";
import { DeleteProductCapacity } from "./Controllers/ProductCapacity/DeleteProductCapacity";
import { ListProductCapacity } from "./Controllers/ProductCapacity/ListProductCapacity";

import { CreateCategory } from "./Controllers/Category/CreateCategory";
import { EditCategory } from "./Controllers/Category/EditCategory";
import { DeleteCategory } from "./Controllers/Category/DeleteCategory";
import { ListCategory } from "./Controllers/Category/ListCategory";

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

router.post("/creatProductCapacity", authentcate, new CreateProductCapacity().handle);
router.post("/editProductCapacity/:id", authentcate, new EditProductCapacity().handle);
router.delete("/deleteProductCapacity/:id", authentcate, new DeleteProductCapacity().handle);
router.get("/listProductCapacity", new ListProductCapacity().handle);

router.post("/creatCategory", authentcate, new CreateCategory().handle);
router.post("/editCategory/:id", authentcate, new EditCategory().handle);
router.delete("/deleteCategory/:id", authentcate, new DeleteCategory().handle);
router.get("/listCategory", new ListCategory().handle);


export default router;
