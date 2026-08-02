"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TerminalState, ConversationMessage } from "@/types/terminal";
import { dispatchCommand } from "@/lib/commands";
import { createLine } from "@/lib/utils";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { MobileCommandBar } from "../ui/MobileCommandBar";

const MAX_CONVERSATION_PAIRS = 10; // Keep last 10 exchanges (20 messages)

function trimConversationHistory(history: ConversationMessage[]): ConversationMessage[] {
  const maxMessages = MAX_CONVERSATION_PAIRS * 2;
  if (history.length <= maxMessages) return history;
  // Trim from the front, keeping the most recent messages
  return history.slice(history.length - maxMessages);
}

export function Terminal() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<TerminalState>({
    history: [],
    commandHistory: [],
    historyIndex: -1,
    currentInput: "",
    isStreaming: false,
    streamBuffer: "",
    isBooting: true,
    conversationHistory: [],
    rickMode: false,
  });

  const fetchChatStream = useCallback(
    async (prompt: string, currentHistory: ConversationMessage[], rickMode: boolean) => {
      setState((s) => ({ ...s, isStreaming: true, streamBuffer: "" }));

      const newMessages = trimConversationHistory([
        ...currentHistory,
        { role: "user" as const, content: prompt },
      ]);
      setState((s) => ({ ...s, conversationHistory: newMessages }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        let finalStreamBuffer = "";
        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          finalStreamBuffer += chunk;
          setState((s) => ({ ...s, streamBuffer: finalStreamBuffer }));
        }

        const updatedHistory = trimConversationHistory([
          ...newMessages,
          { role: "assistant" as const, content: finalStreamBuffer },
        ]);

        setState((s) => ({
          ...s,
          isStreaming: false,
          streamBuffer: "",
          history: [...s.history, createLine(finalStreamBuffer, "rick", "green")],
          conversationHistory: updatedHistory,
        }));

        // Always play Rick's voice for any AI response
        try {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
          const voiceResponse = await fetch("/api/voice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: finalStreamBuffer }),
          });
          if (voiceResponse.ok) {
            const audioBlob = await voiceResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.play().catch(e => console.error("Audio autoplay blocked:", e));
          } else {
            const errData = await voiceResponse.json().catch(() => ({}));
            console.error("Voice API error:", voiceResponse.status, errData);
            if (voiceResponse.status === 429) {
              setState((s) => ({
                ...s,
                history: [...s.history, createLine("Voice module cooling down (Rate limited). Wait a minute.", "system", "amber")],
              }));
            } else {
              setState((s) => ({
                ...s,
                history: [...s.history, createLine("Voice module malfunction (ElevenLabs error).", "system", "red")],
              }));
            }
          }
        } catch (err) {
          console.error("Failed to play Rick voice:", err);
        }
      } catch {
        setState((s) => ({
          ...s,
          isStreaming: false,
          streamBuffer: "",
          history: [...s.history, createLine("Portal connection failed. Rick might be in another dimension.", "error", "red")],
        }));
      }
    },
    []
  );

  useEffect(() => {
    const bootLines = [
      "Loading core modules...",
      "Mounting file system...",
      "Establishing connection to C-137...",
      "Ready.",
    ];

    let delay = 500;
    bootLines.forEach((line) => {
      setTimeout(() => {
        setState((s) => ({
          ...s,
          history: [...s.history, createLine(line, "system", "dim")],
        }));
      }, delay);
      delay += Math.random() * 400 + 200;
    });

    setTimeout(() => {
      setState((s) => ({ ...s, isBooting: false }));
    }, delay + 200);
  }, []);

  const handleCommand = useCallback(
    async (input: string) => {
      if (state.isStreaming || state.isBooting) return;

      const commandLine = createLine(input, "command");
      setState((s) => ({
        ...s,
        history: [...s.history, commandLine],
        commandHistory: input.trim() ? [...s.commandHistory, input] : s.commandHistory,
      }));

      const result = dispatchCommand(input, state.rickMode);

      if (result.type === "clear") {
        setState((s) => ({ ...s, history: [] }));
        return;
      }

      if (result.type === "clear-history") {
        setState((s) => ({ ...s, history: [], conversationHistory: [] }));
        return;
      }

      if (result.type === "mode-change") {
        setState((s) => ({
          ...s,
          rickMode: result.rickMode,
          history: [...s.history, ...result.lines],
        }));
        return;
      }

      if (result.type === "static") {
        setState((s) => ({
          ...s,
          history: [...s.history, ...result.lines],
        }));
        return;
      }

      if (result.type === "stream") {
        fetchChatStream(result.prompt, state.conversationHistory, state.rickMode);
      }
    },
    [state.isStreaming, state.isBooting, state.rickMode, state.conversationHistory, fetchChatStream]
  );

  const promptPrefix = state.rickMode ? "rick@C-137:~$" : "mustafa@portfolio:~$";

  return (
    <main className="w-full h-[100dvh] sm:h-[600px] sm:max-w-terminal-max-width bg-bg-base sm:bg-bg-surface border-none sm:border sm:border-border-subtle sm:rounded-lg sm:shadow-2xl flex flex-col overflow-hidden relative">

      {/* Header Section (Desktop only) */}
      <header className="hidden sm:flex bg-bg-chrome rounded-t-lg w-full border-b border-outline-variant items-center justify-between px-4 h-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-traffic-light-red"></div>
          <div className="w-3 h-3 rounded-full bg-traffic-light-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-traffic-light-green"></div>
        </div>
        <div className="font-label-md text-label-md text-text-secondary cursor-default flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">terminal</span>
          {state.rickMode ? (
            <span className="text-primary-container">rick@C-137: ~</span>
          ) : (
            <span>mustafa@portfolio: ~</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          {state.rickMode && (
            <span className="text-primary-container text-[10px] font-bold tracking-wider animate-pulse">🌀 PORTAL OPEN</span>
          )}
          <span className="material-symbols-outlined hover:bg-bg-hover rounded p-1 cursor-default text-[16px]">code</span>
        </div>
      </header>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-[120px] sm:p-[24px] sm:pb-[24px] flex flex-col gap-4 font-body-md text-body-md scrollbar-hide sm:scrollbar-default geist-mono" id="terminal-output">
        <TerminalOutput
          history={state.history}
          isStreaming={state.isStreaming}
          streamBuffer={state.streamBuffer}
          rickMode={state.rickMode}
        />

        {/* Inline Input for Desktop */}
        <div className="hidden sm:block">
          {!state.isBooting && (
            <TerminalInput
              onSubmit={handleCommand}
              isStreaming={state.isStreaming}
              isDesktop={true}
              rickMode={state.rickMode}
            />
          )}
        </div>

        {/* Fake Active Prompt for Mobile */}
        <div className="sm:hidden">
          {!state.isBooting && !state.isStreaming && (
            <div className="flex items-start gap-2">
              <span className={`shrink-0 ${state.rickMode ? "text-primary-container" : "text-text-secondary"}`}>
                {promptPrefix}
              </span>
              <span className="text-primary-container blink align-middle inline-block w-2 h-4 translate-y-[3px]"></span>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Section (Mobile only) */}
      <div className="fixed sm:hidden bottom-0 left-0 w-full bg-bg-base pt-2 z-50">
        {!state.isBooting && (
          <>
            <MobileCommandBar
              onCommandTap={handleCommand}
              disabled={state.isStreaming}
              rickMode={state.rickMode}
            />
            <div className="bg-bg-chrome border-t border-border-subtle px-4 py-3 flex items-center gap-2">
              <span className={`font-body-md text-body-md font-bold shrink-0 ${state.rickMode ? "text-primary-container" : "text-accent-amber"}`}>
                {state.rickMode ? "🌀" : "$"}
              </span>
              <TerminalInput
                onSubmit={handleCommand}
                isStreaming={state.isStreaming}
                isDesktop={false}
                rickMode={state.rickMode}
              />
            </div>
          </>
        )}
        <div className="h-[env(safe-area-inset-bottom)] bg-bg-chrome"></div>
      </div>
    </main>
  );
}
