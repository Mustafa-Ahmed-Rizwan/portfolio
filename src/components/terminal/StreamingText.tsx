interface StreamingTextProps {
  content: string;
}

export function StreamingText({ content }: StreamingTextProps) {
  return (
    <div className="pl-4 border-l-2 border-outline-variant my-2">
      <span className="text-primary-container font-bold">&gt; Rick: </span>
      <span className="text-primary-container whitespace-pre-wrap break-words">
        {content}
        <span className="inline-block w-2 h-4 bg-primary-container ml-1 blink align-middle translate-y-[2px]"></span>
      </span>
    </div>
  );
}
