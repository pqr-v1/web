import { create } from "zustand";

interface AmountStore {
    amount: number;
    setAmount: (newAmount: number) => void;
}

export const useAmountStore = create<AmountStore>((set) => ({
    amount: 0,
    setAmount: (newAmount) => set({ amount: newAmount }),
}));
