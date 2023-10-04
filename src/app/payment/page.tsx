"use client";
import { useAmountStore } from "@/globalstate";
import { IPayment } from "@/interfaces/IPayment";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";

initMercadoPago(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);

export default function PaymentPage() {
    const route = useRouter();
    const { amount } = useAmountStore();
    const initialization = {
        amount,
    };
    const onSubmit = async ({ selectedPaymentMethod, formData }: IPayment) => {
        const body = {
            installments: formData.installments,
            payer: {
                email: formData.payer.email,
                identification: {
                    type: formData.payer.identification.type,
                    number: formData.payer.identification.number,
                },
            },
            payment_method_id: formData.payment_method_id,
            token: formData.token,
            transaction_amount: formData.transaction_amount,
            statement_descriptor: "MercadoPago",
        };

        try {
            const response = await fetch(
                "https://api.mercadopago.com/v1/payments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },

                    body: JSON.stringify(body),
                }
            );
            const userInfo = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            route.push("/payment/success");
        } catch (err: any) {
            console.error(err.message);
        }
    };
    const onError = async (error: any) => {
        console.error();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Payment
                initialization={initialization}
                customization={{
                    paymentMethods: {
                        creditCard: "all",
                        debitCard: "all",
                        mercadoPago: "all",
                        bankTransfer: "all",
                    },
                }}
                onSubmit={onSubmit}
                onError={onError}
            />
        </main>
    );
}
