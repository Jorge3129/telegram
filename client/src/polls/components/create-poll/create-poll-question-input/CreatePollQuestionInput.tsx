import { FC, useEffect, useRef } from "react";
import "./CreatePollQuestionInput.scss";

interface Props {
  question: string;
  setQuestion: (value: string) => void;
}

const CreatePollQuestionInput: FC<Props> = ({ question, setQuestion }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="create_poll_section">
      <label htmlFor="question" className="create_poll_label">
        Question
      </label>

      <input
        ref={inputRef}
        type="text"
        name="question"
        className="create_poll_input"
        placeholder="Ask a question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
    </div>
  );
};

export default CreatePollQuestionInput;
