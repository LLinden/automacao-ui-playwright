import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.getByPlaceholder("Username");
    this.campoSenha = page.getByPlaceholder("Password");
    this.botaoLogin = page.getByRole("button", { name: /login/i });
  }

  async digitaUsuario(usuario) {
    await this.campoUsuario.fill(usuario);
  }

  async digitaSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  async clicaLogin() {
    await this.botaoLogin.click();
  }

  async verificaLogin() {
    await expect(this.page).toHaveURL("/inventory.html");
  }
}

export default LoginPage;
