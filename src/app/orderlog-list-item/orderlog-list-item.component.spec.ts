import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlogListItemComponent } from './orderlog-list-item.component';

describe('OrderlogListItemComponent', () => {
  let component: OrderlogListItemComponent;
  let fixture: ComponentFixture<OrderlogListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlogListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlogListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
