//Só carrega quando o HTML estiver pronto.
window.onload = function(){
//Inicialização do banco de dados
	var botao = document.getElementById("botao");
	
	if(window.indexedDB) {
		var db = null;
		var objBanco = window.indexedDB.open("contratosApp", 3);
		objBanco.onsuccess = function(evento){
			console.log("Conexão realizada com sucesso!");
			db = evento.target.result;
		}
		
		objBanco.onerror = function(evento){
			console.log("Erro na conexão com banco de dados");
		}
		
		objBanco.onupgradeneeded = function(evento){
			db = evento.target.result;
			var objContratos = db.createObjectStore("contratos", 
			{ keyPath: "codigo", autoIncrement: true });
		}
		
		//Quando o usuário clicar no botão..
		botao.onclick = function() {
			//Capturar os valores do formulário..
			var sDataIni = 
			document.getElementById("dataIni").value;
			var sDataFim = 
			document.getElementById("dataFim").value;
			var sTipoImo = 
			document.getElementById("tipoImo").value;
			var sEndereco = 
			document.getElementById("Endereco").value;
			var fValor = 
			parseFloat(document.getElementById("valor").value);
			var sTipoVal = 
			document.getElementById("tipoVal").value;
			var sDescricao = 
			document.getElementById("descricao").value;
			console.log(sDataIni+sDataFim+sTipoImo+fValor+sTipoVal+sDescricao);
			
			//JSON
			var contrato = {	dataIni: sDataIni,
							dataFim: sDataFim,
						   	tipoImo: sTipoImo,
							Endereco: sEndereco,
							valor: fValor,
							tipoVal: sTipoVal,   
				   			descricao: sDescricao   
							};
			console.log(contrato);
			
			var tx = db.transaction(["contratos"], "readwrite");
			var contratoStore = tx.objectStore("contratos");
			contratoStore.put(contrato);
			
			window.location.href = "index.html";
		}
	} else {
		console.log("Banco de dados IndexedDB não suportado");
	}

	//Comando para registrar no console
	console.log("Alô mundo!");

	/*
	Chamar o botão de "Adicionar despesa"
	*/

	//Quando o usuário passar o mouse no botão..
	botao.onmouseover = function(){
		botao.value = "Adicionar Contrato";
	}

	//Quando o usuário tirar o mouse no botão..
	botao.onmouseout = function(){
		botao.value = "Adicione Contrato";
	}	
	

	
	
}