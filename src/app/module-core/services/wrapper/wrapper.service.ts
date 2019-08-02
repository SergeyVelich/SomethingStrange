import { Routes, Route } from '@angular/router';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/module-shared/services/base.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Provides helper methods to create routes.
 */
export class Wrapper extends BaseService {

  /**
   * Creates routes using the wrapper component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using wrapper as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: WrapperComponent,
      children: routes,
      // Reuse WrapperComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
