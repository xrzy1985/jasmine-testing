import { NgModule } from '@angular/core';
import { StrengthPipe } from './strength/strength.pipe';
import { MessagesPipe } from './messages/messages.pipe';

@NgModule({
  imports: [],
  declarations: [MessagesPipe, StrengthPipe],
  exports: [MessagesPipe, StrengthPipe],
})
export class PipeModule {}
