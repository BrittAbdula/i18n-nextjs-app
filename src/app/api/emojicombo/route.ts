import { Prisma } from "@prisma/client";
import prisma from "@/app/lib/prisma";


export const POST = async (req: Request): Promise<Response> => {
    const emojiComboLogInput = (await req.json()) as Prisma.EmojiComboLogCreateInput;
    // Save the emoji combo log to the database
    try {
        const emojiComboLog = await prisma.emojiComboLog.create({
            data: emojiComboLogInput
        });
        console.log("insert emojiComboLog Successful, id:  ", emojiComboLog.id)
        return new Response(JSON.stringify(emojiComboLog), {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), {
            status: 500
        });
    }
    
};