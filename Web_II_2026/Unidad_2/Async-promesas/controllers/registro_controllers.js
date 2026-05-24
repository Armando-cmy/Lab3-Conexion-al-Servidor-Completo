import { clientService } from "../Service/client_service";
const formulario=document.querySelector('[data-form]');
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id = uuid.v4();
    const nombre=document.querySelector('[data-nombre]').value;
    const email=document.querySelector('[data-email]').value;
    clientService.crearCliente(id,nombre,email).then(respuesta=>{
        console.log("ok",respuesta);
        window.location.href="../screens/registro_cliente.html"
    }).catch(error=>{
        console.log("todo mal",error);
    });
        
        
    
    
});