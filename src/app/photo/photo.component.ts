import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [WebcamModule, CommonModule],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
   encapsulation: ViewEncapsulation.None // <── add this
})
export class PhotoComponent implements OnInit {
  @ViewChild('galleryInput') galleryInput!: ElementRef<HTMLInputElement>;

  webcamImage: WebcamImage | null = null;
  photo: string | null = null;
  cameraError: string | null = null;
  cameraAvailable: boolean = false;
   webcamKey: number = 0;
    


  // Simple camera switching
  facingMode: string = 'user'; // 'user' = front, 'environment' = back
  
  private trigger: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.checkCameraPermissions();
  }
webcamVisible: boolean = true;

 switchCamera() {
  this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';

  // Force re-render of <webcam>
  this.webcamVisible = false;
  setTimeout(() => {
    this.webcamVisible = true;
  });
}
  // Get current video options
  get videoOptions() {
    return {
      facingMode: this.facingMode
    };
  }

  // Check if camera is available and permissions are granted
  async checkCameraPermissions() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.cameraError = 'Camera not supported in this browser';
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: this.facingMode }
      });
      
      stream.getTracks().forEach(track => track.stop());
      
      this.cameraAvailable = true;
      this.cameraError = null;
    } catch (error: any) {
      this.cameraAvailable = false;
      
      if (error.name === 'NotAllowedError') {
        this.cameraError = 'Camera permission denied. Please allow camera access.';
      } else if (error.name === 'NotFoundError') {
        this.cameraError = 'No camera found on this device.';
      } else if (error.name === 'NotReadableError') {
        this.cameraError = 'Camera is already in use by another application.';
      } else {
        this.cameraError = 'Error accessing camera: ' + error.message;
      }
    }
  }

  triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  takePhoto() {
    if (this.cameraAvailable) {
      this.trigger.next();
    } else {
      this.checkCameraPermissions();
    }
  }

  captureImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.photo = null;
  }

  handleInitError(error: WebcamInitError) {
    this.cameraError = 'Webcam initialization failed: ' + error.message;
    this.cameraAvailable = false;
  }

  openGallery() {
    this.galleryInput.nativeElement.click();
  }

  onGallerySelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
        this.webcamImage = null;
      };
      reader.readAsDataURL(file);
    }
  }

  retryCamera() {
    this.checkCameraPermissions();
  }

  clearPhoto() {
    this.photo = null;
    this.webcamImage = null;
  }
}