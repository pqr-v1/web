import Mercado, { Preference } from "mercadopago";
import type { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

const mercadopago = new Mercado({
    accessToken: process.env.NEXT_PUBLIC_API_TOKEN!,
});
const preference = new Preference(mercadopago);

export async function POST(request: Request) {
    const {
        name,
        surname,
        areaCode,
        phone,
        cpf,
        email,
        street,
        apartment,
        zipCode,
        amount,
    } = await request.json();
    const payload: PreferenceRequest = {
        items: [
            {
                id: "1",
                title: "ECOFOREST - Adventure Kids",
                unit_price: amount,
                quantity: 1,
            },
        ],
        payer: {
            name,
            surname,
            phone: { area_code: areaCode, number: phone },
            identification: {
                type: "CPF",
                number: cpf,
            },
            email,
            address: {
                street_name: street,
                street_number: apartment,
                zip_code: zipCode,
            },
        },
        back_urls: {
            success: `${process.env.NEXT_PUBLIC_BASEURL}`,
            failure: `${process.env.NEXT_PUBLIC_BASEURL}`,
            pending: `${process.env.NEXT_PUBLIC_BASEURL}`,
        },
        auto_return: "approved",
        payment_methods: { installments: 4 },
    };

    const { id } = await preference.create({
        body: payload,
    });

    return Response.json({ id });
}
