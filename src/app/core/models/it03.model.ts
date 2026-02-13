export interface It03Document {
  id: number;
  documentNo: string;
  title: string;
  status: number;
  approveReason?: string;
  rejectReason?: string;
}