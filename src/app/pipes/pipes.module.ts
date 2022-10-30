import { NgModule } from '@angular/core';
import { StrengthPipe } from './strength/strength.pipe';
import { MessagesPipe } from './messages/messages.pipe';
import { CaptureIdPipe } from './captureId/capture-id.pipe';

@NgModule({
  imports: [],
  declarations: [CaptureIdPipe, MessagesPipe, StrengthPipe],
  exports: [CaptureIdPipe, MessagesPipe, StrengthPipe],
  providers: [CaptureIdPipe, MessagesPipe, StrengthPipe]
})
export class PipeModule {}
