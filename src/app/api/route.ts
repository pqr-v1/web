import Mercado, { Preference } from "mercadopago";
import type { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

const mercadopago = new Mercado({
    accessToken: process.env.NEXT_MERCADO_PAGO_PUBLIC_KEY!,
});
const preference = new Preference(mercadopago);

export async function POST(request: Request) {
    const payload = await createPreference(request);

    const { id } = await preference.create({
        body: payload,
    });

    return Response.json({ id });
}

async function createPreference(req: Request): Promise<PreferenceRequest> {
    const data = await req.json();
    return {
        items: [
            {
                id: "1",
                title: "ECOFOREST - Adventure Kids",
                unit_price: data.amount,
                quantity: 1,
            },
        ],
        payer: {
            name: data.name,
            surname: data.surname,
            phone: { area_code: data.phone.area, number: data.phone.number },
            identification: {
                type: "CPF",
                number: data.cpf,
            },
            email: data.email,
            address: {
                street_name: data.address.street,
                street_number: data.address.number,
                zip_code: data.address.zipCode,
            },
        },
        back_urls: {
            success: `${process.env.NEXT_PUBLIC_BASEURL}`,
            failure: `${process.env.NEXT_PUBLIC_BASEURL}`,
            pending: `${process.env.NEXT_PUBLIC_BASEURL}`,
        },
        payment_methods: { installments: 4 },
    };
}
