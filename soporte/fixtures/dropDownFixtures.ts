import { test as base, Locator } from '@playwright/test';

type CustomFixtures = {
  selectRandomOption: (selectLocator: Locator) => Promise<string>;
};

export const test = base.extend<CustomFixtures>({
  selectRandomOption: async ({}, use) => {
    const selectRandom = async (selectLocator: Locator) => {
      // Obtener todas las opciones dentro del <select>
      const options = selectLocator.locator('option');

      await options.first().waitFor({ state: 'attached' }); // 1. Esperar a que al menos existan las opciones cargadas en el DOM

      const count = await options.count();

      if (count <= 1) {
        throw new Error('El select no tiene suficientes opciones válidas.');
      }

      // Omitir la posición 0 (que corresponde a "Select a subject *")
      const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;

      // Obtener el valor del atributo 'value' de la opción elegida al azar
      const randomValue = await options.nth(randomIndex).getAttribute('value');

      if (randomValue) {
        await selectLocator.selectOption(randomValue);
      }

      return randomValue || '';
    };

    await use(selectRandom);
  },
});

export { expect } from '@playwright/test';