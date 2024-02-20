export interface Account {
  accountId: string;
  bank: string;
  accountType: string;
  accountSubType: string;
  currency: string;
  balanceAmount: number;
}

export interface AccountTransaction {
  bookingDateTime: Date;
  currency: string;
  amount: number;
  transactionInformation: string;
}
