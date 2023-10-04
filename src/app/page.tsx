"use client";
import SalesNavbar from "@/components/salesnavbar";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-5 text-center m-16">
                <h2 className="font text-2xl max-w-2xl">
                    Uma experiência de viagem inesquecível.
                </h2>
            </div>
            <div className="z-10 mt-16 min-w-full min-h-full items-center justify-between font-mono text-sm lg:flex">
                <Image
                    src="/header-bg2.jpg"
                    alt="Vercel Logo"
                    className="min-w-full max-h-screen"
                    width={1200}
                    height={780}
                    priority
                />
            </div>

            <div className="flex flex-col items-center gap-5 text-center max-w-xl p-8">
                <h1 className="font-bold text-4xl w-15">
                    Lorem ipsum dolor sit amet
                </h1>
                <h2 className="font text-xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Culpa nisi possimus pariatur ducimus nostrum vero reiciendis
                    eius exercitationem aliquid! Possimus sed labore placeat
                    quos deserunt nemo ab iusto nostrum sit.
                </h2>
            </div>
            <SalesNavbar />
            <div className="flex flex-col p-5 gap-10">
                <div className="flex flex-col min-w-full items-center">
                    <Image
                        src="/contentimg.jpg"
                        alt="crianças brincando"
                        className="w-2/3"
                        width={720}
                        height={720}
                    />

                    <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                        <h1 className="font-bold text-2xl">
                            Lorem ipsum dolor sit
                        </h1>
                        <h2 className="font text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum, maiores soluta impedit perspiciatis
                            iste architecto? Obcaecati ad porro deserunt aliquam
                            culpa odio animi laudantium dolorem error alias,
                            vitae ducimus. Explicabo?
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col min-w-full items-center">
                    <Image
                        src="/contentimg.jpg"
                        alt="crianças brincando"
                        className="w-2/3"
                        width={720}
                        height={720}
                    />

                    <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                        <h1 className="font-bold text-2xl">
                            Lorem ipsum dolor sit
                        </h1>
                        <h2 className="font text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum, maiores soluta impedit perspiciatis
                            iste architecto? Obcaecati ad porro deserunt aliquam
                            culpa odio animi laudantium dolorem error alias,
                            vitae ducimus. Explicabo?
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col min-w-full items-center">
                    <Image
                        src="/contentimg.jpg"
                        alt="crianças brincando"
                        className="w-2/3"
                        width={720}
                        height={720}
                    />

                    <div className="flex flex-col items-center gap-5  max-w-xl p-8">
                        <h1 className="font-bold text-2xl">
                            Lorem ipsum dolor sit
                        </h1>
                        <h2 className="font text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum, maiores soluta impedit perspiciatis
                            iste architecto? Obcaecati ad porro deserunt aliquam
                            culpa odio animi laudantium dolorem error alias,
                            vitae ducimus. Explicabo?
                        </h2>
                    </div>
                </div>
            </div>
        </main>
    );
}
