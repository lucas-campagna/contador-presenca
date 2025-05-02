import { useNavigate } from "react-router";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <div className="flex flex-col items-stretch gap-2">
        <Button
          text="Marcar Presenças"
          onClick={() => navigate("/admin/presencas")}
        />
        <Button
          text="Criar Turma"
          onClick={() => navigate("/admin/criar-turma")}
        />
        <Button
          text="Registrar Aluno"
          onClick={() => navigate("/admin/registrar-aluno")}
        />
        <Button
          text="Registrar Professor"
          onClick={() => navigate("/admin/registrar-professor")}
        />
      </div>
    </div>
  );
}

export default Home;
