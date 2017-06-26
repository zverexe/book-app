import { BookProjectPage } from './app.po';

describe('book-project App', () => {
  let page: BookProjectPage;

  beforeEach(() => {
    page = new BookProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
