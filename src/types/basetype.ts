export interface Permission{
    id: string;
    roleId: string;
    userId: string;
    resourceId: string;
    resourceName: string;
    actions: string;
}

export interface ComboBoxData {
    id: string;
    value: string;
}