import { browser, element, by, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../page-objects/jhi-page-objects';

const expect = chai.expect;

describe('administration', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage(true);
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.adminMenu), 5000);
  });

  beforeEach(async () => {
    await navBarPage.clickOnAdminMenu();
  });

  it('should load user management', async () => {
    await navBarPage.clickOnAdmin('user-management');
    const expect1 = 'Users';
    const value1 = await element(by.id('user-management-page-heading')).getText();
    expect(value1).to.eq(expect1);
  });

  /* THESE API ARE NOT SUPPORTED
    it('should load metrics', async () => {
        await navBarPage.clickOnAdmin('metrics');
        const expect1 = 'Application Metrics';
        const value1 = await element(by.id('metrics-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load health', async () => {
        await navBarPage.clickOnAdmin('health');
        const expect1 = 'Health Checks';
        const value1 = await element(by.id('health-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load configuration', async () => {
        await navBarPage.clickOnAdmin('configuration');
        await browser.sleep(500);
        const expect1 = 'Configuration';
        const value1 = await element(by.id('configuration-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load audits', async () => {
        await navBarPage.clickOnAdmin('audits');
        await browser.sleep(500);
        const expect1 = 'Audits';
        const value1 = await element(by.id('audits-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    it('should load logs', async () => {
        await navBarPage.clickOnAdmin('logs');
        await browser.sleep(500);
        const expect1 = 'Logs';
        const value1 = await element(by.id('logs-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });
    */
  after(async () => {
    await navBarPage.autoSignOut();
  });
});
