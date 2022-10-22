import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "backend/prisma";
import { compare } from "bcrypt";

export default async function login(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { email, password } = request.body;
    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return response.status(400).json({ error: "User not found." });
    }

    const correctLogin = await compare(password, user.password);

    if (!correctLogin) {
        return response.status(401).json({ error: "Invalid password." });
    }

    response.json({ message: "Successfully logged in.", user: user });
}
