"use client";
import { useAmountStore } from "@/globalstate";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(`${process.env.MERCADO_PAGO_PUBLIC_KEY}`);

export default function PaymentPage() {
    const { amount, preferenceId } = useAmountStore();

    const renderCheckoutButton = (preferenceId: string | null) => {
        if (!preferenceId) return null;

        return (
            <Wallet
                initialization={{
                    preferenceId,
                    redirectMode:"modal"
                }}
            />
        );
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div>{renderCheckoutButton(preferenceId)}</div>
        </main>
    );
}
