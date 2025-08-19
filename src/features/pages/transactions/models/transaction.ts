export interface Transaction {
  id: number;
  name: string;
  type: "INW" | "OUTW"
  amount: string;
  endingBalance:string;
  bankAndWalletId: number;
  originBankOrWallet: {
    id: number;
    name: string;
    accountNo: string;
  };
  createdAt: string;
  updatedAt: string;
}
