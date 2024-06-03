import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TableService } from 'src/app/utils/table.service';
import { AlertService } from 'src/app/utils/alert.service';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { ExcelService } from 'src/app/services/excel.service';

export interface usernameReports {
  id: any;
  name: string;
  email: number;
  phone: number;
  status: string;
  sex: string;
  localisation: string;
  age: number;
  ville: string;
  situation: string;
  created_at: string;
  
}

export interface DisplayColumn {
  def: string;
  label: string;
  hide: boolean;
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss',
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
export class LeadsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ELEMENT_DATA!: usernameReports[];
  dataSource = new MatTableDataSource<usernameReports>(this.ELEMENT_DATA);
  selection!: SelectionModel<usernameReports>;
  countries: string[] = [];
  selectedusername: string = 'all';
  add: string = 'Add';
  edit: string = 'Edit';
  delete: string = 'Delete';
  value: string = '';
  isLoading: boolean = true;

  // Keep as main 'column mapper'
  displayedColumns: DisplayColumn[] = [ 
    { def: 'select', label: 'Select', hide: false },
    { def: 'name', label: 'Name', hide: false },
    { def: 'email', label: 'Email', hide: false },
    { def: 'phone', label: 'Phone', hide: false },
    { def: 'status', label: 'Status', hide: false },
    { def: 'sex', label: 'Sex', hide: false },
    { def: 'localisation', label: 'Localisation', hide: false },
    { def: 'age', label: 'Age', hide: false },
    { def: 'ville', label: 'Ville', hide: false },
    { def: 'situation', label: 'Situation', hide: false },
    { def: 'created_at', label: 'Created Date', hide: false },
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
    private router: Router,
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

    // Get leads data from external rest api endpoint
    this.getAllLeads();
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
    const dialogRef = this.dialog.open(DialogComponent, {
      data: obj,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const action = result.action;
        delete result.action; // Remove the action key from the result
        if (action === this.add) {
          this.addRowData(result);
        } else if (action === this.edit) {
          this.updateRowData(result);
        } else {
          console.log(action);
        }
      }
    });
  }
  

// Add a row into to data table
addRowData(row_obj: any): void {
  this.service.createLead(row_obj).subscribe(
    (response) => {
      const data = this.dataSource.data.slice();
      data.push(response as usernameReports); // Explicitly cast response to usernameReports
      this.dataSource.data = data;
      console.log("New row added:", response);
      console.log("Updated dataSource data:", this.dataSource.data);
    },
    (error) => {
      console.error("Error adding lead:", error);
      this.alertService.open({ title: 'Error', message: 'Failed to add lead.', cancelText: 'OK' });
    }
  );
}


  // Update a row in data table
  updateRowData(row_obj: any): void {
    const id = row_obj.id; // Assuming the id is included in the row object
    this.service.updateLead(id, row_obj).subscribe(
      (response) => {
        console.log("Lead updated:", response);
      },
      (error) => {
        console.error("Error updating lead:", error);
        this.alertService.open({ title: 'Error', message: 'Failed to update lead.', cancelText: 'OK' });
      }
    );
  }

  // Open confirmation dialog
  openDeleteDialog(len: number, row_obj: any): void {
    const options = {
      title: 'Delete?',
      message: `Are you sure you want to remove this row?`,
      cancelText: 'NO',
      confirmText: 'YES'
    };
  
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRow(row_obj);
      }
    });
  }
  

  // Delete a row by 'row' delete button
  deleteRow(row_obj: any): void {
    const id = row_obj.id; // Assuming the id is included in the row object
    this.service.deleteLead(id).subscribe(
      (response) => {
        const data = this.dataSource.data;
        const index = data.findIndex((item) => item.id === id);
        if (index > -1) {
          data.splice(index, 1); // Remove the specific lead
          this.dataSource.data = data;
        }
        console.log("Row deleted:", response);
      },
      (error) => {
        console.error("Error deleting lead:", error);
        this.alertService.open({ title: 'Error', message: 'Failed to delete lead.', cancelText: 'OK' });
      }
    );
  }

  // Fill data table
  public getAllLeads(): void {
    let resp = this.service.leadsTable();
    resp.subscribe((report) => {
      this.isLoading = false;
      this.dataSource.data = (report as usernameReports[]).map(lead => {
        lead.created_at = this.datePipe.transform(lead.created_at, 'yyyy-MM-dd HH:mm') ?? '';
        return lead;
      });
    })
  }

  // Fill on selected option
  public onSelectusername(): void {
    this.selection.clear();
    if (this.selectedusername === 'all') {
      this.getAllLeads();
    } else {
      let resp = this.service.covid19ReportsByCountry(this.selectedusername);
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

  // Method to send selected leads to verification component
  sendSelectedLeads() {
    const selectedLeads = this.selection.selected;
    console.log(selectedLeads);
    this.router.navigate(['/dashboard/quality'], { queryParams: { leads: JSON.stringify(selectedLeads) } });

    // Emit an event with the selected leads
    this.selectedLeadsEmitter.emit(selectedLeads);
  }
  @Output() selectedLeadsEmitter = new EventEmitter<usernameReports[]>();



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
