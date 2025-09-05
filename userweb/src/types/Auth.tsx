import { z } from 'zod';


const UserFormSchema = z.object( {
    email: z.string(),
    password: z.string()
});

const UserSchema = z.object( {
    user_id: z.number(),
    email: z.string(),
    password: z.string()
})

export type UserForm = z.infer<typeof UserFormSchema>;
export type User = z.infer<typeof UserSchema>;