import { object, string } from "zod";

const ReservationRequestSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
    })
});

const ReservationResponseSchema = object({

});