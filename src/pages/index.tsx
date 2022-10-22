import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const Home: NextPage = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { users } = data;
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[800px] bg-neutral-800 shadow-xl border border-neutral-600">
                <h1 className="p-5">User Panel</h1>
                <ul>
                    {users.map((user: User, index: number) => {
                        return (
                            <li
                                key={index}
                                className="p-5 bg-neutral-700 hover:bg-neutral-600 transition-colors cursor-pointer flex justify-between"
                            >
                                <div>
                                    <div>
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div>{user.email}</div>
                                </div>
                                <div className="flex gap-5">
                                    <button className="bg-blue-500 w-32 h-12 hover:bg-blue-400 shadow-xl transition-colors">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 w-32 h-12 hover:bg-red-400 shadow-xl transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                    <li className="p-5 bg-neutral-700 hover:bg-neutral-600 transition-colors cursor-pointer flex justify-between">
                        <div className="text-2xl">Add a User</div>
                        <div className="flex gap-5">
                            <button className="bg-purple-500 w-32 h-12 hover:bg-purple-400 shadow-xl transition-colors">
                                Add User
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await axios.get("http://localhost:3000/api/users");
    const data = await response.data;

    return {
        props: {
            data,
        },
    };
};

export default Home;
