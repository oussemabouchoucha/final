import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.scss'
})
export class UploadImgComponent implements AfterViewInit  {
  @ViewChild('upload') uploadInputRef!: ElementRef;
  @ViewChild('filename') filenameLabelRef!: ElementRef;
  @ViewChild('imagePreview') imagePreviewRef!: ElementRef;
  private isEventListenerAdded: boolean = false;


  constructor(public dialogRef: MatDialogRef<UploadImgComponent>) {}

  ngAfterViewInit(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const uploadInput = this.uploadInputRef.nativeElement;
    const filenameLabel = this.filenameLabelRef.nativeElement;
    const imagePreview = this.imagePreviewRef.nativeElement;

    uploadInput.addEventListener('change', (event: Event) => this.handleFileChange(event));
    const uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => uploadInput.click());
    }
  }


  private handleFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.filenameLabelRef.nativeElement.textContent = file.name;
      const reader = new FileReader();
      reader.onload = (e) => this.displayImage(e);
      reader.readAsDataURL(file);
    } else {
      this.resetPreview();
    }
  }

  private displayImage(e: ProgressEvent<FileReader>): void {
    if (e.target) {
      this.imagePreviewRef.nativeElement.innerHTML = `<img src="${e.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
      this.imagePreviewRef.nativeElement.classList.remove('border-dashed', 'border-2', 'border-gray-400');
      if (!this.isEventListenerAdded) {
        this.imagePreviewRef.nativeElement.addEventListener('click', () => this.uploadInputRef.nativeElement.click());
        this.isEventListenerAdded = true;
      }
    }
  }

  private resetPreview(): void {
    this.filenameLabelRef.nativeElement.textContent = '';
    this.imagePreviewRef.nativeElement.innerHTML = `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    this.imagePreviewRef.nativeElement.classList.add('border-dashed', 'border-2', 'border-gray-400');
    if (this.isEventListenerAdded) {
      this.imagePreviewRef.nativeElement.removeEventListener('click', () => this.uploadInputRef.nativeElement.click());
      this.isEventListenerAdded = false;
    }
  }
}

