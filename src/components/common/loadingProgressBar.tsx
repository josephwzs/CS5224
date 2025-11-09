import { Progress } from "../ui/progress";
import "./loadingProgressBar.css";

export function LoadingProgressBar() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-muted relative h-2 w-48 overflow-hidden rounded-full">
        <Progress className="progress-indeterminate bg-muted-foreground w-1/3"></Progress>
      </div>
    </div>
  );
}
