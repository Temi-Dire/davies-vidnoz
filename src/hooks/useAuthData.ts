import ApiClient from "@/services/api-client"
import { useClientStore } from "@/store/user-store"
import { useMutation } from "@tanstack/react-query"


type User = {email: string, password: string}
type UserResponse = {access_token: string, email: string, message: string, status: boolean}

export const useLoginUser = () => { 
	const { setAuth } = useClientStore();
	const apiClient = new ApiClient<UserResponse, User>('/api/auth/login/')
	return useMutation({
		mutationFn: (user: User) => apiClient.post(user),
		onSuccess: (res) => {
			setAuth(res);
			window.location.reload();
		}
	})
}

export const useCreateUser = () => { 
	const { setAuth } = useClientStore();
	const apiClient = new ApiClient<UserResponse, User>('/api/auth/register/');
	return useMutation({
		mutationFn: (user: User) => apiClient.post(user),
		onSuccess: (res) => {
			setAuth(res);
		}
	})
}

export const useGoogleLogin = () => {
	const { setAuth } = useClientStore();
	const apiClient = new ApiClient<UserResponse, {token: string}>('/api/auth/google-login/');
	return useMutation({
		// mutationFn: () => apiClient.get(),
		mutationFn: (token: {token: string}) => apiClient.post(token),
		onSuccess: (res) => {
			setAuth(res);
		}
	})
}
