import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: {title: string}[];
  filteredProducts: any[];

  
  searchValue: string = "";
  results: any;
  constructor(private productService:ProductService,public afs: AngularFirestore) {
    this.productService.getAll().subscribe((products:any) =>  this.filteredProducts = this.products = products)
  }


  // search() {
  //   console.log(this.searchValue);
  //   let self = this;
  //   self.results = self.afs.collection('/products/', ref => ref
  //     .orderBy("title")
  //     .startAt(self.searchValue.toLowerCase())
  //     .endAt(self.searchValue.toLowerCase()+"\uf8ff")
  //     .limit(10))
  //     .valueChanges();
  // }


  // Null coalescing
  filter(query: string) {
    this.filteredProducts = (query) ?  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }
  ngOnInit() {
  }

}
