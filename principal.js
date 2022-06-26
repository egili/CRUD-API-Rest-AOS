let attCpf;

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
            alert("Dados Enviados com sucesso");
        })
        .catch((err) => {
            console.log(err);
        })
}

function alterar() {
    let cpf = document.getElementById('CPF').value;

    attCpf = cpf;

    document.location.assign('http://127.0.0.1:5500/alterar2.html')
}

function alterar2() {
    let nome = document.getElementById('nome').value;
    let tel = document.getElementById('tel').value;
    let cep = document.getElementById('CEP').value;
    let numCasa = document.getElementById('NumCa').value;
    let complemento = document.getElementById('complemento').value;

    const json = {"CPF": attCpf, "nome": nome, "telefone": tel, "numeroCasa": numCasa, "complemento": complemento, "CEP": cep};

    axios.put(`http://localhost:3000/cidadaos/${attCpf}`, json)
    .then((e) => {
        alert("Dados Enviados com sucesso");
    })
    .catch((err) => {
        console.log(err);
    })
}

document.getElementById('btnAtt').addEventListener('click', alterar);