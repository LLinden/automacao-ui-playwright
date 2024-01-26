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
      await loginPage.digitaSenha(usuarios[0].senhaValida);
      await loginPage.clicaLogin();
    });

    await test.step("Assert", async () => {
      await loginPage.verificaLogin;
    });
  });

  test("tentativa de login com senha inválida", async () => {
    await test.step("Act", async () => {
      await loginPage.digitaUsuario(usuarios[0].usuarioValido);
      await loginPage.digitaSenha(usuarios[0].senhaInvalida);
      await loginPage.clicaLogin();
    });

    await test.step("Assert", async () => {
      await loginPage.verificaMensagemErro();
    });
  });

  test("tentativa de login com usuário inválido", async () => {
    await test.step("Act", async () => {
      await loginPage.digitaUsuario(usuarios[1].usuarioInvalido);
      await loginPage.digitaSenha(usuarios[1].senhaValida);
      await loginPage.clicaLogin();
    });

    await test.step("Assert", async () => {
      await loginPage.verificaMensagemErro();
    });
  });

  test("tentativa de login sem preenchimento de usuário", async () => {
    await test.step("Act", async () => {
      await loginPage.digitaSenha(usuarios[1].senhaValida);
      await loginPage.clicaLogin();
    });

    await test.step("Assert", async () => {
      await loginPage.verifcaUsuario();
    });
  });

  test("tentativa de login sem preenchimento de senha", async () => {
    await test.step("Act", async () => {
      await loginPage.digitaUsuario(usuarios[0].usuarioValido);
      await loginPage.clicaLogin();
    });

    await test.step("Assert", async () => {
      await loginPage.verifcaSenha();
    });
  });
});
