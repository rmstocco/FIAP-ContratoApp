//Só carrega quando o HTML estiver pronto.
//window.onload = function(){
	$(document).ready (function() { 
        if(window.indexedDB) {
                var db = null;
                var objBanco = window.indexedDB.open("contratosApp", 3);
                objBanco.onsuccess = function(evento){
                    console.log("Conexão realizada com sucesso!");
                    db = evento.target.result;
                    
                    //CONSULTA
                    var tx = db.transaction(["contratos"], "readonly");
                    var contratoStore = tx.objectStore("contratos");
                  

                    var iCodigo = parseInt(getUrlParameter("codigo"));
                    console.log(iCodigo);
            
                    var objConsulta = contratoStore.get(iCodigo);
                    objConsulta.onsuccess = function() {
                         var registro = objConsulta.result;
                        console.log(registro);
                        $("#dataIni").val(registro.dataIni);
                        $("#dataFim").val(registro.dataFim);
                        $("#tipoImo").val(registro.tipoImo);
                        $("#Endereco").val(registro.Endereco);
                        $("#tipoVal").val(registro.tipoVal);
                        $("#valor").val(registro.valor);
                        $("#descricao").val(registro.descricao);
                        $("#tipo").val(registro.tipoImo);
                    };
                    
                    //Atualizar no banco de dados
                    $("#botao").click(function(){
                        //JSON
                        var contrato = {dataIni:        $("#dataIni").val(),
                                        dataFim:        $("#dataFim").val(),
                                        tipoImo:        $("#tipoImo").val(),
                                        Endereco:       $("#Endereco").val(),
                                        valor:          parseFloat($("#valor").val()),
                                        tipoVal:        $("#tipoVal").val(),
                                        descricao:      $("#descricao").val(),
                                        codigo:         iCodigo};

                                        var txt = db.transaction(["contratos"], "readwrite");
                                        var contratoUpdate = txt.objectStore("contratos");
                                        contratoUpdate.put(contrato);
                                        window.location.href="index.html";

                                });
                    }
                
        }

    });