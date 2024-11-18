import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthType {
	auth: {access_token: string; email: string; message: string; status: boolean} | null;
	setAuth: (token: {access_token: string; email: string; message: string; status: boolean} | null) => void;
	reset: () => void;
}

const initialState = {
	auth: null,
};

export const useClientStore = create<
    AuthType,
	[["zustand/persist", AuthType]]
>(
	persist(
		(set) => ({
			...initialState,
			setAuth: (auth) => set(() => ({ auth })),
			reset: () => set(initialState),
		}),
		{
			name: "client-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);