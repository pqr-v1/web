"use client";
import { useAmountStore } from "@/globalstate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SalesNavbar() {
    const router = useRouter();
    const { amount } = useAmountStore();
    const [adultQuantity, setAdultQuantity] = useState(0);
    const [kidQuantity, setKidQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const { setAmount } = useAmountStore();
    const adultPricing = 100;
    const kidPricing = 70;

    const handleAmount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const total = adultPricing * adultQuantity + kidPricing * kidQuantity;
        setAmount(total);
        router.push("/payment", { scroll: false });
    };

    useEffect(() => {
        const total = adultPricing * adultQuantity + kidPricing * kidQuantity;
        setTotal(total);
        console.log(total);
    }, [adultQuantity, kidQuantity]);

    return (
        <div className="flex flex-col items-center max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex flex-col items-center p-5 gap-5">
                <p className="font-bold uppercase text-lg">evento especial</p>
                <p className="text-center text-xl">
                    qua., 4 de out. 17:00–18:00 (BRT)
                    <br /> R${adultPricing}/adulto
                    <br /> R${kidPricing}/criança
                </p>

                <form
                    className="flex flex-col gap-5 p-5"
                    onSubmit={handleAmount}
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="adult-quantity"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Quantidade de adultos
                        </label>
                        <select
                            id="adult-quantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue="0"
                            onChange={(e) => setAdultQuantity(+e.target.value)}
                        >
                            <option value="0" disabled>
                                0
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="kid-quantity"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Quantidade de crianças
                        </label>
                        <select
                            id="kid-quantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue="0"
                            onChange={(e) => setKidQuantity(+e.target.value)}
                        >
                            <option value="0" disabled>
                                0
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p>total: {total}</p>
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        pagar
                    </button>
                </form>
            </div>
        </div>
    );
}
