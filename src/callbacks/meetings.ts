import { NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { db } from "../db/config";
import { meetingDTO, meetingResponseDTO, STATUS } from "../types/meetingDTO";

// **Comments for security considerations:**
// Due to time constraints, input sanitization is not implemented in these methods.
// It's crucial to sanitize user input to prevent potential security vulnerabilities
// such as SQL injection or cross-site scripting (XSS) attacks.

export async function get_meeting(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Fetches a meeting by its ID from the database.
     * @param req.params.meetingId (subscription: meetingSubscription): The ID of the meeting to retrieve.
     * @returns meetingResponseDTO: The meeting data if found, otherwise an error response.
     */

    try {
        const meetingId = req.params.meetingId; // meetingSubscription

        const meeting = await db.meetings.findUniqueOrThrow({ where: { id: meetingId } });
        res.json({ data: meeting as unknown as meetingResponseDTO }).status(status.OK);
    } catch (error) {
        console.error(error);
        res.status(status.NOT_FOUND).json({ message: "meeting not found" });
    }
}

export async function create_meeting(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Creates a new meeting in the database.
     * @param req.body (subscription: meetingCreation): The meeting data to create.
     * @returns meetingResponseDTO: The newly created meeting data, or an error response.
     */

    try {
        const meetingParams = req.body as meetingDTO;

        const guest = await db.user.findUniqueOrThrow({ where: { email: meetingParams.guestId } });
        const host = await db.user.findUniqueOrThrow({ where: { email: meetingParams.hostId } });

        const meeting = await db.meetings.create({
            data: {
                description: meetingParams.description,
                timezone: meetingParams.time,
                guestId: guest.id,
                hostId: host.id,
                date: meetingParams.date,
                duration: Number(meetingParams.duration),
                title: meetingParams.title
            },
        });

        res.json({ data: meeting as unknown as meetingResponseDTO }).status(status.CREATED);
    } catch (error) {
        console.error(error);
        res.status(status.BAD_REQUEST).json({ message: "invalid Data" });
    }
}

export async function update_meeting(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Updates an existing meeting in the database.
     * @param req.params.meetingId (subscription: meetingSubscription): The ID of the meeting to update.
     * @param req.body (subscription: meetingUpdate): The updated meeting data.
     * @returns meetingResponseDTO: The updated meeting data, or an error response.
     */

    try {
        const meetingId = req.params.meetingId;
        const updates = req.body as meetingDTO;
        const meeting = await db.meetings.update({
            where: { id: meetingId },
            data: {
                description: updates.description,
                timezone: updates.time,
                date: updates.date,
                status: updates.status ? updates.status : STATUS.PENDING,
                duration: Number(updates.duration),
            },
        });

        res.json({ data: meeting }).status(status.OK);
    } catch (error) {
        console.log(error);
        res.status(status.NOT_FOUND).json({ message: "meeting not found" });
    }
}

export async function update_status(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Updates a meeting status in the database.
     * @param req.params.meetingId (subscription: meetingSubscription): The ID of the meeting to update.
     * @param req.body (subscription: meetingUpdate): The updated meeting data.
     * @returns meetingResponseDTO: The updated meeting data, or an error response.
     */

    try {
        const meetingId = req.params.meetingId;
        const updates = req.body as meetingDTO;
        const meeting = await db.meetings.update({
            where: { id: meetingId },
            data: {
                status: updates.status ? updates.status : STATUS.PENDING,
            },
        });

        res.json({ data: meeting }).status(status.OK);
    } catch (error) {
        console.log(error);
        res.status(status.NOT_FOUND).json({ message: "meeting not found" });
    }
}

export async function delete_meeting(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Deletes a meeting from the database.
     * @param req.params.meetingId (subscription: meetingSubscription): The ID of the meeting to delete.
     * @returns: A success message if the meeting is deleted, or an error response.
     */

    try {
        const meetingId = req.params.meetingId; // meetingSubscription

        await db.meetings.delete({ where: { id: meetingId } });
        res.json({ message: "meeting deleted" }).status(status.NO_CONTENT);
    } catch (error) {
        res.status(status.NOT_FOUND).json({ message: "meeting not found" });
    }
}