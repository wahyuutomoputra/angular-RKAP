export class Site {
    Site: string;
    CompanyCode: string;
    SiteType: string;
    Unit: string;
    ApplySettingProfile: string;
    CustomizeSetting: boolean;
    InheritSettingsForAllChildSite: boolean;
    TopVoltageTolerance: number;
    BottomVoltageTolerance: number;
    UnbalanceVoltageTolerance: number;
    IncorrectVoltagePhaseRotationDetection: boolean;
    LossVoltagePhaseDetection: boolean;
    TopCurrentTolerance: number;
    BottomCurrentTolerance: number;
    UnbalanceCurrentTolerance: number;
    IncorrectCurrentPhaseRotationDetection: boolean;
    LossCurrentPhaseDetection: boolean;
    MaxEnergyConsumptionUsageHour: number;
    MinEnergyConsumptionUsageHour: number;
    UnbalanceEnergyTolerance: number;
    MaxPowerConsumptionUsageHour: number;
    MinPowerConsumptionUsageHour: number;
    UnbalancePowerTolerance: number;
}
