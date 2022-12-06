import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-buku-edit',
  templateUrl: './buku-edit.page.html',
  styleUrls: ['./buku-edit.page.scss'],
})
export class BukuEditPage implements OnInit {
  id_buku: any;
  judul: any;
  harga: any;
  constructor(private route: ActivatedRoute, private router: Router, public _apiService: ApiService,
  ) {
    this.route.params.subscribe((param: any) => {
      this.id_buku = param.id_buku;
      console.log(this.id_buku);
      this.ambilbuku(this.id_buku);
    })
  }
  ngOnInit() {
  }
  ambilbuku(id_buku: any) {
    this._apiService.lihat(id_buku, '/lihatbuku.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let buku = hasil;
        this.judul = buku.judul;
        this.harga = buku.keterangan;
      },
      error: (error: any) => {
        this._apiService.notif('gagal ambil data');
      }
    })
  }
  editbuku() {
    let data = {
      id_buku: this.id_buku,
      judul: this.judul,
      harga: this.harga,
    }
    this._apiService.edit(data, '/editbuku.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.id_buku = '';
          this.judul = '';
          this.harga = '';
          this._apiService.notif('berhasil edit buku');
          this.router.navigateByUrl('/home');
        },
        error: (err: any) => {
          this._apiService.notif('gagal edit buku');
        }
      })
  }
}