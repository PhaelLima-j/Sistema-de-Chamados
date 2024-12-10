    document.querySelector('.btn-submit').addEventListener('click', function(event) {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const identificador = document.getElementById('identificador').value;
        const urgencia = document.getElementById('urgencia').value;
        const gravidade = document.getElementById('gravidade').value;
        const dataChamado = document.getElementById('dataChamado').value;
        const ferramenta = document.getElementById('ferramenta').value;
        const ambiente = document.querySelector('input[name="ambiente"]:checked') ? document.querySelector('input[name="ambiente"]:checked').value : '';
        const emails = document.getElementById('emails').value;
        const descricao = document.getElementById('descricao').value;

        fetch('/criar-chamado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                identificador,
                urgencia,
                gravidade,
                dataChamado,
                ferramenta,
                ambiente,
                emails,
                descricao
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.id) {
                alert('Chamado criado com sucesso!');
            } else {
                alert('Falha ao criar chamado!');
            }
            console.log('Resposta:', data);
        })
        .catch(error => {
            alert('Erro ao criar chamado: ' + error.message);
            console.error('Erro ao criar chamado:', error);
        });
    });

