import express from "express";
import { get_meeting, create_meeting, update_meeting, delete_meeting, update_status } from "../callbacks/meetings";
let router = express.Router();

router.get('/:meetingId', get_meeting);
router.post('/', create_meeting);
router.put('/:meetingId', update_meeting);
router.patch('/:meetingId', update_status);
router.delete('/:meetingId', delete_meeting);


export default router;