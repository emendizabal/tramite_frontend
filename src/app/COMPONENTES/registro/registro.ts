export interface Registros{
    
    id_registro:number;
    nombre:string;
    apellido_paterno:string;
    documento_identidad:string;
    descripcion_tramite:string;
    fecha_inicio:string;
    fecha_final:string;
    /*
    password:string;
    estado_usuario:string;
    fecha:string;
    id_persona_usuario:string;
    */
  }


  export interface Personas{
    
    id_usuario:number;
    username:string;
    password:string;
    estado_usuario:string;
    fecha:string;
    id_persona_usuario:string;
    /*
    password:string;
    estado_usuario:string;
    fecha:string;
    id_persona_usuario:string;
    */
  }




  export interface TipoRegistros{
    
    id_tipo_institucion:number;
    descripcion:string;
    /*
    password:string;
    estado_usuario:string;
    fecha:string;
    id_persona_usuario:string;
    */
  }