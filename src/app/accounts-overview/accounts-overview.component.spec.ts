import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsOverviewComponent } from './accounts-overview.component';
import { By } from '@angular/platform-browser';

describe('AccountsOverviewComponent', () => {
  let component: AccountsOverviewComponent;
  let fixture: ComponentFixture<AccountsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsOverviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display sum amount red if negative', () => {
    const sumElement = fixture.debugElement.query(By.css('[data-testid="sum"]')).nativeElement;
    expect(sumElement).toBeDefined();
    expect(sumElement.textContent.trim()).toEqual('-CHF2,768.75');
    expect(sumElement).toHaveClass('red');
  });

});
