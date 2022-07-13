import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from '../../service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alertas.showAlertWarning('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id:number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  deleteTema() {
    this.temaService.deleteTema(this.idTema).subscribe(()=> {
      this.alertas.showAlertSuccess('Tema apagado!')
      this.router.navigate(['/tema'])
    })
  }

}
