var e = {
  all: [`admin`],
  dashboardStats: () => [...e.all, `dashboard`, `stats`],
  dashboardActivity: () => [...e.all, `dashboard`, `activity`],
  users: () => [...e.all, `users`],
  reportedFiles: () => [...e.all, `reported-files`],
  approvals: () => [...e.all, `approvals`],
  deletedFiles: () => [...e.all, `trash`, `files`],
  deletedAccounts: () => [...e.all, `trash`, `accounts`],
  premiumStats: () => [...e.all, `premium`, `stats`],
  premiumRequests: () => [...e.all, `premium`, `requests`],
  transactions: () => [...e.all, `payment`, `transactions`],
  planOptions: () => [...e.all, `payment`, `plans`],
  topUpMethods: () => [...e.all, `payment`, `topup-methods`],
  bankInfo: () => [...e.all, `payment`, `bank-info`],
};
export { e as t };
