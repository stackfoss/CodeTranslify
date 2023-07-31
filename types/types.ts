export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
}

export interface TranslateResponse {
  code: string;
}
