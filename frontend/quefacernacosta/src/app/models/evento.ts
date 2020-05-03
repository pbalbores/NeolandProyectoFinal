export class Evento {

    constructor(
        public id: number,
        public nombreEvento: string,
        public location1: string,
        public fk_concellos: number,
        public localizacion2: string,
        public fecha_in: Date,
        public fecha_fin: Date,
        public hora: string,
        public artista: string,
        public descripcion: string,
        public prezo: string,
        public imagen: string,
        public fk_clasificacion: number,
        public fk_usuario: number,
        public publicacion: number,
        public destacado: string,
        public concello: string,
        public categoria: string,
    ) {

    }
}

