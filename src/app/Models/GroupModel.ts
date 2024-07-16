export interface Group {
    id: number;
    groupName: string;
    groupDescription: string;
    permissions: Array<string>;
    users: Array<string>
}
