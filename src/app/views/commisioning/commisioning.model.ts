export class Location {
  constructor(
    public LocationCode: string,
    public LocationName: string,
    public LocationType: string,
    public Site: string,
    public Province: string,
    public City: string,
    public Address: string,
    public PostalCode: string,
    public Phone1: string,
    public Phone2: string,
    public Faxcimile: string,
    public Email: string,
    public Photo: string,
    public Tariff: string,
    public Capacity: string,
    public Unit: string,
    public CTRatio: string,
    public CTPrimary: string,
    public CTSecondary: string,
    public PTRatio: string,
    public PTPrimary: string,
    public PTSecondary: string,
    public Substation: string,
    public ContractNo: string,
    public MeterFactor: string,
    public kWhFactor: string,
    public kVArhFactor: string,
    public TrfLosesFact: string,
    public MutationDate: Date,
    public MutationCode: string,
    public Status: string,
    public Desctription: string,
    public Appendix: string,
    public RegisterDate: Date,
    public RegisterBy: string,
    public LastModifiedDate: Date,
    public LastModifiedBy: string
  ) {}
}

export class AssetMeter {
  constructor(
    public MeterCode: string,
    public MeterBrand: string,
    public BrandType: string,
    public Photo: string,
    public Status: string,
    public Description: string,
    public MeterProtocol: string,
    public MeterClass: string,
    public MeterChannel: string,
    public CertificateID: string,
    public CertificateDate: Date,
    public CertificateFile: string,
    public InstallDate: Date,
    public RegistrationDate: Date,
    public RegistrationBy: string,
    public ActivationDate: Date,
    public ActivationBy: string,
    public DeactivationDate: Date,
    public DeactivationBy: string
  ) {}
}

export class AssetCommDevice {
  constructor(
    public CommDeviceCode: string,
    public CommDeviceType: string,
    public Brand: string,
    public Type: string,
    public Status: string,
    public Description: string,
    public CommunicationType: string,
    public ConnectionType: string,
    public CommunicationPort: string,
    public ConnectionnPort: string,
    public IPAddress: string
  ) {}
}

export class AssetSim {
  constructor(
    public SimCardCode: string,
    public Provider: string,
    public IPAddress: string,
    public Status: string,
    public Description: string
  ) {}
}

export class NewDataAMR {
  public activationCode: string;
  public locationCode: string;
  public assetCommunicationCode: string;
  public assetMeterCode: string;
  public assetSimCode: string;
  public siteCode: string
}

export class UpdateStatusAsset {
  public id: number;
  public activationCode: string;
  public status: string;
  public locationCode: string;
}

export class UpdateStatusLocation {
  public activationCode: String;
  public status: string;
}
