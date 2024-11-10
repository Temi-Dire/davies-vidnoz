import ApiClient from "@/services/api-client"
import { useClientStore } from "@/store/user-store"
import { useMutation } from "@tanstack/react-query"


type User = {email: string, password: string}
type UserResponse = {access_token: string, message: string, status: boolean}

export const useLoginUser = () => { 
	const {setAuthToken} = useClientStore();
	const apiClient = new ApiClient<UserResponse, User>('/api/auth/login/')
	return useMutation({
		mutationFn: (user: User) => apiClient.post(user),
		onSuccess: (res) => {
			setAuthToken(res.access_token);
		}
	})
}

export const useCreateUser = () => { 
	const {setAuthToken} = useClientStore();
	const apiClient = new ApiClient<UserResponse, User>('/api/auth/register/');
	return useMutation({
		mutationFn: (user: User) => apiClient.post(user),
		onSuccess: (res) => {
			setAuthToken(res.access_token);
		}
	})
}

export const useGoogleLogin = () => {
	const {setAuthToken} = useClientStore();
	const apiClient = new ApiClient<UserResponse, {token: string}>('/api/auth/google-login/');
	return useMutation({
		// mutationFn: () => apiClient.get(),
		mutationFn: (token: {token: string}) => apiClient.post(token),
		onSuccess: (res) => {
			setAuthToken(res.access_token);
		}
	})
}
