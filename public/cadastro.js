$(document).ready(() => {
    $('#formProduto').submit((event) => {
      event.preventDefault();
      const nome = $('#nome').val();
      const preco = $('#preco').val();
  
      $.post('http://localhost:3000/produtos', { nome, preco }, (data) => {
        alert('Produto cadastrado com sucesso!');
        $('#nome').val('');
        $('#preco').val('');
      });
    });
  });
  