import { Component, Input, OnInit, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket, TICKES_LIST_DATA_KEY, Options, ticketList } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortHeaderIntl, SortDirection } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddEditTicketComponent } from '../add-edit-ticket/add-edit-ticket.component';
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
  @ViewChild(MatSort) sort: MatSort;

  /** Pagination of ticket list data table*/
  @ViewChild('MatPaginator') paginator: MatPaginator;

  /**Direction varialbe to get sort direction */
  direction: SortDirection;

  /** sortDirection to hold the asc or desc direction value */
  sortDirection: 'ASC' | 'DESC' | null;

  sortColumnName: 'Title' | 'Display ID' | 'Date of creation' | 'Description' | 'status' | null

  /** Options to hold the sort column name | sort direction | pagination */
  options: Options = {};
  searchValue: string;

  /** page event variable to handle the page events */
  pageEvent: PageEvent;
  searchKeyword: string;
  constructor(
    private readonly router: Router
  ) {
    this.pageEvent = new PageEvent();
        this.pageEvent.pageIndex = 0;
        this.pageEvent.pageSize = 5;
        this.options.pageNumber = this.pageEvent.pageIndex;
        this.options.itemsPerPage = this.pageEvent.pageSize;
        
    if (sessionStorage.getItem(TICKES_LIST_DATA_KEY)) {
      const sessionData: any = sessionStorage.getItem(TICKES_LIST_DATA_KEY)
      // this.ticketList = JSON.parse(JSON.stringify(sessionStorage.getItem(TICKES_LIST_DATA_KEY)))
      this.dataSource = new MatTableDataSource(JSON.parse(sessionData))
      console.log(this.dataSource)
    }
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    if(this.paginator) {
      const paginatorIntl = this.paginator._intl;
      paginatorIntl.nextPageLabel = 'Next';
      paginatorIntl.previousPageLabel = 'Previous';

      this.paginator.pageSize = this.pageEvent.pageSize;
      this.dataSource.paginator = this.paginator;
    }

  }
  applySort(header) {
    console.log(header)
  }

  onPageChange(event){
    console.log(event)
  }

  addTicket(isEdit:boolean = false) {
    isEdit ? this.router.navigate(['/tickets', 10]) : this.router.navigate(['/create-ticket']);
  }
}
