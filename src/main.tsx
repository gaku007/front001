import { useState, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  // useStateは、入力内容やログイン状態を覚えるためのReactの機能です。
  // 例：setId('user') とすると、idが変わり、表示も更新されます。
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  // フォームの「ログイン」ボタンを押したときに実行します。
  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // フォーム送信によるページの再読み込みを止めます。

    if (id === 'user' && password === 'pass') {
      setLoggedIn(true);
      setError('');
      setPassword('');
    } else {
      setError('IDまたはパスワードが正しくありません。');
    }
  }

  function logout() {
    setLoggedIn(false);
    setId('');
    setPassword('');
    setError('');
  }

  // returnの中は、画面に表示する内容（JSX）です。
  return (
    <main>
      <h1>ログインの練習</h1>
      <p>お試し用：ID「user」／ パスワード「pass」</p>

      <form onSubmit={login}>
        <label htmlFor="user-id">ID</label>
        <input
          id="user-id"
          autoComplete="username"
          value={id}
          onChange={(event) => setId(event.target.value)}
          disabled={loggedIn}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loggedIn}
          required
        />

        <button type="submit" disabled={loggedIn}>ログイン</button>
      </form>

      {/* loggedInがtrueなら、同じ画面の中にメッセージを表示します。 */}
      <p role="status">{loggedIn ? 'ログイン成功！ ようこそ、userさん。' : '現在ログアウト中です。'}</p>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="button" onClick={logout} disabled={!loggedIn}>ログアウト</button>
    </main>
  );
}

// index.htmlの <div id="root"> に、Appの内容を表示します。
createRoot(document.getElementById('root')!).render(<App />);
