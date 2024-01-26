import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;
  readonly mensagemErro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.getByPlaceholder("Username");
    this.campoSenha = page.getByPlaceholder("Password");
    this.botaoLogin = page.getByRole("button", { name: /login/i });
    this.mensagemErro = page.getByText("Epic sadface: Username and password do not match any user in this service");
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

  async verificaMensagemErro() {
    await expect(this.mensagemErro).toBeVisible();
  }
}

export default LoginPage;
