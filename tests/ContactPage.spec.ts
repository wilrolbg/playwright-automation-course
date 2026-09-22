import { test, expect } from '../soporte/fixtures/dropDownFixtures';
import { AuthAssertions } from "../assertions/AuthAssertions";
import { ContactAssertions } from "../assertions/ContactAssertions";
import { ContactPage } from '../pages/ContactPage';
import vdata from "../data/data_validate.json";
import forms_data from "../data/data_forms.json"

test.describe('Pruebas de Inicio de Sesion', () => {
    let HomePage: ContactPage;
    let authAssertions: AuthAssertions;
    let contactAssertions: ContactAssertions;
    test.beforeEach(async ({ page }) => {
        HomePage = new ContactPage(page);
        authAssertions = new AuthAssertions(page);
        contactAssertions = new ContactAssertions(page);
        await HomePage.open(); 
        await authAssertions.assertAtUrl(vdata.homePage.urlHomePage);
    });

test('Enviar mensaje mediante el formulario de contacto', async ({ page, selectRandomOption }) => {
  const contactPage = new ContactPage(page);
  await contactPage.openContactPage();
  const valorSeleccionado = await contactPage.readSelector(selectRandomOption); //Se selecciona el valor de la lista desplegable utilizando el fixture de dropdownlist
  await contactPage.fillContactForm(
    forms_data.Contact.firstName,
    forms_data.Contact.LastName,
    forms_data.Contact.Email,
    valorSeleccionado,
    forms_data.Contact.Message); //Se envian los datos para llenar el formulario de contacto
  await contactAssertions.assertSuccessMsg(vdata.Contact.messageSuccess);
});    
})

