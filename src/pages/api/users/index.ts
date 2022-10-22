import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "backend/prisma";
import { hash } from "bcrypt";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        prisma.users
            .findMany()
            .then((res) => response.json({ users: res }))
            .catch((error) => response.json({ error: error }));
    } else if (request.method === "POST") {
        const { firstName, lastName, email, password, confirm } = request.body;
        if (password !== confirm) {
            return response
                .status(400)
                .json({ error: "Passwords do not match." });
        }
        const pwHash = await hash(password, 10);
        prisma.users
            .create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: pwHash,
                },
            })
            .then((newUser) =>
                response.status(200).json({
                    message: "User successfully added.",
                    user: newUser,
                })
            )
            .catch((error) => response.status(400).json({ error: error }));
    } else {
        response.status(400).json({
            err: `Invalid request method, cannot ${request.method} at this route.`,
        });
    }
}
