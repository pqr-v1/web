"use client";
import { useAmountStore } from "@/globalstate";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`);

export default function PaymentPage() {
    const { amount, preferenceId } = useAmountStore();

    const renderCheckoutButton = (preferenceId: string | null) => {
        if (!preferenceId) return null;

        return (
            <Wallet
                initialization={{
                    preferenceId,
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
