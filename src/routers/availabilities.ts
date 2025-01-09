import express from "express";
import { get_availability, create_availability } from "../callbacks/availabilities";
let router = express.Router();

router.get('/:availabilityId', get_availability);
router.post('/', create_availability);
// router.put('/:availabilityId/update', update_availability);
// router.delete('/:availabilityId/delete', delete_availability);


export default router;