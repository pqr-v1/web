export async function POST(request: Request) {
    const body = await request.json();
    try {
        const data = fetch("https://api.mercadopago.com/v1/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer `,
            },

            body: JSON.stringify(body),
        });
        return Response.json(data);
    } catch (err: any) {
        console.log(err.message);
    }
}
