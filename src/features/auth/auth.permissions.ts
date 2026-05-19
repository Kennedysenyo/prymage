import { createAccessControl } from "better-auth/plugins";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  user: ["create", "update:own", "update:any", "delete", "ban", "set-password"],
  lead: ["update", "delete", "assign-staff"],
} as const;

export type Resource = keyof typeof statements;
export type Action<R extends Resource> = (typeof statements)[R][number];

export const fullAc = createAccessControl(statements);

export const adminRole = fullAc.newRole({
  ...adminAc.statements,
  user: ["create", "update:any", "delete", "ban", "set-password"],
  lead: ["update", "delete", "assign-staff"],
});

export const staffRole = fullAc.newRole({
  user: ["update:own", "set-password"],
  lead: ["update"],
});
