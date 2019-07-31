import { TestBed } from '@angular/core/testing';

import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { Wrapper } from './wrapper.service';

describe('Body', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      WrapperComponent
    ],
  }));

  describe('childRoutes', () => {
    it('should create routes as children of body', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Wrapper.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(WrapperComponent);
    });
  });
});
