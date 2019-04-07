import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliciesComponent } from './policies.component';
import { By } from '@angular/platform-browser';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MockComponent } from 'ng2-mock-component';
import { PolicyService } from '../policy.service';
import { of } from 'rxjs';
import { Policy } from 'src/models/policy';
import { PolicyBuilder } from 'src/test-helpers/builders/policy.builder';

fdescribe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;
  let policyServiceMock: jasmine.SpyObj<PolicyService>;
  let policy: Policy = new PolicyBuilder().build();

  beforeEach(() => {
    policyServiceMock = jasmine.createSpyObj('PolicyService', ['getAll', 'delete']);
    policyServiceMock.getAll.and.returnValue(of([policy]));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PoliciesComponent,
        MockComponent({ selector: 'delete-modal', inputs: ['display'] }),
      ],
      providers: [
        { provide: PolicyService, useValue: policyServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display deleteConfirmstionModal', () => {
    let de = fixture.debugElement.query(By.css('delete-modal'));
    let childComponent: DeleteModalComponent = de.componentInstance;

    expect(childComponent).toBeTruthy();
    expect(childComponent.display).toBeFalsy();
  });
});


