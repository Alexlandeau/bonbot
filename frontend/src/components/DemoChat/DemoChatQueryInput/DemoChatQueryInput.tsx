import React, { FC } from "react";
import "./DemoChatQueryInput.css";
import upload from "./up-arrow.png";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface DemoChatQueryInputProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  chatHistory: string;
}

const DemoChatQueryInput: FC<DemoChatQueryInputProps> = (props) => {
  return (
    <div className="DemoChatQueryInput">
      <form
        className="DemoChatQueryInput-Form"
        onSubmit={(e) => props.onSubmit(e)}
      >
        <textarea rows={3} name="query" disabled={props.isLoading}></textarea>
        <input type="hidden" name="chat_history" value={props.chatHistory} />
        {props.isLoading ? (
          <LoadingSpinner />
        ) : (
          <button type="submit">
            <img src={upload} alt="Submit query" />
          </button>
        )}
      </form>
    </div>
  );
};

export default DemoChatQueryInput;
