import Mercado, { Preference } from "mercadopago";
import type { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

const mercadopago = new Mercado({
    accessToken: process.env.NEXT_PUBLIC_API_TOKEN!,
});
const preference = new Preference(mercadopago);

export async function POST(request: Request) {
    const payload: PreferenceRequest = {
        items: [
            {
                id: "1",
                title: "ECOFOREST - Adventure Kids",
                unit_price: 100,
                quantity: 1,
            },
        ],
        payer: {
            name: "Marcello",
            surname: "blablalb",
            phone: { area_code: "92", number: "999999999" },
            identification: {
                type: "CPF",
                number: "11122233344",
            },
        },
        back_urls: {
            success: `${process.env.NEXT_PUBLIC_BASEURL}/payment/success`,
            failure: "http://localhost:8080/feedback",
            pending: "http://localhost:8080/feedback",
        },
        auto_return: "approved",
        payment_methods: { installments: 4 },
    };
    const { id } = await preference.create({
        body: payload,
    });

    return Response.json({ id });
}
