export interface User {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  userGroups: { groupId: number, groupName: string, permissions: string[] }[];
  permissions: string[];
}
