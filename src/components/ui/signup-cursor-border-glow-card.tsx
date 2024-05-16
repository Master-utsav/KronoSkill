
import React, { useEffect } from "react";
import "@/css/signup_cursor_glow_border_card.css";

export const SignupCursorBorderGlowCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
        className?: string;
  
}) => {
  useEffect(() => {
    const container = document.querySelector(".glow-container") as HTMLElement;
    const cursorGlow = document.createElement("div") as HTMLElement;
    cursorGlow.classList.add("cursor-glow");
    container?.appendChild(cursorGlow);

    const borderOverlay = document.createElement("div");
    borderOverlay.classList.add("border-overlay");
    container?.appendChild(borderOverlay);

    interface BorderParts {
      top: HTMLDivElement;
      right: HTMLDivElement;
      bottom: HTMLDivElement;
      left: HTMLDivElement;
    }
    const borderParts: BorderParts = {
      top: document.createElement("div"),
      right: document.createElement("div"),
      bottom: document.createElement("div"),
      left: document.createElement("div"),
    };

    for (const key in borderParts) {
      if (borderParts.hasOwnProperty(key)) {
        const element = borderParts[key as keyof BorderParts];
        element.classList.add("border-part");
        borderOverlay.appendChild(element);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cursorGlow.style.left = `${x}px`;
      cursorGlow.style.top = `${y}px`;

      const glowRadius = 40;
      const blurRadius = 100;

      for (const key in borderParts) {
        if (borderParts.hasOwnProperty(key)) {
          const element = borderParts[key as keyof BorderParts];
          element.style.opacity = "0";
        }
      }

      if (x - blurRadius < 0) {
        // Left border
        borderParts.left.style.left = "0";
        borderParts.left.style.top = `${Math.max(0, y - glowRadius * 2)}px`;
        borderParts.left.style.height = `${Math.min(
          glowRadius * 4,
          rect.height
        )}px`;
        borderParts.left.style.width = "1px";
        borderParts.left.style.opacity = "1";
      }

      if (x + blurRadius > rect.width) {
        // Right border
        borderParts.right.style.right = "0";
        borderParts.right.style.top = `${Math.max(0, y - glowRadius * 2)}px`;
        borderParts.right.style.height = `${Math.min(
          glowRadius * 4,
          rect.height
        )}px`;
        borderParts.right.style.width = "1px";
        borderParts.right.style.opacity = "1";
      }

      if (y - blurRadius < 0) {
        // Top border
        borderParts.top.style.top = "0";
        borderParts.top.style.left = `${Math.max(0, x - glowRadius * 2)}px`;
        borderParts.top.style.width = `${Math.min(
          glowRadius * 4,
          rect.width
        )}px`;
        borderParts.top.style.height = "1px";
        borderParts.top.style.opacity = "1";
      }

      if (y + blurRadius > rect.height) {
        // Bottom border
        borderParts.bottom.style.bottom = "0";
        borderParts.bottom.style.left = `${Math.max(0, x - glowRadius * 2)}px`;
        borderParts.bottom.style.width = `${Math.min(
          glowRadius * 4,
          rect.width
        )}px`;
        borderParts.bottom.style.height = "1px";
        borderParts.bottom.style.opacity = "1";
      }
    };
    const handleMouseLeave = () => {
      cursorGlow.style.opacity = "0";
      for (const key in borderParts) {
        if (borderParts.hasOwnProperty(key)) {
          const element = borderParts[key as keyof BorderParts];
          element.style.opacity = "0";
        }
      }
    };

    const handleMouseEnter = () => {
      cursorGlow.style.opacity = "1";
    };

    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);
    container?.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
      container?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return <div className={`glow-container ${className}`}>{children}</div>;
};
