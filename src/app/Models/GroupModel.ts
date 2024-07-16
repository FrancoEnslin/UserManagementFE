export interface Group {
    groupId: number;
    groupName: string;
    groupDescription: string;
    permissions: Array<string>;
    users: Array<string>
}
