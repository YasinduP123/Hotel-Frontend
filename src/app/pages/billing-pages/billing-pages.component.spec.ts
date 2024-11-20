import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPagesComponent } from './billing-pages.component';

describe('BillingPagesComponent', () => {
  let component: BillingPagesComponent;
  let fixture: ComponentFixture<BillingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
