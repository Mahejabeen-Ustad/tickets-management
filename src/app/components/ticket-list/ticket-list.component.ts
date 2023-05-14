import { Component, Input, OnInit, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TICKES_LIST_DATA_KEY, ticketList } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortHeaderIntl, SortDirection } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'id', 'created_date', 'description', 'status'];
  dataSource = new MatTableDataSource();

  /** Pagination,sort of ticket list data table*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  searchValue: string;
  statusList = ['All', 'Open', 'In-progress', 'Completed', 'Deferred'];
  totalRecords: number = 0;
  pageSize: number = 10;
  /** page event variable to handle the page events */
  pageEvent: PageEvent;
  searchKeyword: string;

  /**serach/filter Object*/
  statusFilter = new FormControl('All');
  displayIdTitle = new FormControl('');
  fromDateFilter = new FormControl('');
  toDateFilter = new FormControl('');
  filterValues = {
    status: '',
    date: {
      from:'',
      to: ''
    },
    title:'',
    id: ''
  }
  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(TICKES_LIST_DATA_KEY)) {
      const sessionData: any = localStorage.getItem(TICKES_LIST_DATA_KEY)
      this.dataSource = new MatTableDataSource(JSON.parse(sessionData))
    }
    this.totalRecords = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

    this.statusFilter.valueChanges.subscribe(status => {
      this.filterValues.status = status;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.displayIdTitle.valueChanges.subscribe(data => {
      this.filterValues.id = data;
      this.filterValues.title = data
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.fromDateFilter.valueChanges.subscribe((value) => {
      this.filterValues.date.from = value;
      this.dataSource.filter = JSON.stringify(this.filterValues)
    });

    this.toDateFilter.valueChanges.subscribe((value) => {
      this.filterValues.date.to = value;
      this.dataSource.filter = JSON.stringify(this.filterValues)
    });
    
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return searchTerms.status == 'All' ? true : data.status.toLowerCase().indexOf(searchTerms.status.toLowerCase()) !== -1
        && (data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
              || searchTerms.title ? data.title.toString().toLowerCase().indexOf(searchTerms.title) !== -1 : true)
        && (searchTerms.date && searchTerms.date.from && searchTerms.date.to ?
               (new Date(data.created_date) >= new Date(searchTerms.date.from) && new Date(data.created_date) <= new Date(searchTerms.date.to)) : true)
    }
    return filterFunction;
  }

  onPageChange(event){
    if (event.pageIndex == Math.ceil(this.totalRecords / this.pageSize) - 1) {
      this.totalRecords = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  /**add ticket handler */
  addTicket(isEdit:boolean = false) {
    isEdit ? this.router.navigate(['/tickets', 10]) : this.router.navigate(['/create-ticket']);
  }

  /**to clear all filters */
  // clearFilters() {
  // }
}
