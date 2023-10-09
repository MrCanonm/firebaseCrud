import { Injectable } from '@nestjs/common';
import {
  ref,
  set,
  get,
  DataSnapshot,
  update,
  push,
  remove,
} from 'firebase/database';
import {
  StorageReference,
  getStorage,
  uploadBytes,
  ref as refS,
} from 'firebase/storage';
import { firebaseDatabase } from './firebase.config';
import { Data } from './interface/data.interface';
@Injectable()
export class AppService {
  private readonly storage: any;

  constructor() {
    this.storage = getStorage();
  }

  async uploadFile(
    file: Express.Multer.File,
    storagePath: string,
  ): Promise<string> {
    const storageRef: StorageReference = refS(this.storage, storagePath);

    try {
      await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });
      // Genera la URL pública para el archivo cargado
      const publicUrl = `https://storage.googleapis.com/${storageRef.bucket}/${storagePath}`;
      console.log('Imagen subida exitosamente');
      return publicUrl;
    } catch (error) {
      throw new Error('Error al cargar el archivo en Firebase Storage');
    }
  }
  async createData(data: Data): Promise<void> {
    const dataRef = ref(firebaseDatabase, 'datos');
    const newElementRef = push(dataRef, { datos: data });
    await set(newElementRef, data);
    console.log('Dato creado con éxito');
  }

  async getData(): Promise<any> {
    const dataRef = ref(firebaseDatabase, 'datos');
    const snapshot: DataSnapshot = await get(dataRef);
    return snapshot.val();
  }

  async partialUpdateData(id: string, updateData: any): Promise<void> {
    const elementRef = ref(firebaseDatabase, `datos/${id}`); // Utiliza el ID para obtener la referencia al elemento específico
    await update(elementRef, updateData); // Actualiza los datos del elemento
    console.log('Datos actualizados');
  }

  async deleteData(id: string): Promise<void> {
    const elementRef = ref(firebaseDatabase, `datos/${id}`); // Utiliza el ID para obtener la referencia al elemento específico
    await remove(elementRef); // Elimina el elemento
    console.log('Dato eliminado con éxito');
  }
}
