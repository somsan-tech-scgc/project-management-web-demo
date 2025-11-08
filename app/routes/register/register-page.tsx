import { GalleryVerticalEnd } from "lucide-react";

import { redirect } from "react-router";
import { RegisterForm } from "./register-form";

export function meta() {
  return [
    { title: "Register to your account" },
  ];
}

export async function clientLoader() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return redirect("/");
  }

  return null;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function LoginPage() {
  return (
    <>
      <div className="relative">
        <div className="grid min-h-svh lg:grid-cols-2 absolute inset-0">
          <div className="bg-background flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="bg-none text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <span className="font-semibold text-lg text-primary">
                  Project Gate Review
                </span>
              </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <RegisterForm />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/50 bg-blend-darken backdrop-brightness-75"></div>
            <video
              onLoad={function (element) {
                element.currentTarget.playbackRate = 0.75;
              }}
              src="/login.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </>
  );
}
