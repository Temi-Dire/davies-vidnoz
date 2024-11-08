import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthType {
	auth_token: string | null;
	setAuthToken: (token: string | null) => void;
	reset: () => void;
}

const initialState = {
	auth_token: null,
};

export const useClientStore = create<
    AuthType,
	[["zustand/persist", AuthType]]
>(
	persist(
		(set) => ({
			...initialState,
			setAuthToken: (auth_token) => set(() => ({ auth_token })),
			reset: () => set(initialState),
		}),
		{
			name: "client-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);