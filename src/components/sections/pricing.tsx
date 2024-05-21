import Link from "next/link";
import { getUserSubscriptionPlan } from "~/lib/subscription";
import { cn } from "~/lib/utils";
import { validateRequest } from "~/server/auth";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckIcon } from "@heroicons/react/24/solid"; // Ensure you have heroicons installed

export default async function Pricing() {
  const { user } = await validateRequest();

  const subscription = user ? await getUserSubscriptionPlan(user.id) : null;
  return (
    <section>
      <div className="container space-y-6 py-14 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl">Pricing</h2>
          <p className="max-w-[85%] text-balance leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Choose the plan that’s right for you and start enjoying it all.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <Card
            className={cn(
              "relative w-full border border-gray-700 transition duration-200 ease-in-out hover:shadow-lg xl:w-[300px]  ",
              "hover:border-purple-700 hover:shadow-lg"
            )}
          >
            <CardHeader>
              <CardTitle>
                Free Plan{" "}
                {subscription && !subscription?.isPro && (
                  <Badge className=" absolute right-0 top-0 m-4">Current</Badge>
                )}
              </CardTitle>
              <div className="my-4 text-5xl font-bold tracking-tight text-primary">
                $0
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {" "}
                  /month
                </span>
              </div>
            </CardHeader>
            <CardDescription className="px-6 py-4">
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> Unlimited
                  access to non-premium tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> 10 free
                  credits for premium tools, chatbot, and analysis API
                </li>
              </ul>
            </CardDescription>

            <CardFooter className=" justify-center">
              {!subscription ? (
                <Link href="/login" className={cn(buttonVariants(), "w-full")}>
                  Get Started
                </Link>
              ) : (
                ""
              )}
            </CardFooter>
          </Card>
          <Card
            className={cn(
              "relative w-full border border-gray-200 transition duration-200 ease-in-out hover:shadow-lg xl:w-[300px]  ",
              "hover:border-purple-700 hover:shadow-lg"
            )}
          >
            <CardHeader>
              <CardTitle>
                Pro Plan{" "}
                {subscription && !subscription?.isPro && (
                  <Badge className=" absolute right-0 top-0 m-4">Current</Badge>
                )}
              </CardTitle>
              <div className="my-4 text-5xl font-bold tracking-tight text-primary">
                $25
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {" "}
                  /month
                </span>
              </div>
            </CardHeader>
            <CardDescription className="px-6 py-4">
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> Unlimited
                  access to non-premium tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> 250 credits
                  for premium tools, chatbot, and channel analytics.
                </li>
              </ul>
            </CardDescription>
            <CardFooter className=" justify-center">
              <Link href="/login" className={cn(buttonVariants(), "w-full")}>
                {!subscription
                  ? "Get Started"
                  : subscription?.isPro
                    ? "Manage Plan"
                    : "Upgrade Plan"}
              </Link>
            </CardFooter>
          </Card>

          <Card
            className={cn(
              "relative w-full border border-gray-700 transition duration-200 ease-in-out hover:shadow-lg xl:w-[300px]  ",
              "hover:border-purple-700 hover:shadow-lg"
            )}
          >
            <CardHeader>
              <CardTitle>
                Premium Plan{" "}
                {subscription && !subscription?.isPro && (
                  <Badge className=" absolute right-0 top-0 m-4">Current</Badge>
                )}
              </CardTitle>
              <div className="my-4 text-5xl font-bold tracking-tight text-primary">
                $60
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {" "}
                  /month
                </span>
              </div>
            </CardHeader>
            <CardDescription className="px-6 py-4">
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> Unlimited
                  access to non-premium tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" /> 750 credits
                  for premium tools, chatbot, and analysis API.{" "}
                </li>
              </ul>
            </CardDescription>
            <CardFooter className=" justify-center">
              <Link href="/login" className={cn(buttonVariants(), "w-full")}>
                {!subscription
                  ? "Get Started"
                  : subscription?.isPro
                    ? "Manage Plan"
                    : "Upgrade Plan"}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
