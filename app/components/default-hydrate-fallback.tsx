import { Spinner } from "./ui/spinner";

export function DefaultHydrateFallback() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[calc(100vh-100px)]">
      <Spinner />
    </div>
  );
};