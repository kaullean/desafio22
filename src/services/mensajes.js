import fs from 'fs'
import path from 'path'

class MensajesService {
    constructor(){
        this.mensajes=[];
        this.filePath=path.resolve(__dirname, '../../public/mensajes.json');
    }
    async leer(){
        this.mensajes=JSON.parse(await fs.promises.readFile(this.filePath, 'utf-8'));
        return this.mensajes;
    }
    async guardar(){
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(this.mensajes, null, '\t')
        );
      }
    async agregar(unMensaje){

        this.mensajes.push(unMensaje);

        await this.guardar();

        return unMensaje;
    }
 
}

export const mensajesService = new MensajesService();