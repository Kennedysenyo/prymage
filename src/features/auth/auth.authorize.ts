import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { Action, Resource } from "./auth.permissions";

export class UnauthorizedError extends Error {}
export class ForbidenError extends Error {}

type PermissionQuery = { [R in Resource]?: Action<R>[] };

export const requireSession = async () => {
  const res = await auth.api.getSession({
    headers: await headers(),
  });

  if (!res?.user) {
    throw new UnauthorizedError("Unauthorized");
  } else {
    return res;
  }
};

export const requirePermission = async (permissions: PermissionQuery) => {
  const session = await requireSession();

  const check = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions,
    },
  });

  if (!check.success) {
    throw new ForbidenError("Forbiden");
  } else {
    return session;
  }
};

export const requireSelfOrPermission = async <
  R extends Resource,
  OwnA extends Action<R>,
  AnyA extends Action<R>,
>(
  targetedId: string,
  options: {
    resource: R;
    own: OwnA;
    any: AnyA;
  },
) => {
  const session = await requireSession();

  const checkPermissionAny = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        [options.resource]: [options.any],
      } as PermissionQuery,
    },
  });

  if (checkPermissionAny.success) {
    return session;
  }

  const checkPermissionOwn = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        [options.resource]: [options.own],
      } as PermissionQuery,
    },
  });

  if (!checkPermissionOwn.success || session.user.id !== targetedId) {
    throw new ForbidenError("Forbidden");
  }

  return session;
};
