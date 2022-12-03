import { Link } from "react-router-dom";

export function BlankPage() {
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      Selecione ou crie um arquivo
      <Link to="/document">Go Document</Link>
    </main>
  );
}
