"use client";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

initMercadoPago(`${process.env.NEXT_PUBLIC_PUBLIC_KEY}`);

export default function Home() {
    const initialization = {
        amount: 100,
        preferenceId: "<PREFERENCE_ID>",
    };
    const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
        console.log(selectedPaymentMethod, formData);
        return new Promise((resolve, reject) => {});
    };
    const onError = async (error: any) => {
        console.log(error);
    };
    const onReady = async () => {};

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
                onReady={onReady}
                onError={onError}
            />

            {/* <div className="flex flex-col items-center gap-5 text-center m-16">
                <h4 className="text-sm font-bold">
                    AIRBNB E IVETE SANGALO APRESENTAM
                </h4>
                <h1 className="font-bold text-5xl text-center max-w-2xl">
                    Circuito Airbnb no Carnaval de Salvador
                </h1>
                <h2 className="font text-2xl max-w-2xl">
                    Uma experiência de viagem inesquecível com Ivete Sangalo
                    como anfitriã do Airbnb.
                </h2>
            </div>
            <div className="z-10 mt-16 min-w-full min-h-full items-center justify-between font-mono text-sm lg:flex">
                <Image
                    src="/header-bg2.jpg"
                    alt="Vercel Logo"
                    className="min-w-full min-h-full"
                    width={1200}
                    height={780}
                    priority
                />
            </div>
            <h2 className="m-14">Crédito: Rubens Cerqueira</h2>

            <div className="flex flex-col items-center gap-5 text-center max-w-xl p-8">
                <h1 className="font-bold text-4xl w-15">Vai começar a folia</h1>
                <h2 className="font text-xl">
                    Venha curtir a festa no trio elétrico da Rainha do Carnaval
                    e outras Experiências* incríveis que revelam a cidade de
                    forma autêntica. Além disso, você e um acompanhante vão
                    aproveitar uma estadia com vista para o mar. Estão incluídos
                    também sem custo: hospedagem, passagens aéreas e transporte
                    terrestre em Salvador no período de 21 a 26 de fevereiro de
                    2020.
                </h2>
            </div>
            <div className="flex  min-w-full p-10 items-center gap-20 justify-center">
                <Image
                    src="/contentimg.jpg"
                    alt="prato com moqueca e arroz"
                    className="w-1/4 h-1/4 rounded-xl"
                    width={720}
                    height={720}
                />
                <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                    <h1 className="font-bold text-2xl w-15">
                        Aprenda a fazer uma autêntica moqueca baiana
                    </h1>
                    <h2 className="font text-base">
                        A culinária de Salvador tem temperos que deixam saudade
                        quando vamos embora. Nada melhor do que guardar na
                        memória as diversas sensações que a comida baiana te
                        traz. Além de aprender o passo a passo, você levará o
                        melhor azeite de dendê para testar seus dotes culinários
                        em casa.
                    </h2>
                </div>
            </div>
            <div className="flex  min-w-full p-10 items-center gap-20 justify-center">
                <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                    <h1 className="font-bold text-2xl w-15">
                        Aprenda a fazer uma autêntica moqueca baiana
                    </h1>
                    <h2 className="font text-base">
                        A culinária de Salvador tem temperos que deixam saudade
                        quando vamos embora. Nada melhor do que guardar na
                        memória as diversas sensações que a comida baiana te
                        traz. Além de aprender o passo a passo, você levará o
                        melhor azeite de dendê para testar seus dotes culinários
                        em casa.
                    </h2>
                </div>
                <Image
                    src="/contentimg.jpg"
                    alt="prato com moqueca e arroz"
                    className="w-1/4 h-1/4 rounded-xl"
                    width={720}
                    height={720}
                />
            </div>
            <div className="flex  min-w-full p-10 items-center gap-20 justify-center">
                <Image
                    src="/contentimg.jpg"
                    alt="prato com moqueca e arroz"
                    className="w-1/4 h-1/4 rounded-xl"
                    width={720}
                    height={720}
                />
                <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                    <h1 className="font-bold text-2xl w-15">
                        Aprenda a fazer uma autêntica moqueca baiana
                    </h1>
                    <h2 className="font text-base">
                        A culinária de Salvador tem temperos que deixam saudade
                        quando vamos embora. Nada melhor do que guardar na
                        memória as diversas sensações que a comida baiana te
                        traz. Além de aprender o passo a passo, você levará o
                        melhor azeite de dendê para testar seus dotes culinários
                        em casa.
                    </h2>
                </div>
            </div>
            <div className="object-none relative sm:w-full sm:h-auto md:w-full md:h-auto min-w-full h-[1024px]">
                <Image
                    src="/bg3.jpg"
                    className="w-full h-full"
                    alt="prato com moqueca e arroz"
                    width={1509}
                    height={754}
                />
                <div className="absolute flex flex-col justify-center top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 max-w-7xl gap-14">
                    <h1 className=" font-bold text-4xl  text-white">
                        Vivencie o Circuito <br />
                        Airbnb Salvador
                    </h1>

                    <button className="bg-white hover:bg-gray-100 text-gray-500 font-semibold py-2 w-52 border border-gray-400 rounded shadow">
                        Reserva encerrada
                    </button>
                </div>
            </div>
            <Footer /> */}
        </main>
    );
}
