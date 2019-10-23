import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';

import { GenTestModule } from '../../../test.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { SettingsComponent } from 'app/account/settings/settings.component';

describe('Component Tests', () => {
  describe('SettingsComponent', () => {
    let comp: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let mockAuth: any;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [GenTestModule],
        declarations: [SettingsComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SettingsComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SettingsComponent);
      comp = fixture.componentInstance;
      mockAuth = fixture.debugElement.injector.get(AccountService);
    });

    it('should send the current identity upon save', () => {
      // GIVEN
      const accountValues: Account = {
        firstName: 'John',
        lastName: 'Doe',

        activated: true,
        email: 'john.doe@mail.com',
        langKey: 'en',
        login: 'john',
        authorities: [],
        imageUrl: ''
      };
      mockAuth.setIdentityResponse(accountValues);

      // WHEN
      comp.updateForm(accountValues);
      comp.save();

      // THEN
      expect(mockAuth.identitySpy).toHaveBeenCalled();
      expect(mockAuth.saveSpy).toHaveBeenCalledWith(accountValues);
      expect(comp.settingsForm.value).toEqual(accountValues);
    });

    it('should notify of success upon successful save', () => {
      // GIVEN
      const accountValues = {
        firstName: 'John',
        lastName: 'Doe'
      };
      comp.settingsForm.patchValue({
        firstName: 'John',
        lastName: 'Doe'
      });
      mockAuth.setIdentityResponse(accountValues);
      // WHEN
      comp.save();

      // THEN
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    it('should notify of error upon failed save', () => {
      // GIVEN
      mockAuth.saveSpy.and.returnValue(throwError('ERROR'));
      // WHEN
      comp.save();

      // THEN
      expect(comp.error).toEqual('ERROR');
      expect(comp.success).toBeNull();
    });
  });
});
