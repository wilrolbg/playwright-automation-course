import { test, expect } from '../soporte/fixtures/dropDownFixtures';
import { AuthAssertions } from "../assertions/AuthAssertions";
import { ContactAssertions } from "../assertions/ContactAssertions";
import { ContactPage } from '../pages/ContactPage';
import vdata from "../data/data_validate.json";
import forms_data from "../data/data_forms.json"

test.describe('Pruebas de Contacto', () => {
  let contactPage: ContactPage;
  let authAssertions: AuthAssertions;
  let contactAssertions: ContactAssertions;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    authAssertions = new AuthAssertions(page);
    contactAssertions = new ContactAssertions(page);
    await contactPage.gotoHome();
    await authAssertions.assertAtUrl(vdata.homePage.urlHomePage);
  });

  test('Enviar mensaje mediante el formulario de contacto', async ({ selectRandomOption }) => {
    await contactPage.gotoContact();
    const valorSeleccionado = await contactPage.readSelector(selectRandomOption); // Se selecciona el valor usando el fixture

    await contactPage.fillContactForm(
      forms_data.Contact.firstName,
      forms_data.Contact.LastName,
      forms_data.Contact.Email,
      valorSeleccionado,
      forms_data.Contact.Message
    ); // Se envían los datos para llenar el formulario de contacto

    await contactAssertions.assertSuccessMsg(vdata.Contact.messageSuccess);
  });

  test('Mostrar validación cuando se envía vacío', async () => {
    await contactPage.gotoContact();

    // Enviar sin completar campos
    await contactPage.submit();

    // Obtener mensaje de validación del primer nombre (HTML5)
    const validationMsg = await contactPage.getFirstNameValidationMessage();
    // Prefer field-specific error selectors and assert per-field where possible
    if (await contactPage.hasFirstNameError()) {
      await contactAssertions.assertValidationVisibleBySelector('[data-test="first-name-error"]');
    } else if (await contactPage.hasLastNameError()) {
      await contactAssertions.assertValidationVisibleBySelector('[data-test="last-name-error"]');
    } else if (await contactPage.hasEmailError()) {
      await contactAssertions.assertValidationVisibleBySelector('[data-test="email-error"]');
    } else if (await contactPage.hasMessageError()) {
      await contactAssertions.assertValidationVisibleBySelector('[data-test="message-error"]');
    } else if (validationMsg) {
      await contactAssertions.assertValidationError(validationMsg);
    } else {
      await contactAssertions.assertValidationError('First name is required');
    }
  });

  
});

