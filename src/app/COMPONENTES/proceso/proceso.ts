export interface Proceso{

    nombre_area:string;
    estado_proceso:string;
    fecha_recibido:string;
    fecha_entrega:string;
    observacion:string;
    numero_paso:number;
    id_registro:number;
    id_area:number;
    id_usuario:number;
    id_proceso:number;
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
  export interface TipoInstituciones{
    
    id_tipo_institucion:number;
    descripcion:string;
    /*
    password:string;
    estado_usuario:string;
    fecha:string;
    id_persona_usuario:string;
    */
    
  }