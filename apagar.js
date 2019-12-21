//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
	$(document).ready (function() { 
        if(window.indexedDB) {
                var db = null;
                var objBanco = window.indexedDB.open("contratosApp", 3);
                objBanco.onsuccess = function(evento){
                    console.log("Conexão realizada com sucesso!");
                    var db = evento.target.result;
                    
                    //CONSULTA
                    var tx = db.transaction(["contratos"], "readonly");
                    var contratoStore = tx.objectStore("contratos");
                  

                    var iCodigo = parseInt(getUrlParameter("codigo"));
                    console.log(iCodigo);
            
                    var objConsulta = contratoStore.get(iCodigo);
                    objConsulta.onsuccess = function() {
                         var registro = objConsulta.result;
                        console.log(registro);
                        $("#dataIni").html(registro.dataIni.substring(8,10)+"/"+
                            registro.dataIni.substring(5,7)+"/"+
                            registro.dataIni.substring(0,4));
                        $("#dataFim").html(registro.dataFim.substring(8,10)+"/"+
                            registro.dataFim.substring(5,7)+"/"+
                            registro.dataFim.substring(0,4));
                        $("#tipoImo").html(registro.tipoImo);
                        $("#Endereco").html(registro.Endereco);
                        $("#tipoVal").html(registro.tipoVal);
                        $("#valor").html(("R$ "+registro.valor).replace(".",","));
                        $("#descricao").html(registro.descricao);         
            
                    };
                    
                    //Atualizar no banco de dados
                    $("#botao").click(function(){
                                        var txt = db.transaction(["contratos"], "readwrite");
                                        var contratoUpdate = txt.objectStore("contratos");
                                        contratoUpdate.delete(iCodigo);
                                        window.location.href="index.html";

                                });
                    }
                
        }

    });