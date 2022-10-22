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
                <h1 className="p-5">All Users!</h1>
                <ul>
                    {users.map((user: User, index: number) => {
                        return (
                            <li
                                key={index}
                                className="p-5 bg-neutral-700 hover:bg-neutral-600 transition-colors cursor-pointer"
                            >
                                {user.firstName} {user.lastName}
                            </li>
                        );
                    })}
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
