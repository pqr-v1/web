"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
interface IResponse {
    id: number;
    payment_method: {
        id: string;
        type: string;
    };
    payer: {
        email: string;
    };
    transaction_details: {
        total_paid_amount: number;
    };
}

export default function Success() {
    const [transaction, setTransaction] = useState<IResponse>();
    const route = useRouter();
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        const parsedUserInfo = JSON.parse(userInfo!);
        setTransaction(parsedUserInfo);
    }, []);
    const redirectRoute = () => {
        route.push("/");
    };
    return (
        <div className="flex  rounded overflow-hidden shadow-lg   justify-center  bg-slate-200 min-h-screen text-slate-300">
            <div className="flex flex-col p-16 bg-white h-2/3 w-1/2 items-center gap-5">
                <div className="font-bold text-2xl mb-2 text-center">
                    Transferência feita com sucesso!
                </div>

                <HiOutlineCheckCircle size={50} />

                <div className="flex justify-center">
                    <div>
                        <p className="flex gap-2 text-xl">
                            tipo de pagamento:
                            <span className="font-bold text-black">
                                {transaction?.payment_method.type}
                            </span>
                        </p>
                        <p className="flex gap-2 text-xl">
                            bandeira do cartão:
                            <span className="font-bold text-black">
                                {transaction?.payment_method.id}
                            </span>
                        </p>
                        <p className="flex gap-2 text-xl ">
                            email:
                            <span className="font-bold text-black">
                                {transaction?.payer.email}
                            </span>
                        </p>
                        <p className="flex gap-2 text-xl">
                            valor do pagamento:
                            <span className="font-bold text-black">
                                R$
                                {
                                    transaction?.transaction_details
                                        .total_paid_amount
                                }
                            </span>
                        </p>
                        <p className="flex gap-2 text-xl ">
                            id da transação:
                            <span className="font-bold text-black">
                                {transaction?.id}
                            </span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={redirectRoute}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xl"
                >
                    início
                </button>
            </div>
        </div>
    );
}
