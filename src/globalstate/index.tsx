import { create } from "zustand";

interface AmountStore {
    amount: number;
    preferenceId: string | null;
    setAmount: (newAmount: number) => void;
    setPreferenceId: (newPreferenceId: string | null) => void;
}

export const useAmountStore = create<AmountStore>((set) => ({
    amount: 0,
    preferenceId: null,
    setPreferenceId: (newPreferenceId) =>
        set({ preferenceId: newPreferenceId }),
    setAmount: (newAmount) => set({ amount: newAmount }),
}));
