import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedProducts } from './home-featured-products';

describe('HomeFeaturedProducts', () => {
  let component: HomeFeaturedProducts;
  let fixture: ComponentFixture<HomeFeaturedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
