async function recuperarListaAluno() {
    try{
        const respostaSevidor = await fetch("http://localhost:3333/lista/alunos");

        if(respostaSevidor.ok){
            const listaDeAlunos = await  respostaSevidor.json();
            criarTabelaAluno(listaDeAlunos);
        }

        return null;
    } catch (Erro){
        console.error(Erro);
        return null;
    }
}

async function criarTabelaAluno(alunos) {
    try{
        const tBody = document.querySelector('tbody');
        alunos.map(aluno => {
            const tr = document.createElement('tr');

            const tdIdAluno = document.createElement('td');
            tdIdAluno.textContent = aluno.idAluno;
            tr.appendChild(tdIdAluno);

            const tdRaAluno = document.createElement('td');
            tdRaAluno.textContent = aluno.ra;
            tr.appendChild(tdRaAluno);

            const tdNomeAluno = document.createElement('td');
            tdNomeAluno.textContent = aluno.nome;
            tr.appendChild(tdNomeAluno);

            const tdDataNascimentoAluno = document.createElement('td');
            tdDataNascimentoAluno.textContent = aluno.dataNascimento;
            tr.appendChild(tdDataNascimentoAluno);

            const tdEnderecoAluno = document.createElement('td');
            tdEnderecoAluno.textContent = aluno.endereco;
            tr.appendChild(tdEnderecoAluno);

            const tdEmailAluno = document.createElement('td');
            tdEmailAluno.textContent = aluno.email;
            tr.appendChild(tdEmailAluno);

            const tdTelefoneAluno = document.createElement('td');
            tdTelefoneAluno.textContent = aluno.celular;
            tr.appendChild(tdTelefoneAluno);

            const tdAcoes = document.createElement('td')
            const imgEditar = document.createElement('img');
            imgEditar.src = "./assets/icons/pencil-square.svg";
            imgEditar.alt = "Editar";
            tdAcoes.appendChild(imgEditar);

            const imgDeletar = document.createElement('td');
            imgDeletar.src = "./assets/icons/trash-fill.svg";
            imgDeletar.alt = "Deletar";
            tdAcoes.appendChild(imgDeletar);

            
            tr.appendChild(tdAcoes);

            tBody.appendChild(tr);
        });
    } catch (Erro){
        console.error(Erro);
        return null;
    }
}