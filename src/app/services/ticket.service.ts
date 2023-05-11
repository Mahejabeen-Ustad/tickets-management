import { Injectable } from '@angular/core';

export const TICKES_LIST_DATA_KEY = 'ticket-list'

/**interface for ticket data */
export interface Ticket {
  id: number,
  title: string,
  description: string,
  created_date: Date,
  status: string
}

export interface Options {
  sortBy ?: string;
  sortDirection ?: string;
  searchText?: string,
  filters ?: any,
  itemsPerPage?: number,
  pageNumber?: number
}


export const ticketList: Array<Ticket> = [
  {
    id: 1,
    title: "Server down",
    description: "Unable to access the server",
    created_date: new Date("2022-01-01"),
    status: "Open"
  },
  {
    id: 2,
    title: "Email not working",
    description: "Unable to send or receive emails",
    created_date: new Date("2022-01-02"),
    status: "Open"
  },
  {
    id: 3,
    title: "Slow network",
    description: "Network connection is slow",
    created_date: new Date("2022-01-03"),
    status: "Open"
  },
  {
    id: 4,
    title: "Printer not working",
    description: "Printer is not printing anything",
    created_date: new Date("2022-01-04"),
    status: "Open"
  },
  {
    id: 5,
    title: "Software not responding",
    description: "Software is not responding",
    created_date: new Date("2022-01-05"),
    status: "Open"
  },
  {
    id: 6,
    title: "Cannot access shared folder",
    description: "Unable to access shared folder",
    created_date: new Date("2022-01-06"),
    status: "Open"
  },
  {
    id: 7,
    title: "Website not loading",
    description: "Website is not loading on any browser",
    created_date: new Date("2022-01-07"),
    status: "Open"
  },
  {
    id: 8,
    title: "VPN not connecting",
    description: "Unable to connect to VPN",
    created_date: new Date("2022-01-08"),
    status: "Open"
  },
  {
    id: 9,
    title: "Keyboard not working",
    description: "Keyboard is not responding",
    created_date: new Date("2022-01-09"),
    status: "Open"
  },
  {
    id: 10,
    title: "Mouse not working",
    description: "Mouse is not responding",
    created_date: new Date("2022-01-10"),
    status: "Open"
  },
  {
    id: 11,
    title: "Cannot connect to Wi-Fi",
    description: "Unable to connect to Wi-Fi network",
    created_date: new Date("2022-01-11"),
    status: "Open"
  },
  {
    id: 12,
    title: "File not found",
    description: "Unable to find the required file",
    created_date: new Date("2022-01-12"),
    status: "Open"
  },
  {
    id: 13,
    title: "Monitor not working",
    description: "Monitor is not displaying anything",
    created_date: new Date("2022-01-13"),
    status: "Open"
  },
  {
    id: 14,
    title: "Audio not working",
    description: "No sound is coming from the speakers",
    created_date: new Date("2022-01-14"),
    status: "Open"
  },
  {
    id: 15,
    title: "Video not playing",
    description: "Videos are not playing on any player",
    created_date: new Date("2022-01-15"),
    status: "Open"
  }
]


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }
}
