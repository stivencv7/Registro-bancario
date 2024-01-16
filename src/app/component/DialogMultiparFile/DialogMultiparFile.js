import React,{useState} from 'react'
import { Dialog } from 'primereact/dialog';
import { cargaMasiva} from '../../service/ServiceUsuario/ServiceUsuario';
import swal from 'sweetalert2'

/**
 * stile (string): Clase de estilo para personalizar la apariencia del botón.
 *actualizarUsuarios (función): Función para actualizar la lista de usuarios después de cargar el archivo.
 */
export const DialogMultiparFile = ({stile,actualizarUsuarios}) => {
    
    // Estado que controla la visibilidad del diálogo modal.
    const [visible, setVisible] = useState(false);    

    /**
     * upload Esta función maneja el evento de clic en el botón para cargar archivos.
     *  Muestra un mensaje de confirmación. Si el usuario confirma, prepara y carga el archivo utilizando la función cargarArchivo.
     */
    const upload=async(e)=> {
        swal({
        title: 'Registrar',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#064edf',
        confirmButtonText: 'Continuar',
        cancelButtonText:'Cancelar',
        position:'center',
        zIndex:'1000000000000000'

      },).then((result) => {
        if (result.value) {
  
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('file', file);
          //funcion que se encarga de registrar la cargaMasiva de usuarios
          cargarArchivo(formData);
        }
      })
      setVisible(false);
    }

    const cargarArchivo=async(formData)=>{

        try{
        await cargaMasiva(formData);
        /**
            * llamamos la fincion de actualizarUsuarios() que hace referencia a la fucion
            * fetchData() que se encuenta en el coponente padre
        */
        actualizarUsuarios();
        }catch(error){
            swal("",error, "error");
        }
    }

    return (
        <div className="card flex justify-content-center">
            <button className={stile} onClick={() => setVisible(true)}>Registro Multiple</button>
            <Dialog header="Header" visible={visible} className='w-[50vw] z-0' onHide={() => setVisible(false)}>
                <input className='form-control' type='file' onChange={upload} accept='.xlsx'></input>
            </Dialog>
        </div>
    )
}