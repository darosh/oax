export default class Configuration {
  public url: string;
  public defaultTitle: string = 'API';
  public validatorImageUrl = '';
  public validatorDebugUrl = '';
  public defaultDarkTheme: boolean = false;

  public allowUrlEdit: boolean = true;
  public allowSwithTheme: boolean = true;
  public allowEditProxy: boolean = true;
  public allowValidator:boolean = false;
  public allowDownload:boolean = false;
}
