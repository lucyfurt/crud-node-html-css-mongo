$(document).ready(function() {
    $('#formLogin').submit(function(event) {
      event.preventDefault();
  
      const email = $('#email').val();
      const password = $('#password').val();
      console.log('Dados do formulário:', { email, password })
  
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login', // Rota de login no seu servidor
        data: JSON.stringify({ email, password }),
        contentType: 'application/json',
        success: function(response) {
          // Sucesso no login, redireciona para outra página ou executa ações necessárias
          console.log('Login realizado com sucesso');
          console.log(response); // Aqui você pode lidar com o token retornado pelo servidor
        },
        error: function(err) {
          // Erro no login, exibe mensagem de erro ou executa ações necessárias
          console.error('Erro ao realizar login:', err.responseJSON.error);
        }
      });
    });
  });
  