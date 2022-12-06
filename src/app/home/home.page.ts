import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nama: any; //init variable nama untuk namauser
  id_buku: any;
  judul: any;
  harga: any;
  token: any;
  buku: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,) {
    this.getbuku();
  }
  ngOnInit() {
    this.loadToken();

  }
  //ceksesi untuk mengambil nama user
  loadToken() {
    this.token = this.authService.getData('token');
    if (this.token != null) {
      this.nama = this.authService.getData('username');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  //membuat fungsi logout
  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
  }

  getbuku() {
    this._apiService.getbuku().subscribe((res: any) => {
      console.log("sukses", res);
      this.buku = res;
    }, (error: any) => {
      console.log("gagal", error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal memuat buku',
        buttons: ['OK']
      }).then(res => {
        res.present();
      })
    })
  }

  deletebuku(id_buku: any) {
    this.alertController.create({
      header: 'perhatian',
      subHeader: 'Yakin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan yakin
            this._apiService.deletebuku(id_buku).subscribe((res: any) => {
              console.log("sukses", res);
              this.getbuku();
            }, (error: any) => {
              console.log("error", error);
              this.alertController.create({
                header: 'Notifikasi',
                message: 'gagal memuat data',
                buttons: ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    })
  }
}