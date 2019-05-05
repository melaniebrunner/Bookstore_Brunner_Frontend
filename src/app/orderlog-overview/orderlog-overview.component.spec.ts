import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlogOverviewComponent } from './orderlog-overview.component';

describe('OrderlogOverviewComponent', () => {
  let component: OrderlogOverviewComponent;
  let fixture: ComponentFixture<OrderlogOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlogOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
