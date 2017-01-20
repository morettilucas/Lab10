/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

contadorTareas = 0;
tareaSeleccionada = 0;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        $("#btnAddTarea").click(
            function(){
                var str = "<a href=\"#\" class=\"list-group-item\" data-id-tarea=\""+contadorTareas+"\">"+
                "<h4 class=\"list-group-item-heading\">"+$("#tareaNombre").val()+"</h4>"+
                "<p class=\"list-group-item-text\"><div class=\"checkbox\"><label><inputtype=\"checkbox\">Finalizar</label></div></p></a>";
                $("#listaTarea").append(str);
                $("#tareaNombre").val('');
                contadorTareas++;
            }
            );

        $("#btnVaciar").click(
            function(){
                $("#listaTarea").empty();
            }
            );

        function onConfirm(buttonIndex) {
        	if(buttonIndex==1){
		        $( "#listaTarea a:nth-child("+tareaSeleccionada+")" ).remove();
		        contadorTareas--;
        	}
    	}

        $('#listaTarea').on("click","a",
            function() {
            	
            	console.log($(this).attr('data-id-tarea'));
		        tareaSeleccionada = 1+$(this).index();
		        console.log(tareaSeleccionada);

            	navigator.notification.confirm(
            	'¿Desea borrar esta tarea?', // message
            	onConfirm,            // callback to invoke with index of button pressed
            	'Eliminar',           // title
            	['Si','No']     // buttonLabels
            	);
            }
        );

        console.log('Received Event: ' + id);
    }
};

app.initialize();