export interface meetingResponseDTO {
    id: string,
    userId: string,
    date: string,
    time: string,
    duration: string,
    hostId: string,
    guestId: string,
    description:string,
    title:string
}

export interface meetingDTO {
    id: string,
    userId: string,
    date: string,
    time: string,
    duration: string,
    hostId: string,
    guestId: string,
    status?: STATUS,
    description: string,
    title:string
}

export enum STATUS {
    ACCEPTED="ACCEPTED",
    CANCELED="CANCELED",
    PENDING="PENDING"
}
