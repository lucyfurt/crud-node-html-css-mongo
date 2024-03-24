$(document).ready(function() {
  $('#formRegister').submit(function(event) {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();
    const confirm_password = $('#confirm_password').val();

    console.log('Dados do formulário:', { email, password, confirm_password }); // Depuração: Verifica os dados do formulário

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/register', // Rota de registro no seu servidor
      data: JSON.stringify({ email, password, confirm_password }),
      contentType: 'application/json',
      success: function(response) {
        // Sucesso no registro, redireciona para outra página ou executa ações necessárias
        console.log('Registro realizado com sucesso');
        console.log('Resposta do servidor:', response); // Depuração: Verifica a resposta do servidor
        // Aqui você pode lidar com a resposta do servidor, por exemplo, redirecionar para a página de login
      },
      error: function(xhr, status, error) {
        // Erro no registro, exibe mensagem de erro ou executa ações necessárias
        console.error('Erro ao realizar registro:', error); // Exibe o erro específico retornado pelo servidor
        if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
          console.error('Detalhes do erro:', xhr.responseJSON.error); // Exibe detalhes adicionais do erro (se disponíveis)
        }
      }
    });
  });
});
