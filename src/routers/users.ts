import express from "express";
import { get_user, create_user, delete_user, update_user } from "../callbacks/users";
let router = express.Router();

router.get('/:userId', get_user);
router.post('/', create_user);
router.put('/:userId/update', update_user);
router.delete('/:userId/delete', delete_user);


export default router;