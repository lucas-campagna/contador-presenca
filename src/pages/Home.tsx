import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.papel === "admin";

  const Button = ({ text, disabled, onClick }: ButtonProps) => (
    <button
      className={
        !disabled
          ? "bg-primary text-white p-4 m-2 rounded"
          : "bg-gray-400 text-white p-4 m-2 rounded"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Button
        text="Registrar Presença"
        onClick={() => navigate("/admin/presencas")}
      />
      <Button
        text="Criar Turma"
        disabled={!isAdmin}
        onClick={() => navigate("/admin/criar-turma")}
      />
      <Button
        text="Registrar Aluno"
        disabled={!isAdmin}
        onClick={() => navigate("/admin/registrar-aluno")}
      />
      <Button
        text="Registrar Professor"
        disabled={!isAdmin}
        onClick={() => navigate("/admin/registrar-professor")}
      />
    </div>
  );
}

export default Home;
