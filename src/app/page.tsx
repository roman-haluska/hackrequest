
const Home = async () => {

    return (
        <div className="min-h-screen flex pt-10 items-center justify-center p-4 flex-col">
            <h1 className="font-bold text-3xl">Registration</h1>
<<<<<<< HEAD
            {'events'}
=======
            <RegisterForm eventId={1} />
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Registered users</h2>
                <ul>
                    {registeredUsers.map((user) => (
                        <li key={user.id}>{user.fullName}</li>
                    ))}
                </ul>
            </div>
>>>>>>> 77f5fc7eb2ddd424407ba827370773fc02abb1e7
        </div>
    );
};

export default Home;
