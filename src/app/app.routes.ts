import { Routes } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PhotoComponent } from './photo/photo.component';
import { MediaComponent } from './media/media.component';

export const routes: Routes = [{
 path:'tasks', component:DragDropComponent,pathMatch:'full'

},{
  path:'todos',component:TodoComponent,pathMatch:'full'
}, { path: '', redirectTo: 'todos', pathMatch: 'full' },{
  path:'weather',component:WeatherComponent,pathMatch:'full'
},
{
  path:'weather',component:WeatherComponent,pathMatch:'full'
},
{
  path:'photo',component:PhotoComponent,pathMatch:'full'
},
{
  path:'media',component:MediaComponent,pathMatch:'full'
}
];
