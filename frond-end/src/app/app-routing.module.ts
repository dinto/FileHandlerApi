import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileHandlerComponent } from './file-handler/file-handler.component';


const routes: Routes = [
  {path: 'file', component: FileHandlerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
