import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="h-full flex flex-col justify-center">
        <div className=" max-w-full w-fit mx-auto">
          <div className="flex flex-col gap-y-4 justify-center">
            <div className="text-center">
              <span className="text-[35px] font-extrabold">Manage Your Expense</span>
              <p className="text-2xl">Start your budget and save money</p>
            </div>
            <Link
              href='auth/login'
              className={clsx(buttonVariants({ size: 'lg' }), 'mx-auto')}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
