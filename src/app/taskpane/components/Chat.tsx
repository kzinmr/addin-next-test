import { useState } from 'react';

const Chat: React.FC = () => {

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const runOnWord = async (text: string) => {
    try{
      await Word.run(async (context) => {
        context.document.body.insertParagraph(text, Word.InsertLocation.end);
        await context.sync();
      });
    } catch(error) {
      console.log(error);
    };
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, text]);
    runOnWord(text);
    console.log(`Submitting message: ${text}`);
    setText('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          className="border border-gray-400 text-black rounded py-2 px-4 mr-2"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter your message..."
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
          Ask
        </button>
      </form>
      <div>
          {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default Chat;