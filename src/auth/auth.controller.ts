import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login with username password.
   *
   * @param req
   * @param username
   * @param password
   */
  @Post("login")
  async login(@Request() req, @Body("username") username, @Body("password") password) {
    return await this.authService.loginWithCredentials(username, password);
  }
}
