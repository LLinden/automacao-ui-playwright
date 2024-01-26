import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { usuarios } from "../testdata/usuarios.json";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
});

test.describe("Login", () => {
  test("realiza login com sucesso", async () => {
    await test.step("Act", async () => {
      await loginPage.digitaUsuario(usuarios[0].usuarioValido);
      await loginPage.digitaSenha(usuarios[0].senha);
      await loginPage.clicaLogin();
    });

    await test.step('Assert',async () => {
        await loginPage.verificaLogin;  
    })
  });
});
