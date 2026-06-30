export interface ReportResponse {
  id: string;
  documentId: string;
  documentTitle?: string;
  reporterId: string;
  reporterUsername?: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface ReportDecisionRequest {
  decision: 'approve' | 'reject' | 'remove';
  comment?: string;
}