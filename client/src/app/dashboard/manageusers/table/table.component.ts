import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/utils/table.service';
import { AlertService } from 'src/app/utils/alert.service';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ImportDialogComponent } from '../../leads/import-dialog/import-dialog.component';
import { ExcelService } from 'src/app/services/excel.service';

export interface usernameReports {
  username: string;
  email: number;
  role: number;
  invite_status: string;
  created_at: string;
  active: number;
  critical: string;
  emailPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: string;
  testsPerOneMillion: string;
  
}

export interface DisplayColumn {
  def: string;
  label: string;
  hide: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe],
  animations: [
    trigger('animation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
          ],
          {
            optional: true
          }
        )
      ])
    ])
  ]
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ELEMENT_DATA!: usernameReports[];
  dataSource = new MatTableDataSource<usernameReports>(this.ELEMENT_DATA);
  selection!: SelectionModel<usernameReports>;
  countries: string[] = [];
  selectedrole: string = 'all';
  add: string = 'Add';
  edit: string = 'Edit';
  delete: string = 'Delete';
  value: string = '';
  isLoading: boolean = true;

  // Keep as main 'column mapper'
  displayedColumns: DisplayColumn[] = [ 
    { def: 'select', label: 'Select', hide: false },
    { def: 'username', label: 'username', hide: false },
    { def: 'email', label: 'email', hide: false },
    { def: 'role', label: 'role', hide: false },
    { def: 'invite_status', label: 'invite_status', hide: false },
    { def: 'created_at', label: 'created_at', hide: false },
    { def: 'active', label: 'Active', hide: false },
    { def: 'action', label: 'Action', hide: false }
  ];

  // Used in the template
  disColumns!: string[]; 

  // Use for creating check box views dynamically in the template
  checkBoxList: DisplayColumn[] = [];

  constructor(
    public dialog: MatDialog,
    private service: TableService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private excelService: ExcelService,

  ) { }

  ngOnInit(): void {
    // Apply paginator
    this.dataSource.paginator = this.paginator;

    // Apply sort option
    this.dataSource.sort = this.sort;

    // Create instance of checkbox SelectionModel
    this.selection = new SelectionModel<usernameReports>(true, []);

    // Update with columns to be displayed
    this.disColumns = this.displayedColumns.map(cd => cd.def)

    // Get covid19 data from external rest api endpoint
    this.getAllUsers();
  }

  // This function filter data by input in the search box
  applyFilter(event: any): void {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  // This function will be called when user click on select all check-box
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // Add, Edit, Delete rows in data table
  openAddEditDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        const action = result.data['action'];
        delete result.data['action'];
        if (action == this.add) {
          this.addRowData(result.data);
        } else if (action == this.edit) {
          this.updateRowData(result.data);
        } else {
          console.log(action);
        }
      }
    });
  }

  // Add a row into to data table
  addRowData(row_obj: any): void {
    const data = this.dataSource.data
    data.push(row_obj);
    this.dataSource.data = data;
  }

  // Update a row in data table
  updateRowData(row_obj: any): void {
    if (row_obj === null) { return; }
    const data = this.dataSource.data
    const index = data.findIndex((item) => item['username'] === row_obj.data['username']);
    if (index > -1) {
      data[index].username = row_obj.data['username'];
      data[index].email = row_obj.data['email'];
      data[index].role = row_obj.data['role'];
      data[index].invite_status = row_obj.data['invite_status'];
      data[index].created_at = row_obj.data['created_at'];
      data[index].active = row_obj.data['active'];
    }
    this.dataSource.data = data;
  }

  // Open confirmation dialog
  openDeleteDialog(len: number, obj: any): void {
    const options = {
      title: 'Delete?',
      message: `Are you sure want to remove ${len} rows?`,
      cancelText: 'NO',
      confirmText: 'YES'
    };

    // If user confirms, remove selected row from data table
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRow(obj);
      }
    });
  }

  // Delete a row by 'row' delete button
  deleteRow(row_obj: any): void {
    const data = this.dataSource.data
    const index = data.findIndex((item) => item['username'] === row_obj['username']);
    if (index > -1) {
      data.splice(index, 1);
    }
    this.dataSource.data = data;
  }

  // Fill data table
  public getAllUsers(): void {
    let resp = this.service.usersTable();
    resp.subscribe((report) => {
      this.isLoading = false;
      this.dataSource.data = (report as usernameReports[]).map(user => {
        user.created_at = this.datePipe.transform(user.created_at, 'yyyy-MM-dd HH:mm') ?? '';
        return user;
      });
    })
  }

  // Fill on selected option
  public onSelectrole(): void {
    this.selection.clear();
    if (this.selectedrole === 'all') {
      this.getAllUsers();
    } else {
      let resp = this.service.usersTableByRole(this.selectedrole);
      resp.subscribe((report) => { this.dataSource.data = [report] as usernameReports[] })
    }

  }

  // Show/Hide check boxes 
  showCheckBoxes(): void {
    this.checkBoxList = this.displayedColumns;
  }

  hideCheckBoxes(): void {
    this.checkBoxList = [];
  }

  toggleForm(): void {
    this.checkBoxList.length ? this.hideCheckBoxes() : this.showCheckBoxes();
  }

  // Show/Hide columns
  hideColumn(event: any, item: string) {
    this.displayedColumns.forEach(element => {
      if (element['def'] == item) {
        element['hide'] = event.checked;
      }
    });
    this.disColumns = this.displayedColumns.filter(cd => !cd.hide).map(cd => cd.def)
  }
  clearSearch(): void {
    this.value = '';
    this.applyFilter({ target: { value: '' } } as any);  
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadFile(result);
      }
    });
  }
  
  uploadFile(file: File) {
    this.excelService.readExcelFile(file).then((users: any[]) => {
      console.log('Users from Excel:', users);
      users.forEach(user => {
        this.addRowData(user); // Add each user to the table
      });
      // Process users data as needed
    }).catch(error => {
      console.error('Error reading Excel file:', error);
    });
  }
}
