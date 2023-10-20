import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold">
            <span className="text-primary">QnA Doc</span>
          </Link>

          {/* TODO: add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href={"/pricing"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}>
                Pricing
              </Link>

              {!user ? (
                <>
                  <LoginLink
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}>
                    Sign In
                  </LoginLink>

                  <RegisterLink
                    className={buttonVariants({
                      size: "sm",
                    })}>
                    Get Started
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </RegisterLink>
                </>
              ) : (
                <>
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}>
                    Dashboard
                  </Link>

                  <LogoutLink
                    className={buttonVariants({
                      size: "sm",
                    })}>
                    Log out
                  </LogoutLink>
                </>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
