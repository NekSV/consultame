interface IEncuesta {
  genero: string;
  grupoEtario: string;
}

export class Encuesta implements IEncuesta {
  genero: string;
  grupoEtario: string;

  constructor() {
    this.genero = "";
    this.grupoEtario = "";
  }
}
