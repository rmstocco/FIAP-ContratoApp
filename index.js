//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
	$(document).ready (function() { 
if(window.indexedDB) {
		var db = null;
		//var contador = 0;
		//if(contador==0) {
		//	$("#tabela").hide();
		//	$("#alerta").show();
		//}else{
		//	$("#tabela").show();
		//	$("#alerta").hide();
		//}

		var objBanco = window.indexedDB.open("contratosApp", 3);
		objBanco.onsuccess = function(evento){
			console.log("Conexão realizada com sucesso!");
			db = evento.target.result;
			
	

			//CONSULTA
			var tx = db.transaction(["contratos"], "readonly");
			var contratoStore = tx.objectStore("contratos");
			
			var request = contratoStore.openCursor();
			request.onerror = function(evento){
				console.log("Erro na consulta");
			}
			
			var tabela = document.getElementById("tabela");
			
			

			//Caso a requisição deu certo!
			request.onsuccess = function(evento){
				var cursor = evento.target.result;
				if(cursor){
					var linha 			= tabela.insertRow(-1);
					var celDataIni 	 	= linha.insertCell(0);
					var celDataFim 	 	= linha.insertCell(1);
					var celTipoImo 	 	= linha.insertCell(2);
					var celEndereco 	= linha.insertCell(3);
					var celValor 	 	= linha.insertCell(4);
					var celTipoVal	 	= linha.insertCell(5);
					var celDescricao 	= linha.insertCell(6);
					var celBotoes 	 	= linha.insertCell(7);
					
					var contrato = cursor.value;
					console.log(contrato);
					
					var sDataIni=contrato.dataIni.substring (8,10)+"/"+
					contrato.dataIni.substring (5,7)+"/"+
					contrato.dataIni.substring (0,4);
					celDataIni.innerHTML 		= sDataIni;
					var sDataFim=contrato.dataFim.substring (8,10)+"/"+
					contrato.dataFim.substring (5,7)+"/"+
					contrato.dataFim.substring (0,4);
					celDataFim.innerHTML 		= sDataFim;
					celTipoImo.innerHTML 		= contrato.tipoImo;
					celEndereco.innerHTML  		= contrato.Endereco;
					var sValor ="R$ "+contrato.valor
					celValor.innerHTML 			= sValor.replace(".",",");
					celTipoVal.innerHTML 		= contrato.tipoVal;
					celDescricao.innerHTML  	= contrato.descricao;
					celBotoes.innerHTML="<a class='btn btn-outline-warning' href='editar.html?codigo="+contrato.codigo+"'>Editar</a>"+"   "+"<a class='btn btn-outline-danger' href='apagar.html?codigo="+contrato.codigo+"'>Apagar</a>";
					
					//contador++;
					//console.log(contador);

					cursor.continue();
					
				}
			}

			
			
		}
		
		objBanco.onerror = function(evento){
			console.log("Erro na conexão com banco de dados");
		}
		
		objBanco.onupgradeneeded = function(evento){
			db = evento.target.result;
			var objContratos = db.createObjectStore("contratos", 
			{ keyPath: "codigo", autoIncrement: true });
		}
	} else {
		console.log("Banco de dados IndexedDB não suportado");
	}		
});