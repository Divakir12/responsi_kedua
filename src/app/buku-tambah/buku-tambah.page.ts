import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-buku-tambah',
  templateUrl: './buku-tambah.page.html',
  styleUrls: ['./buku-tambah.page.scss'],
})
export class BukuTambahPage implements OnInit {
  id_buku: any;
  judul: any;
  harga: any;
  constructor(private router: Router, public _apiService: ApiService,) { }
  ngOnInit() {
  }
  addbuku() {
    let data = {
      judul: this.judul,
      harga: this.harga,
    }
    this._apiService.tambah(data, '/tambahbuku.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.id_buku = '';
          this.judul = '';
          this.harga = '';
          this._apiService.notif('berhasil input buku');
          this.router.navigateByUrl('/home');
        },
        error: (err: any) => {
          this._apiService.notif('gagal input buku');
        }
      })
  }
}