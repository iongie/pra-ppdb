import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Respon, defRespon } from '../../interfaces/respon.interface';

@Injectable({
  providedIn: 'root'
})
export class StateResponService {
  modelToast = new BehaviorSubject<Respon>(defRespon);
  modelModal = new BehaviorSubject<Respon>(defRespon);

  getModelToast = this.modelToast.asObservable();
  getModelModal = this.modelModal.asObservable();
  constructor() { }


  updateModelToast(newModelToast: Respon){
    this.modelToast.next(newModelToast);
  }

  clearRespons(){
    this.modelToast.next(defRespon);
  }
  
  updateModelModal(newModelModal: Respon){
    this.modelModal.next(newModelModal);
  }

  clearModelModal(){
    this.modelModal.next(defRespon);
  }
}
