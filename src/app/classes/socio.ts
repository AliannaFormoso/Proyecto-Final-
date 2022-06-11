// Class
export class Socio {

// Attributes
    private nombre: string;
    private apellidos: string;
    private socio: number;
    private dni: string;
    private telefono: number;
    private sexo: string;
// Contructor
    constructor (nombre: string, apellidos: string, socio: number, dni: string, telefono: number, sexo: string){
        this.nombre= nombre;
        this.apellidos= apellidos;
        this.socio= socio;
        this.dni= dni;
        this.telefono= telefono;
        this.sexo= sexo;
    }
// Getters and setters
    get _nombre(){ return this.nombre};
    set _nombre(nombre:string){
        this.nombre= nombre;
    }

    get _apellidos(){ return this.apellidos};
    set _apellidos(apellidos:string){
        this.apellidos= apellidos;
    }

    get _socio(){ return this.socio};
    set _socio(socio:number){
        this.socio= socio;
    }

    get _dni(){ return this.dni};
    set _dni(dni:string){
        this.dni= dni;
    }

    get _telefono(){ return this.telefono};
    set _telefono(telefono:number){
        this.telefono= telefono;
    }

    get _sexo(){ return this.sexo};
    set _sexo(sexo:string){
        this.sexo= sexo;
    }
}


