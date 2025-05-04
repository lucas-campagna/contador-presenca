import { useNavigate } from "react-router";
import Button from "../components/Button";
import ListItem from "../components/ListItem";

function Home() {
  const navigate = useNavigate();

  return (
    <ListItem>
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
    </ListItem>
  );
}

export default Home;
