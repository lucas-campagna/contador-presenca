import { useNavigate } from "react-router";
import Button from "../components/Button";
import ListContainer from "../components/ListContainer";

function Home() {
  const navigate = useNavigate();

  return (
    <ListContainer>
      <Button
        label="Marcar Presenças"
        onClick={() => navigate("/admin/presencas")}
      />
      <Button
        label="Criar Turma"
        onClick={() => navigate("/admin/criar-turma")}
      />
      <Button
        label="Alunos"
        onClick={() => navigate("/admin/alunos")}
      />
      <Button
        label="Registrar Professor"
        onClick={() => navigate("/admin/registrar-professor")}
      />
    </ListContainer>
  );
}

export default Home;
