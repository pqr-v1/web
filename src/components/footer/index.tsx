export default function Footer() {
    return (
        <div className="flex flex-col border-t-2 border-gray-500 items-center gap-10 bg-gray-100 min-w-full">
            <div className="flex justify-around gap-10 p-10">
                <ul>
                    <p className="font-bold">Atendimento</p>
                    <li>central de ajuda</li>
                    <li>AirCover</li>
                    <li>Antidiscriminação</li>
                    <li>Apoio à pessoa com deficiência</li>
                    <li>Opções de cancelamento</li>
                    <li>Reporte um problema no bairro</li>
                </ul>
                <ul>
                    <p className="font-bold">Hospedagem</p>
                    <li>Anuncie seu espaço no Airbnb</li>
                    <li>AirCover para anfitriões</li>
                    <li>Recursos para anfitriões</li>
                    <li>Fórum da comunidade</li>
                    <li>Hospedagem responsável</li>
                </ul>
                <ul>
                    <p className="font-bold">Airbnb</p>
                    <li>Newsroom</li>
                    <li>Novos recursos</li>
                    <li>Carreiras</li>
                    <li>Investidores</li>
                    <li>Locais emergenciais Airbnb.org</li>
                </ul>
            </div>
            <div className="border-t border-gray-500 w-1/2"></div>
            <div className="flex gap-4">
                <p>© 2023 Airbnb, Inc.</p>
                <u className="flex gap-4">
                    <li>
                        <a href="#">Privacidade</a>
                    </li>
                    <li>
                        <a href="#">Termos</a>
                    </li>
                    <li>
                        <a href="#">Mapa do site</a>
                    </li>
                    <li>
                        <a href="#">Informações da empresa</a>
                    </li>
                </u>
                <div></div>
            </div>
        </div>
    );
}
