import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { User } from '../class/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  @Input({ required: true }) user?: User;
  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  get userAvatarPath(): string {
    return `assets/avatars/${this.user?.avatar}`;
  }

  onUserClick(): void {
    // console.log('User clicked:', this.user);
    this.select.emit(this.user?.id);
  }
}
