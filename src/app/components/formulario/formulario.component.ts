import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Socio } from 'src/app/classes/socio';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  socio: FormGroup;
  arraySocios: Socio[]= [];
  dataSource = new MatTableDataSource();
  arrayNumeroSocio: number[]= [];
  displayedColumns: string[] = ['socio' ,'nombre', 'apellidos', 'dni', 'telefono', 'sexo', 'borrar', 'modificar'];
  @ViewChild(MatTable) tabla!: MatTable<any>;
  modificar:boolean= false;
  indiceModificar :number= 0;
  constructor(private snackBar: MatSnackBar) {
    this.socio = new FormGroup({
      nombre: new FormControl('',[Validators.required,Validators.minLength(3), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
      apellidos: new FormControl('',[Validators.required,Validators.minLength(3), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
      socio: new FormControl('',[Validators.required,  Validators.pattern('^[0-9]+$')]),
      dni: new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9), Validators.pattern('[0-9]{8}[A-Za-z]{1}')]),
      telefono: new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9)]),
      sexo: new FormControl('',Validators.required)
    });
    this.dataSource.data = this.arraySocios;
  }
  validaNumeroSocio(){
    if (this.arrayNumeroSocio.includes(this.socio.controls['socio'].value)){
      alert("Lo sentimos :( Este numero de socio no esta disponible. Por favor, asigne otro");
      this.socio.controls['socio'].setValue("");
    }
  }
  ngOnInit(): void {
  }
  onSubmit(formDirective: FormGroupDirective){
    let nuevoSocio= new Socio(
      this.socio.controls["nombre"].value,
      this.socio.controls["apellidos"].value,
      this.socio.controls["socio"].value,
      this.socio.controls["dni"].value,
      this.socio.controls["telefono"].value,
      this.socio.controls["sexo"].value
    );
    this.arraySocios.push(nuevoSocio);
    this.arrayNumeroSocio.push(this.socio.controls["socio"].value);
    this.tabla.renderRows();
    formDirective.resetForm();
    this.socio.reset();
  }
  public funcionEliminar(indice: number): void{
    this.arrayNumeroSocio.splice(indice,1);
    this.arraySocios.splice(indice,1);
    this.tabla.renderRows();
    this.snackBar.open("Datos eliminados satisfactoriamente", "Cerrar");
  }
  public funcionEditar(indice: number): void{
    this.modificar= true;
    this.indiceModificar= indice;
    this.socio.controls["nombre"].setValue(this.arraySocios[indice]._nombre);
    this.socio.controls["apellidos"].setValue(this.arraySocios[indice]._apellidos);
    this.socio.controls["socio"].setValue(this.arraySocios[indice]._socio);
    this.socio.controls["dni"].setValue(this.arraySocios[indice]._dni);
    this.socio.controls["telefono"].setValue(this.arraySocios[indice]._telefono);
    this.socio.controls["sexo"].setValue(this.arraySocios[indice]._sexo);
  }
  public funcionCancelar(formDirective: FormGroupDirective): void{
    this.modificar= false;
    formDirective.resetForm();
    this.socio.reset();
  }
  public funcionGuardarCambios(formDirective: FormGroupDirective):void{
    this.arraySocios[this.indiceModificar]._nombre= (this.socio.controls["nombre"].value);
    this.arraySocios[this.indiceModificar]._apellidos= (this.socio.controls["apellidos"].value);
    this.arraySocios[this.indiceModificar]._socio= (this.socio.controls["socio"].value);
    this.arraySocios[this.indiceModificar]._dni= (this.socio.controls["dni"].value);
    this.arraySocios[this.indiceModificar]._telefono= (this.socio.controls["telefono"].value);
    this.arraySocios[this.indiceModificar]._sexo= (this.socio.controls["sexo"].value);
    this.tabla.renderRows();
    formDirective.resetForm();
    this.socio.reset();
    this.modificar= false;
    this.arrayNumeroSocio[this.indiceModificar] = this.arraySocios[this.indiceModificar]._socio;
    this.snackBar.open("Datos cambiados satisfactoriamente", "Cerrar");
  }
}
