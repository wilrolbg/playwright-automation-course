import { test, expect, Page } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { AuthAssertions } from "../assertions/AuthAssertions";
import users from "../data/credentials.json";
import vdata from "../data/data_validate.json";

const user = users.credentials.admin.userAdmin;
const passwd = users.credentials.admin.passwdAdmin;

test.describe('Pruebas de Inicio de Sesion', () => {
    let login: LoginPage;
    let authAssertions: AuthAssertions;
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page); //Instancia el objeto una sola vez
        authAssertions = new AuthAssertions(page);
        await login.open(); 
        await authAssertions.assertAtUrl(vdata.homePage.urlHomePage);
    });

    test('Hacer Login', async ({page}) => {         
        await login.openAuth(); // Abre la página y hace clic en Sign In
        await authAssertions.assertAtUrl(vdata.Login.urlLogin);
        await login.login(user, passwd);
        await authAssertions.assertAtUrl(vdata.Dashboard.adminUser.url);
        await authAssertions.assertAtTittelDashboard(vdata.Dashboard.adminUser.tittelDashboard);
        await authAssertions.assertAtTittelDashboard(vdata.Dashboard.adminUser.orderListTittle);
    });
    
    test('Validar que los campos email y password no permitan valores vacios', async ({page}) => { 
        await login.openAuth(); // Abre la página y hace clic en Sign In
        await authAssertions.assertAtUrl(vdata.Login.urlLogin);
        await login.login(vdata.Login.failedUserCredentials.emptyEmail, vdata.Login.failedUserCredentials.emptyPasswd);
        await authAssertions.assertAtFailedMsg(vdata.Login.failedMessages.requiredEmail);
        await authAssertions.assertAtFailedMsg(vdata.Login.failedMessages.requiredPasswd);
     });

    test('Validar el formato del correo', async ({page}) => { 
        await login.openAuth(); // Abre la página y hace clic en Sign In
        await authAssertions.assertAtUrl(vdata.Login.urlLogin);
        await login.login(vdata.Login.failedUserCredentials.badEmailFormated, users.credentials.admin.passwdAdmin);
        await authAssertions.assertAtFailedMsg(vdata.Login.failedMessages.badFormatEmail);
     });

    test('Validar credenciales invalidas', async ({page}) => { 
        await login.openAuth(); // Abre la página y hace clic en Sign In
        await authAssertions.assertAtUrl(vdata.Login.urlLogin);
        await login.login(vdata.Login.failedUserCredentials.invalidEmail, vdata.Login.failedUserCredentials.badPasswd);
        await authAssertions.assertAtFailedMsg(vdata.Login.failedMessages.invalidLogin);
     })
});