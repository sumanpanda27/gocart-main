import { inngest } from "./client";


//ingest Functions to save user data to the database
export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-create" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        // Function logic here
        const { data } = event;
        await prisma.user.create({
            data: { id: data.id, email: data.email_address, name: `${data.first_name} ${data.last_name}`, image: data.image_url, }
        })
    }
);


// Inngest Function to update user in database
export const syncUserUpdation = inngest.createFunction(
    { id: "sync-user-update" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        // Function logic here
        const { data } = event;
        await prisma.user.update({
            where: { id: data.id },
            data: { email: data.email_address, name: `${data.first_name} ${data.last_name}`, image: data.image_url }
        })
    }
);


// Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    { id: "sync-user-delete" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        // Function logic here
        const { data } = event;
        await prisma.user.delete({
            where: { id: data.id }
        })
    }
);