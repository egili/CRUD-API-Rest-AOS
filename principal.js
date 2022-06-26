var attCpf ;

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

    this.attCpf = cpf;
    console.log(attCpf)
    document.location.assign('http://127.0.0.1:5500/alterar2.html')
}

function alterar2() {
    let nome = document.getElementById('nome').value;
    let tel = document.getElementById('tel').value;
    let cep = document.getElementById('CEP').value;
    let numCasa = document.getElementById('NumCa').value;
    let complemento = document.getElementById('complemento').value;
    console.log(attCpf)
    const json = {"CPF": attCpf, "nome": nome, "telefone": tel, "numeroCasa": numCasa, "complemento": complemento, "CEP": cep};

    axios.put('http://localhost:3000/cidadaos/' + attCpf, json)
    .then((e) => {
        alert("Dados Enviados com sucesso");
    })
    .catch((err) => {
        console.log(err);
    })
}

function deletar() {
    let cpf = document.getElementById('cpf').value;
    console.log(cpf)
    axios.delete('http://localhost:3000/cidadaos/' + cpf)
    .then((e) => {
        alert("Cidadão deletado");
    })
    .catch((err) => {
        console.log(err);
    })
}

function get() {
    let cpf = document.getElementById('cpf').value;

    axios.get('http://localhost:3000/cidadaos/' + cpf)
    .then(result => {
            let data = result.data;
            console.log(result.data)
        if(data != undefined){
            const newTr = document.createElement('tr');

            newTr.innerHTML =  `<td>${data[0].CPF}</td> 
                                <td>${data[0].nome}</td>
                                <td>${data[0].telefone}</td>
                                <td>${data[0].numeroCasa}</td>
                                <td>${data[0].complemento}</td>
                                <td>${data[0].CEP}</td>`          
                                
            document.querySelector("tbody#tabelaDados").appendChild(newTr);
        }
        })

    .catch((err) => {
        console.log(err);
    })
}

function getAll() {
    axios.get('http://localhost:3000/cidadaos')
    .then(result => {
        let data = result.data;

        for(let d of data) {
            const newTr = document.createElement('tr');

            newTr.innerHTML =  `<td>${d.CPF}</td> 
                                <td>${d.nome}</td>
                                <td>${d.telefone}</td>
                                <td>${d.numeroCasa}</td>
                                <td>${d.complemento}</td>
                                <td>${d.CEP}</td>`          
                                
            document.querySelector("tr#tabelaDados").appendChild(newTr);
        }
        alert("Select *");
    })
    .catch(error => {
        console.log(error);
    })
}