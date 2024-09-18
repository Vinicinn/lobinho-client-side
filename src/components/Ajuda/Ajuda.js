import { useEffect, useState } from "react";
import "./Ajuda.css";

function Ajuda({ socket, onClose }) {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit("solicitarFuncoes");
    socket.on("receberFuncoes", (data) => {
      setFuncoes(data);
      setLoading(false);
    });
  }, [socket]);

  return (
    <>
      <div className="sideBar">
        <h1>INFORMAÇÕES</h1>
        <button className="closeHelpButton" onClick={onClose}>
          x
        </button>
        <p>
          THOBSHOMEM é um jogo inspirado no Wolvesville, também conhecido como
          lobisomem ou cidade dorme.
        </p>
        <p>
          O jogo começa com a distrubuição de funções para os jogadores em duas
          equipes, os Aldeões e os Lobisomens
        </p>
        <p>
          O objetivo da Aldeia é descobrir quem são os infiltrados e eliminá-los
          para que todos sobrevivam
        </p>
        <p>
          O objetivo dos Lobisomens é assassinar todos os Aldeões durante a
          noite e não serem descobertos
        </p>
        <p>A equipe que sobreviver vence!</p>
        <p>O melhor jeito de aprender é jogando. Divirta-se!</p>
        <h3>Funções Ativas:</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="functionsList">
            {funcoes.map((funcao, index) => (
              <li key={index} className="function">
                <p>
                  <b> {funcao.nome}</b>
                </p>
                <p>{funcao.descricao}</p>
                <p>Equipe: {funcao.equipe}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Ajuda;
