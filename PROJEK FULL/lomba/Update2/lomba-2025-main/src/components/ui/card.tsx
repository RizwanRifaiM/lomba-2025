import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="relative">
      {/* Glow Border Container */}
      <div className={cn(
        "animated-border-box-glow absolute inset-0 overflow-hidden rounded-xl z-0",
        className
      )}>
        {/* Animated Border Effect */}
        <div 
          className="absolute top-1/2 left-1/2 w-[99999px] h-[99999px]"
          style={{
            transform: 'translate(-50%, -50%) rotate(0deg)',
            backgroundImage: 'conic-gradient(rgba(0,0,0,0), #1976ed, rgba(0,0,0,0) 25%)',
            animation: 'rotate 4s linear infinite',
          }}
        />
      </div>

      {/* Main Card Content */}
      <div
        data-slot="card"
        className={cn(
          "relative bg-gray-900 text-white flex flex-col gap-6 rounded-lg p-6 shadow-2xl",
          "border border-gray-700/50 transition-all duration-300",
          "after:content-[''] after:absolute after:z-[-1] after:left-[5px] after:top-[5px]",
          "after:w-[calc(100%-10px)] after:h-[calc(100%-10px)] after:bg-gray-900",
          "after:rounded-[7px]"
        )}
        {...props}
      >
        {props.children}
      </div>
    </div>
  );
}



function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 [.border-b]:border-gray-700/50",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold text-white", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-gray-400 text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6 [.border-t]:border-gray-700/50", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}