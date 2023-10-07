"use client";
import { useAmountStore } from "@/globalstate";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactInputMask from "react-input-mask";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

interface IAddress {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: string;
}

export default function Registration() {
    const initialData: IAddress = {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
    };

    const [address, setAddress] = useState<IAddress>(initialData);
    const { setPreferenceId, amount } = useAmountStore();

    const route = useRouter();

    const testZipCode = async (zipCode: string | undefined) => {
        let zip = zipCode;
        zip = zip?.replaceAll("_", "");
        if (!zip) return false;
        if (zip?.length < 9) return false;
        zip = zipCode?.replace("-", "");

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${zip}/json/`
            );

            const data: IAddress = await response.json();
            if (data.erro) return false;
            setAddress(data);
            return true;
        } catch (err: any) {
            return false;
        }
    };
    const testCpf = (cpf: string | undefined) => {
        if (!cpf) return false;
        if (cpf?.length < 9) return false;
        return isValidCPF(cpf);
    };

    const cepRegExp = /^(\d{5}-\d{3}|\d{8})$/;
    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        surname: yup.string().required("Campo obrigatório"),
        phone: yup.string().required("Campo obrigatório"),
        cpf: yup
            .string()
            .test("CPF", "CPF inválido", testCpf)
            .required("CPF obrigatório"),
        email: yup.string().required("Campo obrigatório"),
        zipCode: yup
            .string()
            .test("CEP", "CEP inválido", testZipCode)
            .min(8, "Mínimo 8 caracteres")
            .matches(cepRegExp, "CEP inválido")
            .required("CEP obrigatório"),
        number: yup.string().required(),
        address2: yup.string().required(),
    });

    type Schema = yup.InferType<typeof schema>;
    type SchemaWithAddress = Schema & IAddress;

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Schema>({
        mode: "all",
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });

    const getZipCode = async (zipCode: string) => {
        const res = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`, {
            cache: "force-cache",
        });

        const data = await res.json();

        if (data.erro) {
            setError("zipCode", {
                type: "manual",
                message: "CEP não encontrado",
            });

            return false;
        }

        setAddress(data);

        return data;
    };

    const onChange = async (data: any) => {
        setAddress(initialData);

        if (data.zipCode.length === 8 && address.bairro.length === 0) {
            await getZipCode(data.zipCode);
            console.log(address);
        }
    };

    const handleRegistration = handleSubmit(async (data) => {
        if (address?.bairro === "") {
            setError("zipCode", {
                type: "manual",
                message: "CEP não encontrado",
            });
            return;
        }
        const values = { ...data, ...address } as SchemaWithAddress;

        const payload = {
            name: values.name,
            surname: values.surname,
            phone: {
                area: values.phone.substring(1, 3),
                number: +values.phone.substring(4),
            },
            cpf: values.cpf.replace(/[.-]/g, ""),
            email: values.email,
            address: {
                zipCode: values.zipCode.replace("-", ""),
                street: values.logradouro,
                district: values.bairro,
                city: values.localidade,
                state: values.uf,
                number: values.number,
            },
            amount,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const { id } = await res.json();
        setPreferenceId(id);
        route.push("/payment");
    });

    return (
        <div className="flex min-w-full max-w-xs justify-center">
            <form
                className="flex flex-col items-center  bg-white shadow-md rounded  p-8 md:w-1/3  gap-2"
                onSubmit={handleRegistration}
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
                        {...register("name")}
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
                        {...register("surname")}
                    />
                    {errors.surname && (
                        <p className="text-red-600">{errors.surname.message}</p>
                    )}
                </div>

                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="phone"
                    >
                        Fone
                    </label>

                    <ReactInputMask
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        mask="(99)999999999"
                        id="phone"
                        {...register("phone")}
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

                    <ReactInputMask
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        mask="999.999.999-99"
                        id="CPF"
                        {...register("cpf")}
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
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-600">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="zipcode"
                    >
                        CEP
                    </label>
                    <ReactInputMask
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        mask="99999-999"
                        id="zipcode"
                        {...register("zipCode", {
                            onChange: () => onChange(getValues()),
                        })}
                    />
                    {errors.zipCode && (
                        <p className="text-red-600">{errors.zipCode.message}</p>
                    )}
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="street"
                    >
                        Rua
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="street"
                        disabled
                        value={address?.logradouro}
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="neighborhood"
                    >
                        Bairro
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="neighborhood"
                        disabled
                        value={address?.bairro}
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="number"
                    >
                        Número
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="number"
                        {...register("number")}
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="address2"
                    >
                        Complemento
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="address2"
                        {...register("address2")}
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="cidade"
                    >
                        Cidade
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="cidade"
                        value={address?.localidade}
                        disabled
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2"
                        htmlFor="uf"
                    >
                        UF
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="uf"
                        value={address?.uf}
                        disabled
                    />
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
