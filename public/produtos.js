$(document).ready(() => {
  $.ajax({
    url: 'http://localhost:3000/produtos',
    type: 'GET',
    cache: false,
    success: (data) => {
      console.log('Dados recebidos do servidor:', data);
      if (Array.isArray(data)) {
        data.forEach((produto) => {
          $('#corpoTabela').append(`
            <tr>
              <td>${produto.nome}</td>
              <td>R$ ${produto.preco}</td>
              <td>
                <button onclick="editarProduto('${produto._id}')">Editar</button>
                <button onclick="deletarProduto('${produto._id}')">Deletar</button>
              </td>
            </tr>
          `);
        });
      } else {
        console.log('Os dados recebidos não são um array:', data);
      }
    },
    error: (xhr, status, error) => {
      console.log('Erro na requisição:', error);
    }
  });
});

function editarProduto(id) {
  const novoNome = prompt('Digite o novo nome do produto:');
  const novoPreco = prompt('Digite o novo preço do produto:');

  if (novoNome && novoPreco) {
    $.ajax({
      url: `http://localhost:3000/produtos/${id}`,
      type: 'PUT',
      data: { nome: novoNome, preco: novoPreco },
      success: (data) => {
        console.log('Produto atualizado:', data);
        // Atualizar a tabela ou a página conforme necessário
        location.reload(); // Recarregar a página após a atualização
      },
      error: (xhr, status, error) => {
        console.log('Erro na requisição:', error);
        alert('Erro ao atualizar o produto. Por favor, tente novamente.');
      }
    });
  } else {
    alert('Nome e preço são campos obrigatórios.');
  }
}

function deletarProduto(id) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    $.ajax({
      url: `http://localhost:3000/produtos/${id}`,
      type: 'DELETE',
      success: (data) => {
        console.log('Produto deletado:', data);
        // Atualizar a tabela ou a página conforme necessário
        location.reload(); // Recarregar a página após a deleção
      },
      error: (xhr, status, error) => {
        console.log('Erro na requisição:', error);
        alert('Erro ao deletar o produto. Por favor, tente novamente.');
      }
    });
  }
}
