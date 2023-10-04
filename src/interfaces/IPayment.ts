export interface IPayment {
    selectedPaymentMethod: string;
    formData: {
        installments: number;
        issuer_id: string;
        payer: {
            email: string;
            identification: {
                number: string;
                type: string;
            };
        };
        payment_method_id: string;
        token: string;
        transaction_amount: number;
        statement_descriptor?: string;
        additional_info?: {
            items: [
                {
                    id: string;
                    title: string;
                    description: string;
                    picture_url: string;
                    category_id: string;
                    quantity: number;
                    unit_price: number;
                    type: string;
                    event_date: string;
                }
            ];
        };
    };
}
