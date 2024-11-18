import ApiClient from "@/services/api-client"
import { useClientStore } from "@/store/user-store"
import { SuggestedType } from "@/types/SwapProps"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useSwapImage = () => { 
    const { auth } = useClientStore();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<any, FormData>('/api/swap/image-image/')
	return useMutation({
		mutationFn: (form: FormData) => apiClient.post(form, 
            {
                headers: {
                    Authorization: "Bearer " + auth?.access_token
                },
            }
        )
	})
}

export const useSwapVideo = () => { 
    const { auth } = useClientStore();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<any, FormData>('/api/swap/video-image/');
	return useMutation({
		mutationFn: (form: FormData) => apiClient.post(form, 
            {
                headers: {
                    Authorization: "Bearer " + auth?.access_token
                }
            }
        ),
		onSuccess: () => {
			console.log('Swapped Video successfully!')
		}
	})
}

export const useGetSuggested = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<SuggestedType, any>("/api/swap/suggested/");
	return useQuery(
        {
            queryKey: ['suggested'], 
            queryFn: () => {
                return apiClient.get()
            }
        }
    );
};

export const useGetMyVideos = () => {

	const { auth } = useClientStore();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const apiClient = new ApiClient<SuggestedType, any>("/api/swap/my-videos/");
	return useQuery(
        {
            queryKey: ['my-videos'], 
            queryFn: () => {
                return apiClient.get({headers: {Authorization: "Bearer " + auth?.access_token}})
            }
        }
    );
};