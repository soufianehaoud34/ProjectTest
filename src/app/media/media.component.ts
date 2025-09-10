import { Component } from '@angular/core';

@Component({
  selector: 'app-media',
  standalone: true,
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';   // replace with your video
  audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';   // replace with your audio
}
