

export class User {
    id: string;
    code: string;
    name: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    age: number;
    roleId: string;
    password: string;
    role: Role;
    roleName: string;
    token: string;
}
export class Role {
    id: string;
    code: string;
    name: string;
    permissionRoles: PermisionRole[]
}

export class PermisionRole {
    permission: Permision;
}
export class Permision {
    id: string;
    code: string;
    name: string;
}