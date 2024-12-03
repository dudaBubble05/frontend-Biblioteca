async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "isbn": Number(document.querySelectorAll("input")[3].value),
        "anoPublicacao": Number(document.querySelectorAll("input")[4].value),
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusEmprestimo": Number(document.querySelectorAll("input")[8].value)
    }
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/livros", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Responsável por recuperar as informações do servidor
async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch('http://localhost:3333/lista/livros');

        if(respostaServidor.ok) {
            const listaDeLivros = await respostaServidor.json();
            criarTabelaLivros(listaDeLivros);
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function criarTabelaLivros(livros) {
    try{
        const tBody = document.querySelector(`tbody`);

        livros.map(livro => {
            const tr = document.createElement('tr');

            const tdIdLivro = document.createElement('td');
            tdIdLivro.innerText = livro.IdLivro;
            tr.appendChild(tdIdLivro);

            const tdTituloLivro = document.createElement('td');
            tdTituloLivro.innerText = livro.titulo;
            tr.appendChild(tdTituloLivro);

            const tdAutorLivro = document.createElement('td');
            tdAutorLivro.innerText = livro.autor;
            tr.appendChild(tdAutorLivro);

            const tdEditoraLivro = document.createElement('td');
            tdEditoraLivro.innerText = livro.editora;
            tr.appendChild(tdEditoraLivro)

            const tdIsbnLivro = document.createElement('td');
            tdIsbnLivro.innerText = livro.isbn;
            tr.appendChild(tdIsbnLivro);

            const tdAnoPublicacaoLivro = document.createElement('td');
            tdAnoPublicacaoLivro.innerText = livro.anoPublicacao;
            tr.appendChild(tdAnoPublicacaoLivro);

            const tdQuantTotalLivro = document.createElement('td');
            tdQuantTotalLivro.innerText = livro.quantTotal;
            tr.appendChild(tdQuantTotalLivro);

            const tdQuantDisponivelLivro = document.createElement('td');
            tdQuantDisponivelLivro.innerText = livro.quantDisponivel;
            tr.appendChild(tdQuantDisponivelLivro);

            const tdValorAquisicaoLivro = document.createElement('td');
            tdValorAquisicaoLivro.innerText = livro.valorAquisicao;
            tr.appendChild(tdValorAquisicaoLivro);
            
            const tdStatusEmprestimoLivro = document.createElement('td');
            tdStatusEmprestimoLivro.innerText = livro.statusLivroEmprestado;
            tr.appendChild(tdStatusEmprestimoLivro);

            const tdAcoes = document.createElement('td')
            const imgEditar = document.createElement('img');
            imgEditar.src = "./assets/icons/pencil-square.svg";
            imgEditar.alt = "Editar";
            tdAcoes.appendChild(imgEditar);

            const imgDeletar = document.createElement('td');
            imgDeletar.src = "./assets/icons/trash-fill.svg";
            imgDeletar.al = "Deletar";
            tdAcoes.appendChild(imgDeletar);

            
            tr.appendChild(tdAcoes);

            tBody.appendChild(tr);
        });

    }catch(Error) {
        console.error(Error);
        return null;
    }
}