export interface Proyecto {
    ID_Proyecto: number;
    Nombre_Proyecto: string;
    ID_Consultor: number;
    ID_Empresa: number;
    fecha_inicio: Date;  
    fecha_fin: Date;     
    monto: number;       
    estado: string;      
}
