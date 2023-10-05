"use client";
import { useAmountStore } from "@/globalstate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IForm = {
    name: string;
    surname: string;
    areaCode: string;
    phone: string;
    cpf: string;
    email: string;
    address: string;
    apartment: number;
    zipCode: string;
};
const schema = Yup.object().shape({
    name: Yup.string().required("Nome obrigatório"),
    surname: Yup.string().required("Sobrenome obrigatório"),
    areaCode: Yup.string().required("Código de área obrigatório"),
    phone: Yup.string().required("Telefone obrigatório"),
    cpf: Yup.string().required("CPF obrigatório"),
    email: Yup.string().required("E-mail obrigatório"),
    address: Yup.string().required("Endereço obrigatório"),
    apartment: Yup.number().required("Apartamento obrigatório"),
    zipCode: Yup.string().required("CEP obrigatório"),
});

export default function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IForm>({
        mode: "all",
        resolver: yupResolver(schema),
        defaultValues: {
            address: "",
            apartment: 0,
            areaCode: "",
            cpf: "",
            email: "",
            name: "",
            phone: "",
            surname: "",
            zipCode: "",
        },
    });

    const { setPreferenceId, amount } = useAmountStore();

    const route = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState(0);
    const [zipCode, setZipCode] = useState("");

    const handleRegistration = async () => {
        const payload = {
            name,
            surname,
            areaCode,
            phone,
            cpf,
            email,
            address,
            apartment,
            zipCode,
            amount,
        };
        const data = await fetch(
            `http://${process.env.NEXT_PUBLIC_BASEURL}/api`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        const { id } = await data.json();
        setPreferenceId(id);
        route.push("/payment");
    };

    return (
        <div className="flex min-w-full max-w-xs justify-center">
            <form
                className="flex flex-col items-center  bg-white shadow-md rounded  p-8 md:w-1/3  gap-2"
                onSubmit={handleSubmit(handleRegistration)}
            >
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="name"
                    >
                        Nome
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-red-600">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="surname"
                    >
                        Sobrenome
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="surname"
                        {...register("surname", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    {errors.surname && (
                        <p className="text-red-600">{errors.surname.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="areaCode"
                    >
                        Código de área
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="areaCode"
                        {...register("areaCode", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setAreaCode(e.target.value)}
                    />
                    {errors.areaCode && (
                        <p className="text-red-600">
                            {errors.areaCode.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="phone"
                    >
                        Número
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        id="phone"
                        {...register("phone", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                        <p className="text-red-600">{errors.phone.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="CPF"
                    >
                        CPF
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="CPF"
                        {...register("cpf", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    {errors.cpf && (
                        <p className="text-red-600">{errors.cpf.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-600">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="address"
                    >
                        Endereço
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="address"
                        {...register("address", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                        <p className="text-red-600">{errors.address.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="apartment"
                    >
                        Casa
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="apartment"
                        {...register("apartment", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setApartment(+e.target.value)}
                    />
                    {errors.apartment && (
                        <p className="text-red-600">
                            {errors.apartment.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="zipcode"
                    >
                        CEP
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="zipcode"
                        {...register("zipCode", {
                            required: {
                                value: true,
                                message: "Campo obrigatório",
                            },
                        })}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    {errors.zipCode && (
                        <p className="text-red-600">{errors.zipCode.message}</p>
                    )}
                </div>

                <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-4"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
