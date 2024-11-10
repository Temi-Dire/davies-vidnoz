import ApiClient from "@/services/api-client"
import { useClientStore } from "@/store/user-store"
import { useMutation, useQuery } from "@tanstack/react-query"


type TopUpReturnType = {
    method: string,
    choices: {
        price: number,
        subscription: boolean,
        days: number,
        tokens: number,
        ticker: string,
        Tokens_first_time: number,
        lucky: number,
        other_text: string,
        sale: number,
        link: string,
        promotion: number,
        sku: string
    }[]
}

export const useGetPaymentChoices = () => {

	const {auth_token} = useClientStore();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<TopUpReturnType[], any>("/api/payment/pay_choices/");
	return useQuery(
        {
            queryKey: ['payment-choices'], 
            queryFn: () => {
                return apiClient.get({headers: {Authorization: "Bearer " + auth_token}})
            }
        }
    );
};

export const useTopUp = () => { 
    const {auth_token} = useClientStore();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<{invoice_id: string, link: string}, {price: number, method: string}>('/api/payment/topup/')
	return useMutation({
		mutationFn: (data: {price: number, method: string}) => apiClient.post(data, 
            {
                headers: {
                    Authorization: "Bearer " + auth_token
                }
            }
        )
	})
}