export interface RegistrationResponse {
  status?: string;
  errors?: [
    {
      type?: string;
      value?: string;
      msg?: string;
      path?: string;
    }
  ];
}
