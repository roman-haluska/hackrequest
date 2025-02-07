import { RegisterForm } from "@/components/register-user";
import { db } from "@/db/db";
import { attendees } from "@/db/schema";


const Home = async () => {

    const registeredUsers = await db.select().from(attendees);

    return (
        <div className="min-h-screen flex pt-10 items-center justify-center p-4 flex-col">
            <h1 className="font-bold text-3xl">Registration</h1>
            <RegisterForm eventId={1} />
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Registered users</h2>
                <ul>
                    {registeredUsers.map((user) => (
                        <li key={user.id}>{user.fullName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
