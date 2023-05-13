import { Component, Input, OnInit, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TICKES_LIST_DATA_KEY, ticketList } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortHeaderIntl, SortDirection } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'id', 'created_date', 'description', 'status'];
  dataSource = new MatTableDataSource();

  /** Pagination,sort of ticket list data table*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  searchValue: string;
  statusList = ['Open', 'In-progress', 'Completed', 'Deferred'];
  totalRecords: number = 0;
  pageSize: number = 10;
  /** page event variable to handle the page events */
  pageEvent: PageEvent;
  searchKeyword: string;
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
  }

  onPageChange(event){
    if (event.pageIndex == Math.ceil(this.totalRecords / this.pageSize) - 1) {
      this.totalRecords = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  addTicket(isEdit:boolean = false) {
    isEdit ? this.router.navigate(['/tickets', 10]) : this.router.navigate(['/create-ticket']);
  }
}
