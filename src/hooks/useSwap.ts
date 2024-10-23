import ApiClient from "@/services/api-client"
import { useClientStore } from "@/store/user-store"
import { SuggestedType } from "@/types/SwapProps"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useSwapImage = () => { 
    const {auth_token} = useClientStore();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<any>('/api/swap/image-image/')
	return useMutation({
		mutationFn: (form: FormData) => apiClient.post(form, 
            {
                headers: {
                    Authorization: "Bearer " + auth_token
                }
            }
        )
	})
}

export const useSwapVideo = () => { 
    const {auth_token} = useClientStore();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<any>('/api/swap/suggested-image/');
	return useMutation({
		mutationFn: (form: FormData) => apiClient.post(form, 
            {
                headers: {
                    Authorization: "Bearer " + auth_token
                }
            }
        ),
		onSuccess: () => {
			console.log('Swapped Video successfully!')
		}
	})
}

export const useGetSuggested = () => {

	const {auth_token} = useClientStore();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<SuggestedType>("/api/swap/suggested/");
	return useQuery(
        {
            queryKey: ['suggested'], 
            queryFn: () => {
                return apiClient.get({headers: {Authorization: "Bearer " + auth_token}})
            }
        }
    );
};

export const useGetUserVideos = () => {

	const {auth_token} = useClientStore();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<any>("/api/swap/user-videos/");
	return useQuery(
        {
            queryKey: ['user-videos'], 
            queryFn: () => {
                return apiClient.get({headers: {Authorization: "Bearer " + auth_token}})
            }
        }
    );
};