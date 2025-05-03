import { useNavigate } from "react-router";
import Button from "../components/Button";
import ListItem from "../components/ListItem";

function Home() {
  const navigate = useNavigate();

  return (
    <ListItem>
      <Button
        text="Marcar Presenças"
        onClick={() => navigate("/admin/presencas")}
      />
      <Button
        text="Criar Turma"
        onClick={() => navigate("/admin/criar-turma")}
      />
      <Button
        text="Alunos"
        onClick={() => navigate("/admin/alunos")}
      />
      <Button
        text="Registrar Professor"
        onClick={() => navigate("/admin/registrar-professor")}
      />
    </ListItem>
  );
}

export default Home;
