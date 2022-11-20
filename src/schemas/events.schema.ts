import { array, date, number, object, string } from "zod";

export const EventsListResponseSchema = object({
    body: object({
        events: array(object({
            id: number(),
            title: string(),
            start_at: date(),
            end_at: date(),
        })),
        pagination: object({
            total: number(),
            per_page: number(),
            total_pages: number(),
            current_page: number(),
        }),
    })
});

export const EventShowResponseSchema = object({
    id: number(),
    title: string(),
    start_at: date(),
    end_at: date(),
    total_workshops: number()
});