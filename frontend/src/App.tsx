import { useEffect, useState } from "react";

// Viteはトランスパイル時にimport.meta.envのプロパティをVITE_から始まる環境変数に置換する
// これを利用して開発環境と本番環境でFetch APIのリクエスト先を切り替えられる
// 参考：https://ja.vite.dev/guide/env-and-mode
const getMessagesApi = `${import.meta.env.VITE_API_ENDPOINT}/messages`;
const postMessageApi = `${import.meta.env.VITE_API_ENDPOINT}/send`;

type Message = { id: number; content: string };

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");

  // コンポーネント読み込み時に処理を実行するにはuseEffectフックを使う
  useEffect(() => {
    const timerId = setInterval(async () => {
      const response = await fetch(getMessagesApi);
      setMessages(await response.json());
    }, 1000 * 5);

    // useEffectフックに指定した関数の戻り値に指定した関数はコンポーネントの破棄時に実行される
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      <input
        value={newMessageContent}
        onChange={(e) => {
          setNewMessageContent(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={async () => {
          await fetch(postMessageApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: newMessageContent }),
          });
        }}
      >
        送信
      </button>
    </>
  );
}

export default App;
