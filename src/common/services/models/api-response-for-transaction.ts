import { Transaction } from "../../../features/pages/transactions/models/transaction";

export interface ApiResponseForTransaction {
  status: number;
  data: Transaction
}
