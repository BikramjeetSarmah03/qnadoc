import { redirect } from "next/navigation";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

import { buttonVariants } from "@/components/ui/button";
import { db } from "../db";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <div>
      {user.email}

      <LogoutLink className={buttonVariants()}>Log out</LogoutLink>
    </div>
  );
}
