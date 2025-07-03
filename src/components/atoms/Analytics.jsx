import Ollama from "../assets/icons/Ollama";
import ClaudeAI from "../assets/icons/ClaudeAI";
import OpenAI from "../assets/icons/OpenAI";
import GeminiAI from "../assets/icons/GeminiAI";

export default function Analytics() {
  return (
    <ul className="flex gap-10 justify-start px-6 pt-6 w-full text-5xl">
      <OpenAI />
      <Ollama />
      <ClaudeAI />
      <GeminiAI />
    </ul>
  );
}
