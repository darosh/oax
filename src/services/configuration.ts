export class Configuration {
  public url: string = 'https://api.apis.guru/v2/specs/github.com/v3/swagger.json';
  public defaultTitle: string = 'API';
  public defaultDarkTheme: boolean = false;

  public allowUrlEdit: boolean = true;
  public allowSwithTheme: boolean = true;
  public allowEditProxy: boolean = true;
  public allowDownload: boolean = false;

  public limitSpecButtonText: number = 8;
}

const configuration = new Configuration();

export default configuration;
