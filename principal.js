function cadastrar() {
    let nome = document.getElementById('nome').value;
    let tel = document.getElementById('tel').value;
    let cpf = document.getElementById('CPF').value;
    let cep = document.getElementById('CEP').value;
    let numCasa = document.getElementById('NumCa').value;
    let complemento = document.getElementById('complemento').value;

    const json = {"CPF": cpf, "nome": nome, "telefone": tel, "numeroCasa": numCasa, "complemento": complemento, "CEP": cep};

    axios.post('http://localhost:3000/cidadaos', json)
        .then((e) => {
            location.reload();
            alert("Dados Enviados com sucesso");
        })
        .catch((err) => {
            console.log(err);
        })
}