const XMlHttpRequest = require('xmlhttprequest').XMLHttpRequest; // Instanciamos XMLHttpRequest
const API = 'https://api.escuelajs.co/api/v1'; //Instanciamos el link de la API

function fetchData(urlApi,callback) {
    let xhttp = new XMlHttpRequest(); //Creamos una variable y le asignamos una funcion XMLHttpRequest(Linea 1)

    xhttp.open('GET',urlApi, true);//Abrimos una conexion con la API
    xhttp.onreadystatechange = function (event){
        if(xhttp.readyState === 4){ //Estamos verificando el estado de la conexion,4 significa que se pudo completar la llamada al servidor
            if(xhttp.status === 200){//Estamos verificando si la conexión resulto exitosa,200 significa que la conexión resulto exitosa
                callback(null, JSON.parse(xhttp.responseText))//retornamos el callback null error y convertimos el texto dado en un objeto JS por medio de JSON
            }else{
                const error = new Error('Error' + urlApi ); // En caso que no salga la conexión exitosa, se instancia el error
                return callback(error, null);// Posteriormente se retorna
            };
        };
        
    }
    xhttp.send();//Enviamos el llamado de la solicitud
}

fetchData(`${API}/products`,function (error1,data1){//obtenemos el data1(Lista de productos) por medio de la función fetch data
    if (error1) return console.error(error1);//Si existe el error 1, se loguea en la consola 
    fetchData(`${API}/products/${data1[3].id}`, function (error2, data2){ //Obtenemos el cuarto producto de la lista por medio de data1(callbacks)
        if (error2) return console.error(error2);//Si existe el error 2, se loguea en la consola 
        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3){//Obtenemos la categoria del producto por medio del data2(callbacks)
            if (error3) return console.error(error3);//Si existe el error 3, se loguea en la consola 
            console.log(data1[3]);//se loguea el cuarto objeto de la lista de productos
            console.log(data2.title);//se loguea el title del objeto obtenido de data1[3] 
            console.log(data3.name);// se loguea del atributo categoria de data2 el nombre
        });
    });

});
