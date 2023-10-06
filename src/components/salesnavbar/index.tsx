"use client";
import { useAmountStore } from "@/globalstate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IForm = {
    adultQuantity: number;
    kidQuantity: number;
};
const schema = Yup.object().shape({
    adultQuantity: Yup.number().required("Selecione a quantidade de adultos"),
    kidQuantity: Yup.number().required("Selecione a quantidade de crianças"),
});

export default function SalesNavbar() {
    const [adultQuantity, setAdultQuantity] = useState(0);
    const [kidQuantity, setKidQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IForm>({
        mode: "all",
        resolver: yupResolver(schema),
        defaultValues: {
            adultQuantity: 0,
            kidQuantity: 0,
        },
    });

    useEffect(() => {
        const total = adultPricing * adultQuantity + kidPricing * kidQuantity;
        setTotal(total);
    }, [adultQuantity, kidQuantity]);

    const { setAmount } = useAmountStore();
    const adultPricing = 100;
    const kidPricing = 70;

    const handleAmount = async () => {
        const total = adultPricing * adultQuantity + kidPricing * kidQuantity;
        setAmount(total);
        router.push("/registration");
    };

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
                    onSubmit={handleSubmit(handleAmount)}
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="adultQuantity"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Quantidade de adultos
                        </label>
                        <select
                            id="adultQuantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("adultQuantity", {
                                required: {
                                    value: true,
                                    message: "Campo obrigatório",
                                },
                                min: {
                                    value: 2,
                                    message: "Necessário no minimo um adulto",
                                },
                            })}
                            onChange={(e) => setAdultQuantity(+e.target.value)}
                        >
                            <option value="0" disabled></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {errors.adultQuantity && (
                            <p className="text-red-600">
                                {errors.adultQuantity.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="kidQuantity"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Quantidade de crianças
                        </label>
                        <select
                            id="kidQuantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("kidQuantity", {
                                required: {
                                    value: true,
                                    message: "Campo obrigatório",
                                },
                                min: {
                                    value: 2,
                                    message: "Necessário no minimo uma criança",
                                },
                            })}
                            onChange={(e) => setKidQuantity(+e.target.value)}
                        >
                            <option value="0" disabled></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {errors.kidQuantity && (
                            <p className="text-red-600">
                                {errors.kidQuantity.message}
                            </p>
                        )}
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
