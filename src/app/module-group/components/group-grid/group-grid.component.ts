import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service'
import { AuthService } from '../../../module-account/services/auth/auth.service';
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

  pageIndex: number;
  pageSize: number;
  pageNumber: number;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        this.groupData = response.profile;
      }
    );

    this.pageSize = this.defaultPageSize;
    this.route.params.subscribe(params => this.pageIndex = +params['pageId'] || this.defaultPageIndex);

    this.groupService.count(this.authService.authorizationHeaderValue).subscribe((response: number) => this.pageNumber = Math.ceil(response / this.pageSize));
  }

  trackByFn(index, item) {
    return item.id;
  }
}
