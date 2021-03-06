import {Component, OnInit} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AdminService } from './../../../../../services/admin.service';
import { BasicUser } from '../../../../../models/user.model';
import { ModalService } from './../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ AdminService ]
})
export class UserListComponent implements OnInit {
  title = 'Users';
  archivedLink = '/' + Route.DASHBOARD + '/' + Route.ARCHIVED_USERS;
  users: Array<BasicUser> = undefined;
  page = 0;
  totalPages = 0;

  modal = {
    edit: false,
    message: String.CHANGE_PASSWORD,
    header: String.CREATE_USER,
    userButton: String.ADD_BUTTON,
  };

  editModal = {
    edit: true,
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    confirmationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  emptyContent = {
    image: '../../assets/team-member.png',
    message: String.EMPTY_USER,
  };


  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toast: ToastrService
  ) { }

  openLg(modal) {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onEdit(value) {
    this.adminService.updateUser(
      value.id,
      value.firstName,
      value.lastName,
      value.email,
      value.permission,
      value.photo)
      .then((object) => {
        this.toast.success('Successfully updated ' + object.get('firstName') + ' ' + object.get('lastName'));
        this.adminService.getActiveUsers()
          .then((result) => {
            this.users = result;
          });
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
  }

  onArchive(value) {
    this.adminService.archiveUser(value).then((object) => {
      this.toast.success('Successfully archived ' + object.get('firstName') + ' ' + object.get('lastName'));
      this.adminService.getActiveUsers()
        .then((result) => {
          this.users = result;
        });
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onSubmit(value) {
    this.adminService.createUser(
      value.firstName,
      value.lastName,
      value.email,
      value.password,
      value.permission,
      value.photo)
      .then((results) => {
        if (results) {
          this.toast.success('Successfully added ' + value.firstName + ' ' + value.lastName);
          this.adminService.getActiveUsers()
            .then((result) => {
              this.users = result;
            });
        }
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
  }

  onPasswordChange(value) {
    this.adminService.updatePassword(value.id, value.password).then((results) => {
      if (results) {
        this.toast.success('Successfully Updated Password');
      }
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getActiveUsers(value)
      .then((results) => {
          this.users = results;
       });
  }

  ngOnInit() {
    this.adminService.getActiveUsers()
    .then((results) => {
        this.users = results;
        this.totalPages = this.adminService.totalPages;
    });
  }

}
