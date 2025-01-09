import express, { Express, NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { db } from "../db/config"; // Assuming this imports your database connection
import { userDTO, UserResponseDTO } from "../types/userDTO";

// **Comments for security considerations:**
// Due to time constraints, input sanitization is not implemented in these methods.
// It's crucial to sanitize user input to prevent potential security vulnerabilities
// such as SQL injection or cross-site scripting (XSS) attacks.


export async function login(req: Request, res: Response, next: NextFunction) {
    /** 
     * @description: Fetches a user by its EMAIL from the database.
     * @param req.params.email (subscription: userSubscription): The EMAIL of the user to retrieve.
     * @returns UserResponseDTO: The user data with requested related models, or an error response.
     */

    try {
        const userEmail = req.params.email; // userSubscription

        const user = await db.user.findUniqueOrThrow({
            where: { email:userEmail }, select: {
                id: true,
                email: true,
            }
        });

        res.json({ data: user }).status(status.OK);
    } catch (error) {
        res.status(status.NOT_FOUND).json({ message: "User not found" });
    }
}

export async function get_user(req: Request, res: Response, next: NextFunction) {
    /** 
     * @description: Fetches a user by its ID from the database, including related meetings and availabilities.
     * @param req.params.userId (subscription: userSubscription): The ID of the user to retrieve.
     * @param req.query.include (optional, query parameter): A comma-separated list of related models to include (e.g., "hostedMeetings", "guestMeetings", "availabilities").
     * @returns UserResponseDTO: The user data with requested related models, or an error response.
     */

    try {
        const userId = req.params.userId; // userSubscription

        const user = await db.user.findUniqueOrThrow({
            where: { id: userId }, select: {
                name: true,
                id: true,
                email: true,
                hostedMeetings: {
                    select: {
                        id: true,
                        date: true,
                        description: true,
                        duration: true,
                        timezone: true,
                        status: true
                    }
                }, guestMeetings: {
                    select: {
                        id: true,
                        date: true,
                        description: true,
                        duration: true,
                        timezone: true,
                        status: true
                    }
                },
                availabilities: {
                    select: {
                        id: true,
                        time_slot: true
                    }
                }
            }
        });

        res.json({ data: user }).status(status.OK);
    } catch (error) {
        res.status(status.NOT_FOUND).json({ message: "User not found" });
    }
}

export async function create_user(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Creates a new user in the database.
     * @param req.body (subscription: userCreation): The user data to create.
     * @returns UserResponseDTO: The newly created user data, or an error response.
     */

    try {
        const userParams = req.body as userDTO; // userCreation

        const user = await db.user.create({
            data: {
                name: userParams.name,
                email: userParams.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                type: userParams.type,
                availabilities: { create: [] },
                hostedMeetings: { create: [] },
                guestMeetings: { create: [] },
            },
        });

        res.json({ data: user as UserResponseDTO }).status(status.CREATED);
    } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: "invalid Data" });
    }
}

export async function update_user(req: Request, res: Response, next: NextFunction) {
    /**
     * @description: Updates an existing user in the database.
     * @param req.params.userId (subscription: userSubscription): The ID of the user to update.
     * @param req.body (subscription: userUpdate): The updated user data.
     * @returns UserResponseDTO: The updated user data, or an error response.
     */
    try {
        const userId = req.params.userId;
        const updates = req.body as userDTO;

        const user = await db.user.update({
            where: { id: userId },
            data: {
                name: updates.name,
                email: updates.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                type: updates.type,
            },
        });
        res.json({ data: user as UserResponseDTO }).status(status.OK);
    } catch (error) {
        res.status(status.NOT_FOUND).json({ message: "User not found" });
    }
}

export async function delete_user(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.userId;
        await db.user.delete({ where: { id: userId } });
        res.json({ message: "User deleted" }).status(status.NO_CONTENT);
    } catch (error) {
        res.status(status.NOT_FOUND).json({ message: "User not found" });
    }
}