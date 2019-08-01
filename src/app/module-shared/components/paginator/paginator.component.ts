import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ss-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() public pageIndex: number;
  @Input() public pageNumber: number;

  constructor() { }

  ngOnInit() {
  }

}
