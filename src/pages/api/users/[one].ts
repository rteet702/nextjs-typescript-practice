import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "backend/prisma";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
): void {
    const { one } = request.query;
    if (request.method === "GET") {
        prisma.users
            .findFirst({
                where: {
                    id: one?.toString(),
                },
            })
            .then((user) => response.status(200).json({ user }))
            .catch((err) => response.status(500).json({ err }));
    } else {
        response
            .status(400)
            .json({
                err: `Invalid request method, cannot ${request.method} at this route.`,
            });
    }
}
