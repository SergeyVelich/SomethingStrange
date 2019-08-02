import { Component, OnInit, OnChanges } from '@angular/core';
import { Language } from '../../models/language';
import { GroupService } from '../../services/group.service'
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { Filter } from 'src/app/module-shared/models/filter';
import { Sorter } from 'src/app/module-shared/models/sorter';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group-grid',
  templateUrl: './group-grid.component.html',
  styleUrls: ['./group-grid.component.css']
})

export class GroupGridComponent implements OnInit {
  public groupData: Array<Group>;

  //pagening
  public readonly defaultPageSize = 5;
  public readonly defaultPageIndex = 1;
  // public readonly pageSizeOptions: number[] = [5, 10, 25];

  pageIndex: number;
  pageSize: number;
  pageNumber: number;

  //filters
  languages: Language[];
  filters = new Map<string, Filter>();
  sorting = new Sorter('Name', 'Desc');
  filterName: string;
  filterLanguage: number;
  filterDateFrom: Date;
  filterDateTo: Date;
  minFilterDate: Date;
  maxFilterDate: Date;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private languageService: LanguageService, private authService: AuthService) {
    // this.filterName = '';
    // this.filterLanguage = 0;
    this.pageIndex = this.defaultPageIndex; 
    this.pageSize = this.defaultPageSize;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      if( params['pageId'] ) {
        this.pageIndex = +params['pageId'];
      }
      
      this.doOnInit();
    });
  }
  
  doOnInit() {
    this.refreshTable();

    this.languageService.getAll(this.authService.authorizationHeaderValue).subscribe((response: any) => {
      this.languages = response;
    });
  }

  public refreshTable() {
    let params: any = { filters: this.filters, sorting: this.sorting, pageIndex: this.pageIndex, pageSize: this.pageSize };
    this.groupService.getAll(this.authService.authorizationHeaderValue, params.filters, params.sorting, params.pageIndex, params.pageSize).subscribe((response: any) => this.groupData = response);
    this.groupService.count(this.authService.authorizationHeaderValue, params.filters).subscribe((response: number) => this.pageNumber = Math.ceil(response/this.pageSize));
  };

  trackByFn(index, item) {    
    return item.id; // уникальный id, соответствующий элементу
 }

  // onChangeFilterName(filterValue: string) {
  //   let name = 'name';
  //   if(filterValue == null || filterValue.trim().length == 0){
  //     this.onClearFilter(name);
  //   }
  //   else{
  //     let value = filterValue.toLowerCase();
  //     let operation = '=';
  
  //     this.onChangeFilter(new Filter(name, value, operation));           
  //   }
  // }

  // onChangeFilterLanguage(filterValue: number) {
  //   let name = 'languageId';
  //   if(filterValue == null || filterValue == 0){
  //     this.onClearFilter(name);
  //   }
  //   else{
  //     let value = filterValue.toString();
  //     let operation = '=';
  
  //     this.onChangeFilter(new Filter(name, value, operation));           
  //   }
  // }

  // onChangeFilterDateFrom(filterValue: Date) {
  //   let name = 'dateFrom';
  //   this.minFilterDate = this.filterDateFrom;
  //   if(filterValue == null){
  //     this.onClearFilter(name);
  //   }
  //   else{
  //     let value = new Date(filterValue).toUTCString();
  //     let operation = '=';
  
  //     this.onChangeFilter(new Filter(name, value, operation));           
  //   }
  // }
  
  // onChangeFilterDateTo(filterValue: Date) {
  //   let name = 'dateTo';
  //   this.maxFilterDate = this.filterDateTo;
  //   if(filterValue == null){
  //     this.onClearFilter(name);
  //   }
  //   else{
  //     let value = new Date(filterValue).toUTCString();
  //     let operation = '=';
  
  //     this.onChangeFilter(new Filter(name, value, operation));           
  //   }
  // }

  // onChangeFilter(filter: Filter) {  
  //   this.filters.set(filter.propertyName, filter);
  //   this.refreshTable();
  // }

  // onClearFilter(filterName: string) {  
  //   this.filters.delete(filterName);
  //   this.refreshTable();
  // }

  // sortData(sort: Sort) {
  //   if (!sort.active || sort.direction === '') {
  //     return;
  //   }

  //   this.sorting = new Sorter(sort.active, sort.direction);
  //   this.refreshTable();
  // }
}
