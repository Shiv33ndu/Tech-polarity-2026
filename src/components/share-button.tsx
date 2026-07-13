"use client";

import { useEffect, useState } from "react";
import { Share2, Link2, Mail, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  path: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg";
  /** Small blue pill with just an icon + "Share" label, for use inside article cards. */
  iconOnly?: boolean;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.168L2 22l4.963-1.412A9.943 9.943 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.062a8.02 8.02 0 0 1-4.328-1.264l-.31-.19-3.02.859.83-3.016-.202-.31A8.02 8.02 0 0 1 3.938 12c0-4.45 3.613-8.062 8.063-8.062S20.062 7.55 20.062 12 16.451 20.062 12.001 20.062z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

export function ShareButton({
  title,
  path,
  variant = "outline",
  size = "default",
  iconOnly = false,
}: ShareButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  // Radix's DropdownMenuTrigger opens on pointerdown, which fires before our
  // click handler — so we can't decide "native share vs. dropdown" from
  // inside a click handler on the trigger. Detect support up front instead
  // and render either a plain button (native share) or the dropdown, never
  // both wired to the same trigger.
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const getUrl = () =>
    typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  // Stop the click from bubbling to a parent <Link> (article cards wrap
  // themselves in a Link), otherwise it'd navigate to the article instead
  // of opening the share menu / native share sheet.
  function stopCardNavigation(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleNativeShare(e: React.MouseEvent) {
    stopCardNavigation(e);
    navigator.share({ title, url: getUrl() }).catch(() => {});
  }

  async function copyLink() {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ description: "Link copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ description: "Couldn't copy link", variant: "destructive" });
    }
  }

  function openShareWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  }

  const url = getUrl();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  if (canNativeShare) {
    return iconOnly ? (
      <button
        onClick={handleNativeShare}
        title="Share article"
        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors w-fit bg-secondary text-muted-foreground hover:bg-secondary/80"
      >
        <Share2 className="h-3 w-3" />
        Share
      </button>
    ) : (
      <Button
        variant={variant}
        size={size}
        className="rounded-full gap-2"
        onClick={handleNativeShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {iconOnly ? (
          <button
            onClick={stopCardNavigation}
            title="Share article"
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors w-fit bg-secondary text-muted-foreground hover:bg-secondary/80"
          >
            <Share2 className="h-3 w-3" />
            Share
          </button>
        ) : (
          <Button
            variant={variant}
            size={size}
            className="rounded-full gap-2"
            onClick={stopCardNavigation}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() =>
            openShareWindow(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`)
          }
          className="gap-2 cursor-pointer"
        >
          <WhatsAppIcon />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShareWindow(
              `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
            )
          }
          className="gap-2 cursor-pointer"
        >
          <XIcon />
          X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShareWindow(
              `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
            )
          }
          className="gap-2 cursor-pointer"
        >
          <FacebookIcon />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShareWindow(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
            )
          }
          className="gap-2 cursor-pointer"
        >
          <LinkedInIcon />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>
            <Mail className="h-4 w-4 shrink-0" />
            Email
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink} className="gap-2 cursor-pointer">
          {copied ? (
            <Check className="h-4 w-4 shrink-0" />
          ) : (
            <Link2 className="h-4 w-4 shrink-0" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
