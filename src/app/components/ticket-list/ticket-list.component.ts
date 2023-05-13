import { Component, Input, OnInit, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket, TICKES_LIST_DATA_KEY, Options, ticketList } from 'src/app/services/ticket.service';
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


  // ticketList: Array<Ticket> = [];
  displayedColumns: string[] = ['Title', 'Display ID', 'Date of creation', 'Description', 'status'];
  dataSource = new MatTableDataSource();

  /** To sort the mat table columns */

  /** Pagination of ticket list data table*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**Direction varialbe to get sort direction */
  direction: SortDirection;

  /** sortDirection to hold the asc or desc direction value */
  sortDirection: 'ASC' | 'DESC' | null;

  sortColumnName: 'Title' | 'Display ID' | 'Date of creation' | 'Description' | 'status' | null

  /** Options to hold the sort column name | sort direction | pagination */
  options: Options = {};
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
    if (sessionStorage.getItem(TICKES_LIST_DATA_KEY)) {
      const sessionData: any = sessionStorage.getItem(TICKES_LIST_DATA_KEY)
      this.dataSource = new MatTableDataSource(JSON.parse(sessionData))
    }
    this.totalRecords = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applySort(header) {
    console.log(header)
  }

  onPageChange(event){
    console.log(event);
    console.log(Math.ceil(this.totalRecords / this.pageSize) - 1);
    if (event.pageIndex == Math.ceil(this.totalRecords / this.pageSize) - 1) {
      // console.log('API call');
      // let apiRes = this.getData();
      let oldRes = this.dataSource.data;
      // let newRes = [...oldRes, ...apiRes];

      // this.dataSource = new MatTableDataSource(newRes);
      this.totalRecords = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  addTicket(isEdit:boolean = false) {
    isEdit ? this.router.navigate(['/tickets', 10]) : this.router.navigate(['/create-ticket']);
  }
}
