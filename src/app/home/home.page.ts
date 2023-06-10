import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: any = {};
  constructor(private toastController: ToastController, private storage: Storage) {}

  inputCheck() {
    if (
      !this.form.nik || !this.form.nama || !this.form.ttl ||
      !this.form.jenis_kelamin || !this.form.alamat || !this.form.agama || !this.form.status_perkawinan|| !this.form.pekerjaan ||
      !this.form.kewarganegaraan || !this.form.berlaku_hingga
    ) {
      this.toastController.create({
        message: 'Mohon Dilengkapi Data Anda !',
        duration: 2000,
        color: 'warning'
      }).then(toast => toast.present());

      return false;
    }
    return true;
  }


  async sendToWhatsapp() {
    const isValid = this.inputCheck();
    if (!isValid) return;

    
    // this.form.type = 'whatsapp';

    const form = Object.keys(this.form);
    const output = form.map((key) => {
      if (key === 'location') return;
      return `*${key.toUpperCase()}*: ${this.form[key]}`;
    }).join('%0A');

    window.open(`https://api.whatsapp.com/send?phone=6281282878976&text=${output}`, '_blank');

    
  }

}
