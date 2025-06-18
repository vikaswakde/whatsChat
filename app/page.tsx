import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import ChatCard from "@/components/ChatCard";

export default function Home() {
  return (
    <div
      className={cn(
        GeistSans.className,
        "h-screen flex items-center justify-center bg-black/69"
      )}
    >
      <ChatCard />
    </div>
  );
}
