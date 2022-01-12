import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../interface/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  columnName = ['code', 'name', 'sub_category', 'brand', 'retail_priceStr', 'statusStr'];
  allColumn = ['code', 'name', 'sub_category', 'brand', 'retail_priceStr', 'statusStr', 'action'];
  header = ['PRODUCT CODE', 'PRODUCT NAME', 'SUB CATEGORY', 'BRAND', 'RETAIL PRICE', 'STATUS'];
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    initPage = 0;
    firstPageLabel = 0
    pageSizeOptions: number[] = [5, 10, 25, 100];
    showFiller = false;
    panelOpenState = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  async ngOnInit() {
    this.getProduct()
    this.getMaxRow()
    // console.log("1 ",new Date())
    //  this.testPromise().then(() => {
    //  console.log("2 ", new Date())
    //  })
    //  await this.testPromise()
    // console.log("3 ", new Date())
  }


  getMaxRow(): void{
  this.productService.getMaxRow().subscribe((product) => {
      this.length = product.max_count
      console.log("HERE "+product.max_count)
    })
  }

  getProduct(): void {
    this.productService.getProducts(this.pageSize.toString(), this.initPage.toString()).subscribe((products) => {
      // console.log("empl "+employees[0].rertail_price);
      const tempEmployee = []
      for(let item of products) {
        item.retail_priceStr = this.numberWithCommas(item.retail_price)
        if (item.status == 'y') {
          item.statusStr = 'Active'
        }else{
          item.status = 'In Active'
        }
      }
      this.dataSource = new MatTableDataSource<Product>(products);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  numberWithCommas(x :any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  public getPageIndex(e: any){
    console.log("page_size "+e.pageSize)
    console.log("page_index "+e.pageIndex)


    if (e.pageIndex > 0) {
      this.initPage = 1*e.pageIndex;
    }else{
      this.initPage = 0;
    }
    console.log("init_page "+this.initPage)
    this.productService.getProducts(e.pageSize.toString(),  this.initPage.toString()).subscribe((products) => {
      const tempEmployee = []
      for(let item of products) {
        item.retail_priceStr = this.numberWithCommas(item.retail_price)
        if (item.status == 'y') {
          item.statusStr = 'Active'
        }else{
          item.status = 'In Active'
        }
      }
      this.dataSource = new MatTableDataSource<Product>(products);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


   setPageSizeOptions(setPageSizeOptionsInput: string) {
     if (setPageSizeOptionsInput) {
       this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
     }
   }

}


