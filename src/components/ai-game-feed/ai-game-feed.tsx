import { useForkRef } from "@sk-web-gui/utils";
import React from "react";
import { ChatHistory, ChatHistoryEntry } from "../../types";
import { AIFeedAvatarMap } from "../../types/avatar";
import { AIGameFeedEntry } from "./ai-game-feed-entry";
import { AIGameFeedWrapper } from "./ai-game-feed-wrapper";
import { OriginTitleMap } from "../../types/titles";

export interface AIGameFeedProps extends React.ComponentPropsWithoutRef<"ul"> {
  history: ChatHistory;
  showReferences?: boolean;
  sessionId?: string;
  avatars?: AIFeedAvatarMap;
  showFeedback?: boolean;
  showTitles?: boolean;
  onGiveFeedback?: (value: -1 | 1) => void;
  size?: "sm" | "lg";
  inverted?: boolean;
  titles?: OriginTitleMap;
}

export const AIGameFeed = React.forwardRef<HTMLUListElement, AIGameFeedProps>(
  (props, ref) => {
    const [lastMessage, setLastMessage] = React.useState<
      ChatHistoryEntry | undefined
    >(undefined);
    const [lastOwnMessage, setLastOwnMessage] = React.useState<
      ChatHistoryEntry | undefined
    >(undefined);
    const internalRef = React.useRef<HTMLUListElement>(null);
    const {
      history,
      onGiveFeedback,
      showReferences = true,
      avatars,
      className,
      showFeedback = true,
      showTitles = true,
      sessionId,
      size,
      inverted,
      titles,
      ...rest
    } = props;

    const assistantHistory = React.useMemo(
      () => history.filter((message) => message.origin !== "user"),
      [history]
    );
    const userHistory = React.useMemo(
      () => history.filter((message) => message.origin === "user"),
      [history]
    );

    React.useEffect(() => {
      const latest = assistantHistory.at(-1);

      if (latest?.done && latest.id !== lastMessage?.id) {
        setLastMessage(latest);
      }
    }, [assistantHistory]);

    React.useEffect(() => {
      const latest = userHistory.at(-1);

      if (latest?.done && latest.id !== lastOwnMessage?.id) {
        setLastOwnMessage(latest);
      }
    }, [userHistory]);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.scrollTop = internalRef.current.scrollHeight;
      }
    }, [history]);

    const getBackgroundColor = (entry: ChatHistoryEntry) => {
      switch (entry.text) {
        case "A":
          return "vattjom";
        case "B":
          return "juniskar";
        case "C":
          return "gronsta";
        default:
          return "bjornstigen";
      }
    };

    return (
      <>
        <AIGameFeedWrapper
          ref={useForkRef(ref, internalRef)}
          className={className}
          {...rest}
        >
          {history?.map((entry, index) => (
            <AIGameFeedEntry
              key={`${index}-${entry.id}`}
              entry={entry}
              size={size}
              sessionId={sessionId}
              background={
                entry.origin === "user" ? getBackgroundColor(entry) : "tertiary"
              }
              align={entry.origin === "assistant" ? "left" : "right"}
              asButton={
                entry.origin === "user" && ["A", "B", "C"].includes(entry.text)
              }
            ></AIGameFeedEntry>
          ))}
        </AIGameFeedWrapper>
        <div
          className="sk-ai-feed-live-wrapper"
          aria-live="polite"
          aria-atomic={false}
        >
          {lastMessage && (
            <AIGameFeedEntry
              entry={lastMessage}
              title={titles?.[lastMessage.origin]?.title}
              tabbable={false}
            />
          )}
        </div>
        <div
          className="sk-ai-feed-live-wrapper"
          aria-live="polite"
          aria-atomic={false}
        >
          {lastOwnMessage && (
            <AIGameFeedEntry
              entry={lastOwnMessage}
              title={titles?.[lastOwnMessage.origin]?.title}
              tabbable={false}
            />
          )}
        </div>
      </>
    );
  }
);
