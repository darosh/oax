export class Configuration {
  public url: string;
  public defaultTitle: string = 'API';
  public validatorImageUrl = '';
  public validatorDebugUrl = '';
  public defaultDarkTheme: boolean = false;

  public allowUrlEdit: boolean = true;
  public allowSwithTheme: boolean = true;
  public allowEditProxy: boolean = true;
  public allowValidator: boolean = false;
  public allowDownload: boolean = false;

  public limitSpecButtonText: number = 8;
}

const configuration = new Configuration()

export default configuration;
