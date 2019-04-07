import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliciesComponent } from './policies.component';
import { By } from '@angular/platform-browser';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MockComponent } from 'ng2-mock-component';
import { PolicyService } from '../policy.service';
import { of } from 'rxjs';
import { Policy } from 'src/models/policy';
import { PolicyBuilder } from 'src/test-helpers/builders/policy.builder';
import { DebugElement } from '@angular/core';
import { Gender } from 'src/models/gender';
import { PolicyDeleteService } from '../policy-delete.service';
import { PageHeaderService } from 'src/app/page-header/page-header.service';
import { PAGE_TITLES } from 'src/constants/page-titles';

fdescribe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;
  let policyServiceMock: jasmine.SpyObj<PolicyService>;
  let pageHeaderServiceMock: jasmine.SpyObj<PageHeaderService>;
  let policyDeleteServiceMock: any;
  let policy1: Policy = new PolicyBuilder().withPolicyNumber(1).build();
  let policy2: Policy = new PolicyBuilder().withPolicyNumber(2).build();
  const policies = [policy1, policy2];

  beforeEach(() => {
    pageHeaderServiceMock = jasmine.createSpyObj('pageHeaderService', ['setHeaderTitle']);
    policyServiceMock = jasmine.createSpyObj('PolicyService', ['getAll', 'delete']);
    policyServiceMock.getAll.and.returnValue(of(policies));
    policyDeleteServiceMock = {
      deleteConfirmed$: of(false),
      confirmDelete: () => { },
      displayModal: () => { }
    };

    spyOn(policyDeleteServiceMock, 'displayModal');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PoliciesComponent,
        MockComponent({ selector: 'delete-modal', inputs: ['policyNumber'] }),
      ],
      providers: [
        { provide: PolicyService, useValue: policyServiceMock },
        { provide: PolicyDeleteService, useValue: policyDeleteServiceMock },
        { provide: PageHeaderService, useValue: pageHeaderServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    component.policyToDel = 10;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should get all policies', () => {
      component.ngOnInit();

      expect(policyServiceMock.getAll).toHaveBeenCalled();
    });

    it('should set page title', () => {
      component.ngOnInit();

      expect(pageHeaderServiceMock.setHeaderTitle).toHaveBeenCalledWith(PAGE_TITLES.POLICIES);
    });
  });

  describe('deleteClicked', () => {
    it('should open delete modal', () => {
      component.deleteClicked(1);

      expect(policyDeleteServiceMock.displayModal).toHaveBeenCalledWith(true);
    });
  });

  describe('VIEW', () => {
    it('should display plicies in the table', () => {
      const elements = fixture.debugElement.queryAll(By.css('table tbody tr'));

      expect(elements.length).toBe(policies.length);
    });

    it('should display policy number in the table', () => {
      const elements = fixture.debugElement.queryAll(By.css('table tbody tr'));

      elements.forEach((elm: DebugElement, index) => {
        expect(elm.childNodes[0].nativeNode.innerText).toBe(policies[index].policyNumber.toString());
      });
    });

    it('should display policy holder name in the table', () => {
      const elements = fixture.debugElement.queryAll(By.css('table tbody tr'));

      elements.forEach((elm: DebugElement, index) => {
        expect(elm.childNodes[1].nativeNode.innerText).toBe(policies[index].policyHolder.name);
      });
    });

    it('should display policy holder age in the table', () => {
      const elements = fixture.debugElement.queryAll(By.css('table tbody tr'));

      elements.forEach((elm: DebugElement, index) => {
        expect(elm.childNodes[2].nativeNode.innerText).toBe(policies[index].policyHolder.age.toString());
      });
    });

    it('should display policy holder gender in the table', () => {
      const elements = fixture.debugElement.queryAll(By.css('table tbody tr'));

      elements.forEach((elm: DebugElement, index) => {
        expect(elm.childNodes[3].nativeNode.innerText).toBe(Gender[policies[index].policyHolder.gender]);
      });
    });

    it('should display deleteConfirmstionModal', () => {
      let element = fixture.debugElement.query(By.css('delete-modal'));
      let childComponent: DeleteModalComponent = element.componentInstance;

      expect(childComponent).toBeTruthy();
      expect(childComponent.policyNumber).toBe(component.policyToDel);
    });

    it('should not display error message on the page when there is no error', () => {
      component.errorMessage = null;
      fixture.detectChanges();

      let element = fixture.debugElement.query(By.css('#error-message'));

      expect(element).toBeFalsy();
    });

    it('should display error message on the page when there is an error', () => {
      component.errorMessage = 'Some error happened';
      fixture.detectChanges();

      let element = fixture.debugElement.query(By.css('#error-message'));

      expect(element).toBeTruthy();
      expect(element.nativeElement.innerText).toBe(component.errorMessage);
    });

    it('should update policy number to delete when clicking on delete button', () => {
      const element = fixture.debugElement.query(By.css('table tbody tr:first-child .delete-btn'));
      const policyNumber = fixture.debugElement.query(By.css('table tbody tr:first-child td:first-child')).nativeElement.innerText;

      element.triggerEventHandler('click', null);

      expect(component.policyToDel.toString()).toBe(policyNumber);
    });
  });
});


