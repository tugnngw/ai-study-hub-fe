export interface UserItem { id: number; name: string; email: string; status: 'Hoạt động' | 'Khóa'; }
let mockUsers: UserItem[] = [
  { id: 1, name: "Nguyễn Văn A", email: "vana@student.edu.vn", status: "Hoạt động" },
  { id: 2, name: "Lê Văn C", email: "vanlec@student.edu.vn", status: "Khóa" }
];
export const userApi = {
  getUsers: () => Promise.resolve([...mockUsers]),
  toggleStatus: (id: number) => { mockUsers = mockUsers.map(u => u.id === id ? { ...u, status: u.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động' } : u); return Promise.resolve(true); },
  deleteUser: (id: number) => { mockUsers = mockUsers.filter(u => u.id !== id); return Promise.resolve(true); }
};