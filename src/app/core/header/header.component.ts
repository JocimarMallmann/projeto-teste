import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // $, boa prática, diz que essa variável receberá um Observable
  user$: Observable<User>; // e vou pegar o valor diretamente no template com o pipe async
  // E se esse Observable fosse um Subject, o pipe async automáticamente faria o Destroy
  // user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
    // this.user$.subscribe(
    //   (user) => {
    //     this.user = user;
    //     console.log(user);
    //   }
    // );
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
