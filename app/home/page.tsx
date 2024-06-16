import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Logout from "@/components/Logout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
    const session = await auth();

    if (!session?.user) redirect("/");

    // Fallback image URL
    const defaultImageUrl = "/path/to/default/image.jpg";
    const userImage = session?.user?.image || defaultImageUrl;

    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
            <Image
                src={userImage}
                alt={session?.user?.name || "User"}
                width={72}
                height={72}
                className="rounded-full"
            />
            <Logout />
        </div>
    );
};

export default HomePage;
