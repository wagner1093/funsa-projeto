import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  size?: "small" | "large";
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface CollapseGroupProps {
  multiple?: boolean;
  children: React.ReactNode;
}

const Collapse = ({ size = "large", title, children, defaultExpanded, isOpen, onToggle, className }: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [_isOpen, set_isOpen] = useState(defaultExpanded || false);

  useEffect(() => {
    if (isOpen !== undefined) {
      set_isOpen(isOpen);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      set_isOpen(!_isOpen);
    }
  };

  return (
    <div className={cn("border border-border/50 rounded-xl bg-card transition-shadow", _isOpen && "shadow-md", className)}>
      <div className={cn("px-6", size === "small" ? "py-3" : "py-5")}>
        <button
          onClick={handleToggle}
          className="cursor-pointer w-full transition"
        >
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-left font-semibold text-foreground",
              size === "small" ? "text-sm" : "text-base"
            )}>
              {title}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                _isOpen && "rotate-180"
              )}
            />
          </div>
        </button>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: _isOpen ? contentRef.current?.scrollHeight ? `${contentRef.current.scrollHeight}px` : "500px" : "0px",
          opacity: _isOpen ? 1 : 0,
        }}
      >
        <div className={cn("px-6 pb-5", size === "small" ? "text-sm" : "text-base")}>
          {children}
        </div>
      </div>
    </div>
  );
};

const CollapseGroup = ({ multiple = false, children }: CollapseGroupProps) => {
  const collapses = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CollapseProps> =>
      React.isValidElement(child) && "props" in child
  );

  const [openStates, setOpenStates] = useState<boolean[]>(() =>
    collapses.map((child) => child.props.defaultExpanded || false)
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) =>
      multiple
        ? prev.map((state, i) => (i === index ? !state : state))
        : prev.map((state, i) => (i === index ? !state : false))
    );
  };

  return (
    <div className="space-y-3">
      {collapses.map((child, index) =>
        React.cloneElement(child, {
          key: index,
          isOpen: openStates[index],
          onToggle: () => handleToggle(index),
        })
      )}
    </div>
  );
};

export { CollapseGroup, Collapse };
