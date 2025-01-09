import { NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { db } from "../db/config";
import { availabilityDTO, availabilityResponseDTO } from "../types/availabilityDTO";

// **Comments for security considerations:**
// Due to time constraints, input sanitization is not implemented in these methods.
// It's crucial to sanitize user input to prevent potential security vulnerabilities
// such as SQL injection or cross-site scripting (XSS) attacks.

export async function get_availability(req: Request, res: Response, next: NextFunction) {
  /**
   * @description: Fetches an availability by its ID from the database.
   * @param req.params.availabilityId (subscription: availabilitySubscription): The ID of the availability to retrieve.
   * @returns availabilityResponseDTO: The availability data if found, otherwise an error response.
   */

  try {
    const availabilityId = req.params.availabilityId; // availabilitySubscription

    const availability = await db.availability.findUniqueOrThrow({
      where: { id: availabilityId },
    });
    res.json({ data: availability }).status(status.OK);
  } catch (error) {
    res.status(status.NOT_FOUND).json({ message: "availability not found" });
  }
}

export async function create_availability(req: Request, res: Response, next: NextFunction) {
  /**
   * @description: Creates a new availability in the database.
   * @param req.body (subscription: availabilityCreation): The availability data to create.
   * @returns availabilityResponseDTO: The newly created availability data, or an error response.
   */

  try {
    const availabilityParams = req.body as availabilityDTO; // availabilityCreation

    const availability = await db.availability.create({
      data: {
        userId: availabilityParams.userId,
        time_slot: availabilityParams.time_slot,
      },
    });

    res.json({ data: availability as availabilityResponseDTO }).status(status.CREATED);
  } catch (error) {
    console.error(error);
    res.status(status.BAD_REQUEST).json({ message: "invalid Data" });
  }
}