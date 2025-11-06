export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export const users: User[] = [
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", company: "Romaguera-Crona" },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", company: "Deckow-Crist" },
  { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", company: "Romaguera-Jacobson" },
  { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", company: "Robel-Corkery" }
];

export function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}
