export class UsuarioCompletoDto {
  userId: string;
  nombre: string;
  correoElectronico: string;
  fechaNacimiento: string;
  ubicacion?: string;

  // Dieta
  genero?: string;
  altura?: number;
  peso?: number;
  objetivo?: string;
  alergias?: string[];
  presupuesto?: number;

  // Rutina
  edad?: number;
  preferencias?: string[];
  dias?: number;
  lesiones?: string;
}
