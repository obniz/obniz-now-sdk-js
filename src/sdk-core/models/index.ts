/* tslint:disable */
/* eslint-disable */
/**
 *
 * @export
 * @interface AccountEntitlementsResponse
 */
export interface AccountEntitlementsResponse {
    /**
     *
     * @type {string}
     * @memberof AccountEntitlementsResponse
     */
    account_id: string;
    /**
     *
     * @type {PlanName}
     * @memberof AccountEntitlementsResponse
     */
    plan: PlanName;
    /**
     *
     * @type {UsagePeriod}
     * @memberof AccountEntitlementsResponse
     */
    period: UsagePeriod;
    /**
     *
     * @type {Array<EntitlementSummary>}
     * @memberof AccountEntitlementsResponse
     */
    entitlements: Array<EntitlementSummary>;
}


/**
 *
 * @export
 * @interface AccountMember
 */
export interface AccountMember {
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    account_id: string;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    user_id: string;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    name?: string | null;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    email?: string | null;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    profile_picture_url?: string | null;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    group_id: string | null;
    /**
     *
     * @type {string}
     * @memberof AccountMember
     */
    group_name?: string | null;
    /**
     *
     * @type {AccountMemberRole}
     * @memberof AccountMember
     */
    role: AccountMemberRole;
}


/**
 *
 * @export
 * @interface AccountMemberAuthority
 */
export interface AccountMemberAuthority {
    /**
     *
     * @type {string}
     * @memberof AccountMemberAuthority
     */
    account_id: string;
    /**
     *
     * @type {string}
     * @memberof AccountMemberAuthority
     */
    user_id: string;
    /**
     *
     * @type {AccountMemberRole}
     * @memberof AccountMemberAuthority
     */
    role: AccountMemberRole;
    /**
     *
     * @type {string}
     * @memberof AccountMemberAuthority
     */
    group_id: string | null;
}


/**
 *
 * @export
 * @interface AccountMemberResponse
 */
export interface AccountMemberResponse {
    /**
     *
     * @type {AccountMemberAuthority}
     * @memberof AccountMemberResponse
     */
    member: AccountMemberAuthority;
}

/**
 *
 * @export
 */
export const AccountMemberRole = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type AccountMemberRole = typeof AccountMemberRole[keyof typeof AccountMemberRole];

/**
 *
 * @export
 * @interface AccountPlanResponse
 */
export interface AccountPlanResponse {
    /**
     *
     * @type {string}
     * @memberof AccountPlanResponse
     */
    account_id: string;
    /**
     *
     * @type {PlanName}
     * @memberof AccountPlanResponse
     */
    plan: PlanName;
    /**
     *
     * @type {{ [key: string]: PlanLimitation; }}
     * @memberof AccountPlanResponse
     */
    base_plan: { [key: string]: PlanLimitation; };
    /**
     *
     * @type {{ [key: string]: PlanLimitation; }}
     * @memberof AccountPlanResponse
     */
    effective_plan: { [key: string]: PlanLimitation; };
    /**
     *
     * @type {{ [key: string]: object; }}
     * @memberof AccountPlanResponse
     */
    overrides: { [key: string]: object; };
}


/**
 *
 * @export
 * @interface AccountUsagesResponse
 */
export interface AccountUsagesResponse {
    /**
     *
     * @type {string}
     * @memberof AccountUsagesResponse
     */
    account_id: string;
    /**
     *
     * @type {PlanName}
     * @memberof AccountUsagesResponse
     */
    plan: PlanName;
    /**
     *
     * @type {UsagePeriod}
     * @memberof AccountUsagesResponse
     */
    period: UsagePeriod;
    /**
     *
     * @type {Array<UsageSummary>}
     * @memberof AccountUsagesResponse
     */
    usages: Array<UsageSummary>;
}


/**
 * Error response for BLE machine creation failures
 * @export
 * @interface AddBleMachineError
 */
export interface AddBleMachineError {
    /**
     * Error message describing the failure
     * @type {string}
     * @memberof AddBleMachineError
     */
    message: string;
}
/**
 * Request body for adding a BLE device as a machine
 * @export
 * @interface AddBleMachineRequest
 */
export interface AddBleMachineRequest {
    /**
     * Type of BLE device being added. Determines which controller will be installed.
     * @type {string}
     * @memberof AddBleMachineRequest
     */
    parts: AddBleMachineRequestPartsEnum;
    /**
     * Human-readable name for the machine
     * @type {string}
     * @memberof AddBleMachineRequest
     */
    name: string;
    /**
     * Bluetooth MAC address of the device. Must be unique within the account.
     * @type {string}
     * @memberof AddBleMachineRequest
     */
    address: string;
    /**
     * Optional array of group IDs to assign the machine to. Required if the user is restricted to a specific group.
     * @type {Array<string>}
     * @memberof AddBleMachineRequest
     */
    groupIds?: Array<string>;
}


/**
 * @export
 */
export const AddBleMachineRequestPartsEnum = {
    SwitchbotMotionSensor: 'Switchbot_MotionSensor',
    SwitchbotPlugMini: 'Switchbot_PlugMini',
    MmBlebc5: 'MM_BLEBC5',
    D101: 'D101',
    IBeacon: 'iBeacon',
    IBs02Ir: 'iBS02IR',
    IBs03R: 'iBS03R',
    IBs03F: 'iBS03F',
    IBs03Tp: 'iBS03TP',
    IBs05T: 'iBS05T',
    Salta: 'salta',
    LogttaTh: 'Logtta_TH',
    Omron2Jcie: 'OMRON_2JCIE',
    IbsTh: 'IBS_TH',
    IBs03Adv: 'iBS03ADV',
    IBs03Add: 'iBS03ADD',
    IBs03Ada: 'iBS03ADA',
    RsBtevs1: 'RS_BTEVS1',
    ItokiSensorBox: 'ITOKI_Sensor_Box',
    ItokiChairSensor: 'ITOKI_Chair_Sensor'
} as const;
export type AddBleMachineRequestPartsEnum = typeof AddBleMachineRequestPartsEnum[keyof typeof AddBleMachineRequestPartsEnum];

/**
 * Response containing created BLE converter information.
 * Converter object linking the BLE device to the created machine.
 *
 * @export
 * @interface AddBleMachineResponse
 */
export interface AddBleMachineResponse {
    /**
     * Account ID
     * @type {string}
     * @memberof AddBleMachineResponse
     */
    account_id: string;
    /**
     * Converter ID (format - bluetooth-{address})
     * @type {string}
     * @memberof AddBleMachineResponse
     */
    id: string;
    /**
     * Destination unit ID (format - machine-{machine_id})
     * @type {string}
     * @memberof AddBleMachineResponse
     */
    dest_unit_id: string;
}
/**
 *
 * @export
 * @interface AddConnectionsRequest
 */
export interface AddConnectionsRequest {
    /**
     * Name of the controller model to connect
     * @type {string}
     * @memberof AddConnectionsRequest
     */
    modelName: string;
    /**
     * Version of the controller model
     * @type {number}
     * @memberof AddConnectionsRequest
     */
    modelVersion: number;
    /**
     *
     * @type {AddConnectionsRequestMachineIds}
     * @memberof AddConnectionsRequest
     */
    machineIds: AddConnectionsRequestMachineIds;
    /**
     * Optional configuration for the controller installation
     * @type {{ [key: string]: any; }}
     * @memberof AddConnectionsRequest
     */
    installConfig?: { [key: string]: any; };
}
/**
 * @type AddConnectionsRequestMachineIds
 *
 * @export
 */
export type AddConnectionsRequestMachineIds = Array<string> | string;
/**
 *
 * @export
 * @interface AddConnectionsResponse
 */
export interface AddConnectionsResponse {
    /**
     * Array of created connection objects
     * @type {Array<ConnectionModel>}
     * @memberof AddConnectionsResponse
     */
    connections: Array<ConnectionModel>;
}
/**
 *
 * @export
 * @interface AddInboundSourceRequest
 */
export interface AddInboundSourceRequest {
    /**
     * Human-readable name for the inbound source
     * @type {string}
     * @memberof AddInboundSourceRequest
     */
    displayName?: string;
    /**
     * Data format for incoming requests
     * @type {string}
     * @memberof AddInboundSourceRequest
     */
    format: AddInboundSourceRequestFormatEnum;
    /**
     * Gateway device model
     * @type {string}
     * @memberof AddInboundSourceRequest
     */
    gatewayModel: string;
    /**
     * Unique identifier of the gateway device
     * @type {string}
     * @memberof AddInboundSourceRequest
     */
    gatewayId: string;
}


/**
 * @export
 */
export const AddInboundSourceRequestFormatEnum = {
    XWwwFormUrlencoded: 'application/x-www-form-urlencoded',
    Json: 'application/json'
} as const;
export type AddInboundSourceRequestFormatEnum = typeof AddInboundSourceRequestFormatEnum[keyof typeof AddInboundSourceRequestFormatEnum];

/**
 *
 * @export
 * @interface AddInboundSourceResponse
 */
export interface AddInboundSourceResponse {
    /**
     *
     * @type {InboundSource}
     * @memberof AddInboundSourceResponse
     */
    inboundSource?: InboundSource;
}
/**
 *
 * @export
 * @interface AddIntegrationsRequest
 */
export interface AddIntegrationsRequest {
    /**
     * List of machines to create integrations for
     * @type {Array<AddIntegrationsRequestMachinesInner>}
     * @memberof AddIntegrationsRequest
     */
    machines: Array<AddIntegrationsRequestMachinesInner>;
    /**
     * Type of integration to create
     * @type {string}
     * @memberof AddIntegrationsRequest
     */
    integrationType: AddIntegrationsRequestIntegrationTypeEnum;
    /**
     * Prefix added to integration name
     * @type {string}
     * @memberof AddIntegrationsRequest
     */
    prefix: string;
    /**
     * Integration configuration
     * @type {{ [key: string]: any; }}
     * @memberof AddIntegrationsRequest
     */
    config?: { [key: string]: any; };
    /**
     * Integration schema defining field mappings
     * @type {{ [key: string]: any; }}
     * @memberof AddIntegrationsRequest
     */
    schemaJson?: { [key: string]: any; };
    /**
     *
     * @type {AddIntegrationsRequestService}
     * @memberof AddIntegrationsRequest
     */
    service?: AddIntegrationsRequestService;
}


/**
 * @export
 */
export const AddIntegrationsRequestIntegrationTypeEnum = {
    PubSub: 'PubSub',
    ApiPull: 'APIPull',
    ApiPush: 'APIPush'
} as const;
export type AddIntegrationsRequestIntegrationTypeEnum = typeof AddIntegrationsRequestIntegrationTypeEnum[keyof typeof AddIntegrationsRequestIntegrationTypeEnum];

/**
 *
 * @export
 * @interface AddIntegrationsRequestMachinesInner
 */
export interface AddIntegrationsRequestMachinesInner {
    /**
     * Machine UUID
     * @type {string}
     * @memberof AddIntegrationsRequestMachinesInner
     */
    id: string;
    /**
     * Machine name
     * @type {string}
     * @memberof AddIntegrationsRequestMachinesInner
     */
    name?: string;
}
/**
 * Service-specific settings (required for PubSub)
 * @export
 * @interface AddIntegrationsRequestService
 */
export interface AddIntegrationsRequestService {
    [key: string]: any | any;
    /**
     * Pub/Sub topic name
     * @type {string}
     * @memberof AddIntegrationsRequestService
     */
    topic_name?: string;
}
/**
 *
 * @export
 * @interface AddIntegrationsResponse
 */
export interface AddIntegrationsResponse {
    /**
     * Created integrations
     * @type {Array<Integration>}
     * @memberof AddIntegrationsResponse
     */
    integrations: Array<Integration>;
}
/**
 * Request body for adding an obniz device as a machine
 * @export
 * @interface AddMachineRequest
 */
export interface AddMachineRequest {
    /**
     * Human-readable name for the machine
     * @type {string}
     * @memberof AddMachineRequest
     */
    name: string;
    /**
     * Registration URL from obniz Cloud for the device
     * @type {string}
     * @memberof AddMachineRequest
     */
    obniz_registrate_url: string;
}
/**
 * Response containing created machine and registered obniz device
 * @export
 * @interface AddMachineResponse
 */
export interface AddMachineResponse {
    /**
     *
     * @type {CreatedMachine}
     * @memberof AddMachineResponse
     */
    machine: CreatedMachine;
    /**
     *
     * @type {RegisteredObniz}
     * @memberof AddMachineResponse
     */
    obniz: RegisteredObniz;
}
/**
 *
 * @export
 * @interface AddMachinesToGroup200Response
 */
export interface AddMachinesToGroup200Response {
    /**
     *
     * @type {boolean}
     * @memberof AddMachinesToGroup200Response
     */
    success?: boolean;
    /**
     *
     * @type {AddMachinesToGroup200ResponseData}
     * @memberof AddMachinesToGroup200Response
     */
    data?: AddMachinesToGroup200ResponseData;
}
/**
 *
 * @export
 * @interface AddMachinesToGroup200ResponseData
 */
export interface AddMachinesToGroup200ResponseData {
    /**
     *
     * @type {Array<string>}
     * @memberof AddMachinesToGroup200ResponseData
     */
    added?: Array<string>;
    /**
     *
     * @type {Array<string>}
     * @memberof AddMachinesToGroup200ResponseData
     */
    skipped?: Array<string>;
}
/**
 *
 * @export
 * @interface AddMachinesToGroupRequest
 */
export interface AddMachinesToGroupRequest {
    /**
     *
     * @type {Array<string>}
     * @memberof AddMachinesToGroupRequest
     */
    machine_ids: Array<string>;
}
/**
 *
 * @export
 * @interface AnalyticsResult
 */
export interface AnalyticsResult {
    /**
     * Analytics execution status
     * @type {string}
     * @memberof AnalyticsResult
     */
    status: AnalyticsResultStatusEnum;
    /**
     * Array of analytics calculation results
     * @type {Array<AnalyticsResultItem>}
     * @memberof AnalyticsResult
     */
    result: Array<AnalyticsResultItem>;
}


/**
 * @export
 */
export const AnalyticsResultStatusEnum = {
    Finished: 'finished'
} as const;
export type AnalyticsResultStatusEnum = typeof AnalyticsResultStatusEnum[keyof typeof AnalyticsResultStatusEnum];

/**
 *
 * @export
 * @interface AnalyticsResultItem
 */
export interface AnalyticsResultItem {
    /**
     * Timestamp in milliseconds since epoch
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    ts: number;
    /**
     * Data interval in milliseconds
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    interval_ms: number;
    /**
     * Calculated value 0
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    value0?: number;
    /**
     * Calculated value 1
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    value1?: number;
    /**
     * Calculated value 2
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    value2?: number;
    /**
     * Calculated value 3
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    value3?: number;
    /**
     * Calculated value 4
     * @type {number}
     * @memberof AnalyticsResultItem
     */
    value4?: number;
    /**
     * Additional metadata for the result
     * @type {{ [key: string]: any; }}
     * @memberof AnalyticsResultItem
     */
    metadata?: { [key: string]: any; };
}
/**
 * Account audit log record
 * @export
 * @interface AuditLog
 */
export interface AuditLog {
    /**
     * User ID that performed the operation
     * @type {string}
     * @memberof AuditLog
     */
    user_id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof AuditLog
     */
    account_id: string;
    /**
     * Request path or operation target
     * @type {string}
     * @memberof AuditLog
     */
    path: string;
    /**
     * HTTP method
     * @type {string}
     * @memberof AuditLog
     */
    method: string;
    /**
     * Audit log type
     * @type {string}
     * @memberof AuditLog
     */
    type: string;
    /**
     * Operation summary
     * @type {string}
     * @memberof AuditLog
     */
    action: string;
    /**
     * Timestamp when the operation occurred
     * @type {string}
     * @memberof AuditLog
     */
    ts: string;
}
/**
 * Controller model available for installation
 * @export
 * @interface AvailableController
 */
export interface AvailableController {
    /**
     * Unique identifier for the controller model
     * @type {string}
     * @memberof AvailableController
     */
    identity?: string;
    /**
     * Controller version
     * @type {number}
     * @memberof AvailableController
     */
    version?: number;
    /**
     * Human-readable title for the controller
     * @type {string}
     * @memberof AvailableController
     */
    title?: string;
    /**
     * Detailed description of controller functionality
     * @type {string}
     * @memberof AvailableController
     */
    description?: string;
    /**
     * Type of controller
     * @type {string}
     * @memberof AvailableController
     */
    controller_type?: AvailableControllerControllerTypeEnum;
    /**
     * Minimum role required to install (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof AvailableController
     */
    installRole?: number;
    /**
     *
     * @type {AvailableControllerInstallConfigStructure}
     * @memberof AvailableController
     */
    install_config_structure?: AvailableControllerInstallConfigStructure | null;
    /**
     *
     * @type {AvailableControllerConditions}
     * @memberof AvailableController
     */
    conditions?: AvailableControllerConditions | null;
}


/**
 * @export
 */
export const AvailableControllerControllerTypeEnum = {
    MachineController: 'machine_controller',
    IntelligenceRealtimeMachine: 'intelligence_realtime_machine',
    IntelligenceAsyncMachine: 'intelligence_async_machine',
    IntelligenceAsyncAccount: 'intelligence_async_account',
    IntelligenceHolder: 'intelligence_holder'
} as const;
export type AvailableControllerControllerTypeEnum = typeof AvailableControllerControllerTypeEnum[keyof typeof AvailableControllerControllerTypeEnum];

/**
 * @type AvailableControllerConditions
 * Conditions that must be met before installation
 * @export
 */
export type AvailableControllerConditions = Array<{ [key: string]: any; }> | { [key: string]: any; };
/**
 * @type AvailableControllerInstallConfigStructure
 * Schema defining required installation configuration
 * @export
 */
export type AvailableControllerInstallConfigStructure = Array<InstallConfigStructure> | { [key: string]: any; };
/**
 *
 * @export
 * @interface BatchCreateConnectionsRequest
 */
export interface BatchCreateConnectionsRequest {
    /**
     * Array of units to create
     * @type {Array<BatchCreateConnectionsRequestUnitsInner>}
     * @memberof BatchCreateConnectionsRequest
     */
    units: Array<BatchCreateConnectionsRequestUnitsInner>;
}
/**
 *
 * @export
 * @interface BatchCreateConnectionsRequestUnitsInner
 */
export interface BatchCreateConnectionsRequestUnitsInner {
    /**
     * External device/sensor ID
     * @type {string}
     * @memberof BatchCreateConnectionsRequestUnitsInner
     */
    id: string;
    /**
     * Machine name
     * @type {string}
     * @memberof BatchCreateConnectionsRequestUnitsInner
     */
    name: string;
    /**
     * Controller model name
     * @type {string}
     * @memberof BatchCreateConnectionsRequestUnitsInner
     */
    controllerName: string;
    /**
     * Controller version (defaults to 1)
     * @type {number}
     * @memberof BatchCreateConnectionsRequestUnitsInner
     */
    controllerVersion?: number;
}
/**
 *
 * @export
 * @interface BatchCreateConnectionsResponse
 */
export interface BatchCreateConnectionsResponse {
    /**
     * Results for each unit creation attempt
     * @type {Array<BatchCreateConnectionsResponseResultsInner>}
     * @memberof BatchCreateConnectionsResponse
     */
    results?: Array<BatchCreateConnectionsResponseResultsInner>;
}
/**
 * @type BatchCreateConnectionsResponseResultsInner
 *
 * @export
 */
export type BatchCreateConnectionsResponseResultsInner = BatchCreateError | BatchCreateSuccess;
/**
 *
 * @export
 * @interface BatchCreateError
 */
export interface BatchCreateError {
    /**
     *
     * @type {boolean}
     * @memberof BatchCreateError
     */
    success: boolean;
    /**
     * External device ID that failed
     * @type {string}
     * @memberof BatchCreateError
     */
    external_device_id: string;
    /**
     * Error message
     * @type {string}
     * @memberof BatchCreateError
     */
    error: string;
}
/**
 *
 * @export
 * @interface BatchCreateSuccess
 */
export interface BatchCreateSuccess {
    /**
     *
     * @type {boolean}
     * @memberof BatchCreateSuccess
     */
    success: boolean;
    /**
     * Created unit ID
     * @type {string}
     * @memberof BatchCreateSuccess
     */
    unit_id: string;
    /**
     * External device ID
     * @type {string}
     * @memberof BatchCreateSuccess
     */
    external_device_id: string;
}
/**
 * Request body for creating invitations in bulk
 * @export
 * @interface BulkCreateInvitationsRequest
 */
export interface BulkCreateInvitationsRequest {
    /**
     * Users to invite (1-100)
     * @type {Array<BulkInvitationUser>}
     * @memberof BulkCreateInvitationsRequest
     */
    users: Array<BulkInvitationUser>;
    /**
     * Validity period of the invitation links in days (1-30), applied to all invitations. When omitted, the links never expire
     * @type {number}
     * @memberof BulkCreateInvitationsRequest
     */
    expiration_days?: number;
    /**
     * When `true`, the invitations are approved automatically when the invitees follow the links
     * @type {boolean}
     * @memberof BulkCreateInvitationsRequest
     */
    auto_approve?: boolean;
}
/**
 * Success response of creating invitations in bulk
 * @export
 * @interface BulkCreateInvitationsResponse
 */
export interface BulkCreateInvitationsResponse {
    /**
     * Whether the bulk creation succeeded
     * @type {boolean}
     * @memberof BulkCreateInvitationsResponse
     */
    success: boolean;
    /**
     * Number of invitations created
     * @type {number}
     * @memberof BulkCreateInvitationsResponse
     */
    invited_count: number;
    /**
     * Expiry of the invitation links in `YYYY/MM/DD HH:mm` format (server-local time). The string `無期限` is returned when `expiration_days` was omitted (no expiry)
     * @type {string}
     * @memberof BulkCreateInvitationsResponse
     */
    expires_at: string;
    /**
     * Whether auto approval is enabled
     * @type {boolean}
     * @memberof BulkCreateInvitationsResponse
     */
    auto_approve: boolean;
    /**
     * Number of invitation emails sent successfully
     * @type {number}
     * @memberof BulkCreateInvitationsResponse
     */
    email_sent: number;
    /**
     * Number of invitation emails that failed to send
     * @type {number}
     * @memberof BulkCreateInvitationsResponse
     */
    email_failed: number;
    /**
     * Error messages of the failed email sends
     * @type {Array<string>}
     * @memberof BulkCreateInvitationsResponse
     */
    email_errors: Array<string>;
    /**
     * Array of created invitations
     * @type {Array<BulkInvitationResult>}
     * @memberof BulkCreateInvitationsResponse
     */
    invitations: Array<BulkInvitationResult>;
}
/**
 * A created invitation in the bulk creation response
 * @export
 * @interface BulkInvitationResult
 */
export interface BulkInvitationResult {
    /**
     * Unique identifier of the created invitation (identical to the invitation link token)
     * @type {string}
     * @memberof BulkInvitationResult
     */
    invite_id: string;
    /**
     * Destination email address of the invitation
     * @type {string}
     * @memberof BulkInvitationResult
     */
    email: string;
    /**
     * Role granted on approval
     * @type {string}
     * @memberof BulkInvitationResult
     */
    role: string;
}
/**
 * A user to invite in the bulk creation
 * @export
 * @interface BulkInvitationUser
 */
export interface BulkInvitationUser {
    /**
     * Destination email address of the invitation (required). Requests containing a user with a missing or invalid-format email are rejected with 400
     * @type {string}
     * @memberof BulkInvitationUser
     */
    email: string;
    /**
     * Role granted on approval (required). Requests containing a user with a missing role or a value other than `owner` / `member` / `guest` are rejected with 400
     * @type {string}
     * @memberof BulkInvitationUser
     */
    role: BulkInvitationUserRoleEnum;
    /**
     * Group ID to assign on approval. Ignored when `group_name` is set. Cannot be combined with the `owner` role
     * @type {string}
     * @memberof BulkInvitationUser
     */
    group_id?: string;
    /**
     * Group name to assign on approval. Takes precedence over `group_id` and must match exactly one group in the account
     * @type {string}
     * @memberof BulkInvitationUser
     */
    group_name?: string;
}


/**
 * @export
 */
export const BulkInvitationUserRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type BulkInvitationUserRoleEnum = typeof BulkInvitationUserRoleEnum[keyof typeof BulkInvitationUserRoleEnum];

/**
 * CSV export job object
 * @export
 * @interface CSVExportItem
 */
export interface CSVExportItem {
    /**
     * Unique export job ID
     * @type {string}
     * @memberof CSVExportItem
     */
    export_id?: string;
    /**
     * Current status of the export
     * @type {string}
     * @memberof CSVExportItem
     */
    status?: CSVExportItemStatusEnum;
    /**
     * Export progress percentage
     * @type {number}
     * @memberof CSVExportItem
     */
    progress?: number;
    /**
     * Export filename
     * @type {string}
     * @memberof CSVExportItem
     */
    filename?: string;
    /**
     * Download URL (available when completed)
     * @type {string}
     * @memberof CSVExportItem
     */
    file_url?: string | null;
    /**
     * Export metadata
     * @type {{ [key: string]: any; }}
     * @memberof CSVExportItem
     */
    metadata?: { [key: string]: any; };
    /**
     * Timestamp when export was created
     * @type {string}
     * @memberof CSVExportItem
     */
    created_at?: string;
    /**
     * Timestamp when export was completed
     * @type {string}
     * @memberof CSVExportItem
     */
    completed_at?: string | null;
}


/**
 * @export
 */
export const CSVExportItemStatusEnum = {
    Pending: 'pending',
    Processing: 'processing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type CSVExportItemStatusEnum = typeof CSVExportItemStatusEnum[keyof typeof CSVExportItemStatusEnum];

/**
 * CSV export status details
 * @export
 * @interface CSVExportStatusResponse
 */
export interface CSVExportStatusResponse {
    /**
     * Unique export job ID
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    export_id: string;
    /**
     * Current status of the export
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    status: CSVExportStatusResponseStatusEnum;
    /**
     * Export progress percentage (0-100)
     * @type {number}
     * @memberof CSVExportStatusResponse
     */
    progress: number;
    /**
     * Export filename
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    filename?: string;
    /**
     * Download URL (available when completed)
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    file_url?: string | null;
    /**
     * Export metadata (units, properties, dates, etc.)
     * @type {{ [key: string]: any; }}
     * @memberof CSVExportStatusResponse
     */
    metadata?: { [key: string]: any; };
    /**
     * Timestamp when export was created
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    created_at: string;
    /**
     * Timestamp when export was completed
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    completed_at?: string | null;
}


/**
 * @export
 */
export const CSVExportStatusResponseStatusEnum = {
    Pending: 'pending',
    Processing: 'processing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type CSVExportStatusResponseStatusEnum = typeof CSVExportStatusResponseStatusEnum[keyof typeof CSVExportStatusResponseStatusEnum];

/**
 * Response containing available firmware versions
 * @export
 * @interface CheckNewVersionResponse
 */
export interface CheckNewVersionResponse {
    /**
     * Array of available firmware/OS versions
     * @type {Array<FirmwareVersionInfo>}
     * @memberof CheckNewVersionResponse
     */
    latestFirmwareVersion: Array<FirmwareVersionInfo>;
}
/**
 *
 * @export
 * @interface CheckboxField
 */
export interface CheckboxField {
    /**
     *
     * @type {string}
     * @memberof CheckboxField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof CheckboxField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof CheckboxField
     */
    type: CheckboxFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof CheckboxField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof CheckboxField
     */
    placeholder?: string;
    /**
     *
     * @type {boolean}
     * @memberof CheckboxField
     */
    defaultValue?: boolean;
    /**
     *
     * @type {ValidationRule}
     * @memberof CheckboxField
     */
    validation?: ValidationRule;
    /**
     *
     * @type {boolean}
     * @memberof CheckboxField
     */
    value?: boolean;
}


/**
 * @export
 */
export const CheckboxFieldTypeEnum = {
    Checkbox: 'checkbox'
} as const;
export type CheckboxFieldTypeEnum = typeof CheckboxFieldTypeEnum[keyof typeof CheckboxFieldTypeEnum];

/**
 *
 * @export
 * @interface CloseIssueResponse
 */
export interface CloseIssueResponse {
    /**
     *
     * @type {Issue}
     * @memberof CloseIssueResponse
     */
    issue: Issue;
}

/**
 * Code storage type for intelligence
 * @export
 */
export const CodeType = {
    Repository: 'repository',
    Code: 'code'
} as const;
export type CodeType = typeof CodeType[keyof typeof CodeType];

/**
 * Connection model object linking a controller to a machine
 * @export
 * @interface ConnectionModel
 */
export interface ConnectionModel {
    /**
     * Unique connection identifier
     * @type {number}
     * @memberof ConnectionModel
     */
    id?: number;
    /**
     * Machine ID this connection is linked to
     * @type {string}
     * @memberof ConnectionModel
     */
    machine_id?: string;
    /**
     * Controller model name
     * @type {string}
     * @memberof ConnectionModel
     */
    model_name?: string;
    /**
     * Controller model version
     * @type {number}
     * @memberof ConnectionModel
     */
    model_version?: number;
    /**
     * Minimum role level required to view this connection (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof ConnectionModel
     */
    view_role_level?: number;
    /**
     * Configuration for the controller installation
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModel
     */
    install_config?: { [key: string]: any; } | null;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof ConnectionModel
     */
    created_at?: string;
    /**
     * Timestamp when the connection was last updated
     * @type {string}
     * @memberof ConnectionModel
     */
    updated_at?: string;
}
/**
 * Detailed connection model with configuration and permissions
 * @export
 * @interface ConnectionModelDetailed
 */
export interface ConnectionModelDetailed {
    /**
     * Connection model ID
     * @type {number}
     * @memberof ConnectionModelDetailed
     */
    id: number;
    /**
     * Machine ID this model is connected to
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    machine_id: string;
    /**
     * Controller model name (identity)
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    model_name: string;
    /**
     * Controller version
     * @type {number}
     * @memberof ConnectionModelDetailed
     */
    model_version: number;
    /**
     * Minimum role level required to view this model (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof ConnectionModelDetailed
     */
    view_role_level: number;
    /**
     * Installation configuration for the controller
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModelDetailed
     */
    install_config?: { [key: string]: any; } | null;
    /**
     *
     * @type {ConnectionModelDetailedInstallConfigStructure}
     * @memberof ConnectionModelDetailed
     */
    install_config_structure?: ConnectionModelDetailedInstallConfigStructure | null;
    /**
     * Whether the current user has permission to delete this model
     * @type {boolean}
     * @memberof ConnectionModelDetailed
     */
    can_delete?: boolean;
    /**
     *
     * @type {ConnectionModelDetailedConditions}
     * @memberof ConnectionModelDetailed
     */
    conditions?: ConnectionModelDetailedConditions | null;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    created_at?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    updated_at?: string;
}
/**
 * @type ConnectionModelDetailedConditions
 * Conditions that must be met for installation
 * @export
 */
export type ConnectionModelDetailedConditions = Array<{ [key: string]: any; }> | { [key: string]: any; };
/**
 * @type ConnectionModelDetailedInstallConfigStructure
 * Schema defining the structure of install_config
 * @export
 */
export type ConnectionModelDetailedInstallConfigStructure = Array<InstallConfigStructure> | { [key: string]: any; };
/**
 * Result of a single connection model operation
 * @export
 * @interface ConnectionModelOperationResult
 */
export interface ConnectionModelOperationResult {
    /**
     *
     * @type {string}
     * @memberof ConnectionModelOperationResult
     */
    model_name: string;
    /**
     *
     * @type {string}
     * @memberof ConnectionModelOperationResult
     */
    status: ConnectionModelOperationResultStatusEnum;
    /**
     * Error message if status is "error"
     * @type {string}
     * @memberof ConnectionModelOperationResult
     */
    message?: string;
    /**
     * Created/updated model data (only for added/updated status)
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModelOperationResult
     */
    data?: { [key: string]: any; };
}


/**
 * @export
 */
export const ConnectionModelOperationResultStatusEnum = {
    Added: 'added',
    Updated: 'updated',
    Deleted: 'deleted',
    Error: 'error'
} as const;
export type ConnectionModelOperationResultStatusEnum = typeof ConnectionModelOperationResultStatusEnum[keyof typeof ConnectionModelOperationResultStatusEnum];

/**
 * Connection model item for batch update operation
 * @export
 * @interface ConnectionModelUpdateItem
 */
export interface ConnectionModelUpdateItem {
    /**
     * Controller model name (identity)
     * @type {string}
     * @memberof ConnectionModelUpdateItem
     */
    model_name: string;
    /**
     * Controller version
     * @type {number}
     * @memberof ConnectionModelUpdateItem
     */
    model_version: number;
    /**
     * Minimum role level required to view this model (0=Owner, 1=User, 2=Guest)
     * @type {number}
     * @memberof ConnectionModelUpdateItem
     */
    view_role_level?: number;
    /**
     * Installation configuration for the controller
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModelUpdateItem
     */
    install_config?: { [key: string]: any; } | null;
}
/**
 * Connection model with associated controller and machine information
 * @export
 * @interface ConnectionWithController
 */
export interface ConnectionWithController {
    /**
     * Connection ID
     * @type {number}
     * @memberof ConnectionWithController
     */
    id?: number;
    /**
     * Name of the controller model
     * @type {string}
     * @memberof ConnectionWithController
     */
    model_name?: string;
    /**
     * Version of the controller model
     * @type {number}
     * @memberof ConnectionWithController
     */
    model_version?: number;
    /**
     * ID of the machine this connection is linked to
     * @type {string}
     * @memberof ConnectionWithController
     */
    machine_id?: string;
    /**
     * Name of the machine
     * @type {string}
     * @memberof ConnectionWithController
     */
    machine_name?: string;
    /**
     * Type of the controller
     * @type {string}
     * @memberof ConnectionWithController
     */
    controller_type?: ConnectionWithControllerControllerTypeEnum;
    /**
     * Display title of the controller
     * @type {string}
     * @memberof ConnectionWithController
     */
    controller_title?: string;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof ConnectionWithController
     */
    created_at?: string;
}


/**
 * @export
 */
export const ConnectionWithControllerControllerTypeEnum = {
    MachineController: 'machine_controller',
    IntelligenceRealtimeMachine: 'intelligence_realtime_machine',
    IntelligenceAsyncMachine: 'intelligence_async_machine',
    IntelligenceAsyncAccount: 'intelligence_async_account',
    IntelligenceHolder: 'intelligence_holder'
} as const;
export type ConnectionWithControllerControllerTypeEnum = typeof ConnectionWithControllerControllerTypeEnum[keyof typeof ConnectionWithControllerControllerTypeEnum];


/**
 * Visibility status of the controller
 * @export
 */
export const ControllerPublishment = {
    Public: 'public',
    Private: 'private'
} as const;
export type ControllerPublishment = typeof ControllerPublishment[keyof typeof ControllerPublishment];


/**
 * Type of controller for intelligence
 * @export
 */
export const ControllerType = {
    MachineController: 'machine_controller',
    IntelligenceRealtimeMachine: 'intelligence_realtime_machine',
    IntelligenceAsyncMachine: 'intelligence_async_machine',
    IntelligenceAsyncAccount: 'intelligence_async_account',
    IntelligenceHolder: 'intelligence_holder'
} as const;
export type ControllerType = typeof ControllerType[keyof typeof ControllerType];

/**
 * Converter object mapping external device IDs to internal unit IDs
 * @export
 * @interface Converter
 */
export interface Converter {
    /**
     * External device identifier, typically formatted as {protocol}-{address}. Common formats - bluetooth-{MAC}, rfid-{tag_id}
     * @type {string}
     * @memberof Converter
     */
    id: string;
    /**
     * Account ID that owns this converter
     * @type {string}
     * @memberof Converter
     */
    account_id: string;
    /**
     * Destination unit ID where data should be routed. Typically in the format machine-{machine_id}
     * @type {string}
     * @memberof Converter
     */
    dest_unit_id: string;
}
/**
 * Request to create a new CSV export job
 * @export
 * @interface CreateCSVExportRequest
 */
export interface CreateCSVExportRequest {
    /**
     * Array of units to export
     * @type {Array<CreateCSVExportRequestUnitsInner>}
     * @memberof CreateCSVExportRequest
     */
    units: Array<CreateCSVExportRequestUnitsInner>;
    /**
     * Array of properties to export
     * @type {Array<CreateCSVExportRequestPropertiesInner>}
     * @memberof CreateCSVExportRequest
     */
    properties: Array<CreateCSVExportRequestPropertiesInner>;
    /**
     * Start date for data export
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    start_date: string;
    /**
     * End date for data export
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    end_date: string;
    /**
     * Type of export (optional)
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    export_type?: string;
    /**
     *
     * @type {CreateCSVExportRequestOptions}
     * @memberof CreateCSVExportRequest
     */
    options?: CreateCSVExportRequestOptions;
    /**
     * Group ID to associate with the export
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    group_id?: string | null;
    /**
     * Custom name for the export
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    name?: string;
}
/**
 * Export options
 * @export
 * @interface CreateCSVExportRequestOptions
 */
export interface CreateCSVExportRequestOptions {
    /**
     * File format
     * @type {string}
     * @memberof CreateCSVExportRequestOptions
     */
    format?: CreateCSVExportRequestOptionsFormatEnum;
    /**
     * Character encoding
     * @type {string}
     * @memberof CreateCSVExportRequestOptions
     */
    encoding?: CreateCSVExportRequestOptionsEncodingEnum;
}


/**
 * @export
 */
export const CreateCSVExportRequestOptionsFormatEnum = {
    Csv: 'csv',
    Tsv: 'tsv'
} as const;
export type CreateCSVExportRequestOptionsFormatEnum = typeof CreateCSVExportRequestOptionsFormatEnum[keyof typeof CreateCSVExportRequestOptionsFormatEnum];

/**
 * @export
 */
export const CreateCSVExportRequestOptionsEncodingEnum = {
    Utf8: 'utf-8',
    ShiftJis: 'shift-jis'
} as const;
export type CreateCSVExportRequestOptionsEncodingEnum = typeof CreateCSVExportRequestOptionsEncodingEnum[keyof typeof CreateCSVExportRequestOptionsEncodingEnum];

/**
 *
 * @export
 * @interface CreateCSVExportRequestPropertiesInner
 */
export interface CreateCSVExportRequestPropertiesInner {
    /**
     * Property key to export
     * @type {string}
     * @memberof CreateCSVExportRequestPropertiesInner
     */
    key: string;
    /**
     * Optional label for the property
     * @type {string}
     * @memberof CreateCSVExportRequestPropertiesInner
     */
    label?: string;
}
/**
 *
 * @export
 * @interface CreateCSVExportRequestUnitsInner
 */
export interface CreateCSVExportRequestUnitsInner {
    /**
     * Unit ID (machine ID)
     * @type {string}
     * @memberof CreateCSVExportRequestUnitsInner
     */
    unit_id: string;
    /**
     * Human-readable label for the unit
     * @type {string}
     * @memberof CreateCSVExportRequestUnitsInner
     */
    label: string;
}
/**
 * Response containing created CSV export job details
 * @export
 * @interface CreateCSVExportResponse
 */
export interface CreateCSVExportResponse {
    /**
     * Unique export job ID
     * @type {string}
     * @memberof CreateCSVExportResponse
     */
    export_id: string;
    /**
     * Current status of the export
     * @type {string}
     * @memberof CreateCSVExportResponse
     */
    status: string;
    /**
     * Export progress percentage
     * @type {number}
     * @memberof CreateCSVExportResponse
     */
    progress: number;
    /**
     * Timestamp when export was created
     * @type {string}
     * @memberof CreateCSVExportResponse
     */
    created_at: string;
}
/**
 *
 * @export
 * @interface CreateCurrentAccountApiKeyRequest
 */
export interface CreateCurrentAccountApiKeyRequest {
    /**
     *
     * @type {string}
     * @memberof CreateCurrentAccountApiKeyRequest
     */
    name: string;
    /**
     * API key permissions keyed by resource name.
     * @type {{ [key: string]: { [key: string]: boolean; }; }}
     * @memberof CreateCurrentAccountApiKeyRequest
     */
    authority?: { [key: string]: { [key: string]: boolean; }; };
}
/**
 *
 * @export
 * @interface CreateCurrentAccountApiKeyResponse
 */
export interface CreateCurrentAccountApiKeyResponse {
    /**
     *
     * @type {CurrentAccountApiKeySummary}
     * @memberof CreateCurrentAccountApiKeyResponse
     */
    api_key: CurrentAccountApiKeySummary;
    /**
     * Full API token. Returned only once when the key is created.
     * @type {string}
     * @memberof CreateCurrentAccountApiKeyResponse
     */
    token: string;
}
/**
 *
 * @export
 * @interface CreateCurrentAccountMember404Response
 */
export interface CreateCurrentAccountMember404Response {
    /**
     *
     * @type {any}
     * @memberof CreateCurrentAccountMember404Response
     */
    error?: any | null;
}
/**
 *
 * @export
 * @interface CreateCurrentAccountMemberRequest
 */
export interface CreateCurrentAccountMemberRequest {
    /**
     *
     * @type {string}
     * @memberof CreateCurrentAccountMemberRequest
     */
    user_id: string;
    /**
     *
     * @type {AccountMemberRole}
     * @memberof CreateCurrentAccountMemberRequest
     */
    role: AccountMemberRole;
    /**
     *
     * @type {string}
     * @memberof CreateCurrentAccountMemberRequest
     */
    group_id?: string | null;
}


/**
 *
 * @export
 * @interface CreateGroup201Response
 */
export interface CreateGroup201Response {
    /**
     *
     * @type {boolean}
     * @memberof CreateGroup201Response
     */
    success?: boolean;
    /**
     *
     * @type {string}
     * @memberof CreateGroup201Response
     */
    message?: string;
    /**
     *
     * @type {CreateGroup201ResponseData}
     * @memberof CreateGroup201Response
     */
    data?: CreateGroup201ResponseData;
}
/**
 *
 * @export
 * @interface CreateGroup201ResponseData
 */
export interface CreateGroup201ResponseData {
    /**
     *
     * @type {Group}
     * @memberof CreateGroup201ResponseData
     */
    group?: Group;
}
/**
 *
 * @export
 * @interface CreateGroupRequest
 */
export interface CreateGroupRequest {
    /**
     * Unique group name within the account
     * @type {string}
     * @memberof CreateGroupRequest
     */
    name: string;
}
/**
 * Request body for creating an invitation
 * @export
 * @interface CreateInvitationRequest
 */
export interface CreateInvitationRequest {
    /**
     * Destination email address of the invitation. When a valid address is given, it is recorded as `sent_to` and the invitation email is queued. When omitted, only the invitation link is created and no email is sent
     * @type {string}
     * @memberof CreateInvitationRequest
     */
    email?: string;
    /**
     * Role granted on approval (required). Requests with a missing role or a value other than `owner` / `member` / `guest` are rejected with 400. The plan invitation limit for the role is checked
     * @type {string}
     * @memberof CreateInvitationRequest
     */
    role: CreateInvitationRequestRoleEnum;
    /**
     * Group ID to assign on approval. Cannot be combined with the `owner` role
     * @type {string}
     * @memberof CreateInvitationRequest
     */
    group_id?: string;
    /**
     * Validity period of the invitation link in days (1-30). When omitted, the link never expires
     * @type {number}
     * @memberof CreateInvitationRequest
     */
    expiration_days?: number;
    /**
     * When `true`, the invitation is approved automatically when the invitee follows the link
     * @type {boolean}
     * @memberof CreateInvitationRequest
     */
    auto_approve?: boolean;
}


/**
 * @export
 */
export const CreateInvitationRequestRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type CreateInvitationRequestRoleEnum = typeof CreateInvitationRequestRoleEnum[keyof typeof CreateInvitationRequestRoleEnum];

/**
 * Success response of creating an invitation
 * @export
 * @interface CreateInvitationResponse
 */
export interface CreateInvitationResponse {
    /**
     * Unique identifier of the created invitation (identical to the invitation link token)
     * @type {string}
     * @memberof CreateInvitationResponse
     */
    invite_id: string;
    /**
     * Expiry of the invitation link in `YYYY/MM/DD HH:mm` format (server-local time). The string `無期限` is returned when `expiration_days` was omitted (no expiry)
     * @type {string}
     * @memberof CreateInvitationResponse
     */
    expires_at: string;
    /**
     * Whether auto approval is enabled
     * @type {boolean}
     * @memberof CreateInvitationResponse
     */
    auto_approve: boolean;
    /**
     * Whether the invitation email was queued for sending
     * @type {boolean}
     * @memberof CreateInvitationResponse
     */
    email_queued: boolean;
}
/**
 * Request to create a new notification destination
 * @export
 * @interface CreateNotificationRequest
 */
export interface CreateNotificationRequest {
    /**
     * Human-readable notification name
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    name: string;
    /**
     * Type of notification destination
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    type: CreateNotificationRequestTypeEnum;
    /**
     * Optional group ID to restrict notification to a specific group
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    group_id?: string | null;
    /**
     * JSON-encoded destination configuration. Structure depends on type.
     * For email: {"to": ["email@example.com"], "cc": ["cc@example.com"], "bcc": ["bcc@example.com"]}
     * - to: required, can be comma-separated string or array
     * - cc, bcc: optional, can be comma-separated string or array
     * All emails are validated for format and duplicates across to/cc/bcc
     *
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    destination: string;
    /**
     * Subject template. Supports {:key} placeholders for dynamic values.
     * When not set (null), the subject generated by the controller is used as-is.
     *
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    template_title?: string | null;
    /**
     * Body template. Supports {:key} placeholders for dynamic values.
     * When not set (null), the message generated by the controller is used as-is.
     *
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    template_body?: string | null;
}


/**
 * @export
 */
export const CreateNotificationRequestTypeEnum = {
    Email: 'email',
    Slack: 'slack',
    Webhook: 'webhook'
} as const;
export type CreateNotificationRequestTypeEnum = typeof CreateNotificationRequestTypeEnum[keyof typeof CreateNotificationRequestTypeEnum];

/**
 * Response containing the created notification
 * @export
 * @interface CreateNotificationResponse
 */
export interface CreateNotificationResponse {
    /**
     *
     * @type {Notification}
     * @memberof CreateNotificationResponse
     */
    notification: Notification;
}
/**
 * @type CreateThread400Response
 *
 * @export
 */
export type CreateThread400Response = FileUploadError | ValidationError;
/**
 *
 * @export
 * @interface CreateThreadPostResponse
 */
export interface CreateThreadPostResponse {
    /**
     *
     * @type {ThreadPost}
     * @memberof CreateThreadPostResponse
     */
    post: ThreadPost;
}
/**
 *
 * @export
 * @interface CreateThreadRequest
 */
export interface CreateThreadRequest {
    /**
     * Thread title
     * @type {string}
     * @memberof CreateThreadRequest
     */
    title: string;
    /**
     * Group ID (optional for owner role, required for guest role)
     * @type {string}
     * @memberof CreateThreadRequest
     */
    group_id?: string;
    /**
     *
     * @type {InitialPost}
     * @memberof CreateThreadRequest
     */
    initial_post: InitialPost;
}
/**
 *
 * @export
 * @interface CreateThreadResponse
 */
export interface CreateThreadResponse {
    /**
     *
     * @type {Thread}
     * @memberof CreateThreadResponse
     */
    thread: Thread;
    /**
     * Array of posts (contains the initial post)
     * @type {Array<ThreadPost>}
     * @memberof CreateThreadResponse
     */
    posts: Array<ThreadPost>;
}
/**
 * Created machine object
 * @export
 * @interface CreatedMachine
 */
export interface CreatedMachine {
    /**
     * Machine ID (UUID)
     * @type {string}
     * @memberof CreatedMachine
     */
    id?: string;
    /**
     * Account ID
     * @type {string}
     * @memberof CreatedMachine
     */
    account_id?: string;
    /**
     * Machine name
     * @type {string}
     * @memberof CreatedMachine
     */
    name?: string;
    /**
     * Connected obniz device ID
     * @type {string}
     * @memberof CreatedMachine
     */
    connected_obniz_id?: string;
}
/**
 *
 * @export
 * @interface CurrentAccountApiKeyDetail
 */
export interface CurrentAccountApiKeyDetail {
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    name: string;
    /**
     * API key permissions keyed by resource name.
     * @type {{ [key: string]: { [key: string]: boolean; }; }}
     * @memberof CurrentAccountApiKeyDetail
     */
    authority: { [key: string]: { [key: string]: boolean; }; };
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    created_at: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    updated_at: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    last_used_at: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    created_by_user_id: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyDetail
     */
    last_used_ip: string;
}
/**
 *
 * @export
 * @interface CurrentAccountApiKeyPermissionsResponse
 */
export interface CurrentAccountApiKeyPermissionsResponse {
    /**
     *
     * @type {Array<CurrentAccountApiKeyPermissionsResponseResourcesInner>}
     * @memberof CurrentAccountApiKeyPermissionsResponse
     */
    resources: Array<CurrentAccountApiKeyPermissionsResponseResourcesInner>;
}
/**
 *
 * @export
 * @interface CurrentAccountApiKeyPermissionsResponseResourcesInner
 */
export interface CurrentAccountApiKeyPermissionsResponseResourcesInner {
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeyPermissionsResponseResourcesInner
     */
    key: string;
    /**
     *
     * @type {Array<string>}
     * @memberof CurrentAccountApiKeyPermissionsResponseResourcesInner
     */
    actions: Array<string>;
}
/**
 *
 * @export
 * @interface CurrentAccountApiKeySummary
 */
export interface CurrentAccountApiKeySummary {
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeySummary
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeySummary
     */
    name: string;
    /**
     * API key permissions keyed by resource name.
     * @type {{ [key: string]: { [key: string]: boolean; }; }}
     * @memberof CurrentAccountApiKeySummary
     */
    authority: { [key: string]: { [key: string]: boolean; }; };
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeySummary
     */
    created_at: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeySummary
     */
    updated_at: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountApiKeySummary
     */
    last_used_at: string | null;
}
/**
 *
 * @export
 * @interface CurrentAccountForbiddenResponse
 */
export interface CurrentAccountForbiddenResponse {
    /**
     *
     * @type {boolean}
     * @memberof CurrentAccountForbiddenResponse
     */
    success?: boolean;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountForbiddenResponse
     */
    error: string;
    /**
     *
     * @type {string}
     * @memberof CurrentAccountForbiddenResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface CurrentAccountOkResponse
 */
export interface CurrentAccountOkResponse {
    /**
     *
     * @type {boolean}
     * @memberof CurrentAccountOkResponse
     */
    ok: boolean;
}
/**
 *
 * @export
 * @interface CurrentAccountSecretExistsResponse
 */
export interface CurrentAccountSecretExistsResponse {
    /**
     *
     * @type {boolean}
     * @memberof CurrentAccountSecretExistsResponse
     */
    _exists: boolean;
}

/**
 *
 * @export
 */
export const CurrentAccountSecretKey = {
    ApiKey: 'itoki_ra_api_key',
    EncryptionKey: 'itoki_ra_encryption_key'
} as const;
export type CurrentAccountSecretKey = typeof CurrentAccountSecretKey[keyof typeof CurrentAccountSecretKey];

/**
 *
 * @export
 * @interface CurrentUser
 */
export interface CurrentUser {
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    name: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    email: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    language: CurrentUserLanguageEnum;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    profile_picture_url: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    role: CurrentUserRoleEnum | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    account_id: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    account_name: string | null;
    /**
     *
     * @type {string}
     * @memberof CurrentUser
     */
    group_id: string | null;
}


/**
 * @export
 */
export const CurrentUserLanguageEnum = {
    En: 'en',
    Ja: 'ja'
} as const;
export type CurrentUserLanguageEnum = typeof CurrentUserLanguageEnum[keyof typeof CurrentUserLanguageEnum];

/**
 * @export
 */
export const CurrentUserRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type CurrentUserRoleEnum = typeof CurrentUserRoleEnum[keyof typeof CurrentUserRoleEnum];


/**
 *
 * @export
 */
export const CustomizeCategory = {
    Machine: 'machine',
    MachinesIndex: 'machines_index',
    InvestigationsEvents: 'investigations_events',
    InvestigationsIssues: 'investigations_issues',
    InvestigationsThreads: 'investigations_threads',
    ReportsOperations: 'reports_operations',
    ReportsExpects: 'reports_expects',
    DashboardsIndex: 'dashboards_index',
    IntegrationsIndex: 'integrations_index',
    InboundSourcesIndex: 'inbound_sources_index',
    GroupsIndex: 'groups_index',
    GroupView: 'group_view',
    AccountSettings: 'account_settings'
} as const;
export type CustomizeCategory = typeof CustomizeCategory[keyof typeof CustomizeCategory];

/**
 *
 * @export
 * @interface CustomizeComponent
 */
export interface CustomizeComponent {
    /**
     *
     * @type {CustomizeCategory}
     * @memberof CustomizeComponent
     */
    category: CustomizeCategory;
    /**
     *
     * @type {string}
     * @memberof CustomizeComponent
     */
    model: string;
    /**
     *
     * @type {number}
     * @memberof CustomizeComponent
     */
    version: number;
    /**
     *
     * @type {string}
     * @memberof CustomizeComponent
     */
    key: string;
    /**
     *
     * @type {string}
     * @memberof CustomizeComponent
     */
    type: CustomizeComponentTypeEnum;
    /**
     *
     * @type {string}
     * @memberof CustomizeComponent
     */
    asset_url: string;
}


/**
 * @export
 */
export const CustomizeComponentTypeEnum = {
    Html: 'html',
    Svelte: 'svelte'
} as const;
export type CustomizeComponentTypeEnum = typeof CustomizeComponentTypeEnum[keyof typeof CustomizeComponentTypeEnum];

/**
 *
 * @export
 * @interface CustomizeResolveResponse
 */
export interface CustomizeResolveResponse {
    /**
     *
     * @type {Array<CustomizeComponent>}
     * @memberof CustomizeResolveResponse
     */
    components: Array<CustomizeComponent>;
}
/**
 * Response confirming successful machine deletion
 * @export
 * @interface DeleteMachineResponse
 */
export interface DeleteMachineResponse {
    /**
     *
     * @type {boolean}
     * @memberof DeleteMachineResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof DeleteMachineResponse
     */
    message: string;
    /**
     * ID of the deleted machine
     * @type {string}
     * @memberof DeleteMachineResponse
     */
    deleted_machine_id: string;
}
/**
 * Device details
 * @export
 * @interface DeviceInfo
 */
export interface DeviceInfo {
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof DeviceInfo
     */
    id: string;
    /**
     * Hardware type
     * @type {string}
     * @memberof DeviceInfo
     */
    hardware?: string | null;
    /**
     * Operating system name
     * @type {string}
     * @memberof DeviceInfo
     */
    os?: string | null;
    /**
     * Current OS/firmware version
     * @type {string}
     * @memberof DeviceInfo
     */
    osVersion?: string | null;
    /**
     * Device status
     * @type {string}
     * @memberof DeviceInfo
     */
    status?: string | null;
    /**
     * Whether device is currently online
     * @type {boolean}
     * @memberof DeviceInfo
     */
    isOnline?: boolean;
    /**
     *
     * @type {DeviceInfoBatchItemConnectedNetwork}
     * @memberof DeviceInfo
     */
    connectedNetwork?: DeviceInfoBatchItemConnectedNetwork | null;
}
/**
 * Device information item in batch response
 * @export
 * @interface DeviceInfoBatchItem
 */
export interface DeviceInfoBatchItem {
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    deviceId: string;
    /**
     * Machine ID
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    machineId: string;
    /**
     * Hardware type
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    hardware?: string | null;
    /**
     * Operating system name
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    os?: string | null;
    /**
     * Current OS/firmware version
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    osVersion?: string | null;
    /**
     * Device status
     * @type {string}
     * @memberof DeviceInfoBatchItem
     */
    status?: string | null;
    /**
     * Whether device is currently online
     * @type {boolean}
     * @memberof DeviceInfoBatchItem
     */
    isOnline?: boolean;
    /**
     *
     * @type {DeviceInfoBatchItemConnectedNetwork}
     * @memberof DeviceInfoBatchItem
     */
    connectedNetwork?: DeviceInfoBatchItemConnectedNetwork | null;
}
/**
 * Network connection information
 * @export
 * @interface DeviceInfoBatchItemConnectedNetwork
 */
export interface DeviceInfoBatchItemConnectedNetwork {
    [key: string]: any | any;
    /**
     * Timestamp when device came online
     * @type {string}
     * @memberof DeviceInfoBatchItemConnectedNetwork
     */
    online_at?: string;
    /**
     * Network type
     * @type {string}
     * @memberof DeviceInfoBatchItemConnectedNetwork
     */
    net?: string;
}
/**
 * Device information request item
 * @export
 * @interface DeviceInfoBatchRequest
 */
export interface DeviceInfoBatchRequest {
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof DeviceInfoBatchRequest
     */
    deviceId: string;
    /**
     * Machine ID for caching and state updates
     * @type {string}
     * @memberof DeviceInfoBatchRequest
     */
    machineId: string;
    /**
     * Current firmware version (for comparison and cache invalidation)
     * @type {string}
     * @memberof DeviceInfoBatchRequest
     */
    currentFirmwareVersion?: string | null;
    /**
     * Current hardware type (for comparison and cache invalidation)
     * @type {string}
     * @memberof DeviceInfoBatchRequest
     */
    hardwareType?: string | null;
}
/**
 * Batch device information response
 * @export
 * @interface DeviceInfoBatchResponse
 */
export interface DeviceInfoBatchResponse {
    /**
     * Array of device information (may be partial if some requests failed)
     * @type {Array<DeviceInfoBatchItem>}
     * @memberof DeviceInfoBatchResponse
     */
    devices: Array<DeviceInfoBatchItem>;
}
/**
 * Device information response
 * @export
 * @interface DeviceInfoResponse
 */
export interface DeviceInfoResponse {
    /**
     *
     * @type {DeviceInfo}
     * @memberof DeviceInfoResponse
     */
    device: DeviceInfo;
}
/**
 * Device item containing machine, states, and groups
 * @export
 * @interface DeviceItem
 */
export interface DeviceItem {
    /**
     *
     * @type {Machine}
     * @memberof DeviceItem
     */
    machine: Machine;
    /**
     * Device states (only firmware_version and hardware_type)
     * @type {{ [key: string]: DeviceItemStatesValue; }}
     * @memberof DeviceItem
     */
    states?: { [key: string]: DeviceItemStatesValue; };
    /**
     * Groups this machine belongs to
     * @type {Array<DeviceItemGroupsInner>}
     * @memberof DeviceItem
     */
    groups?: Array<DeviceItemGroupsInner>;
}
/**
 *
 * @export
 * @interface DeviceItemGroupsInner
 */
export interface DeviceItemGroupsInner {
    /**
     * Group ID
     * @type {string}
     * @memberof DeviceItemGroupsInner
     */
    id?: string;
    /**
     * Group name
     * @type {string}
     * @memberof DeviceItemGroupsInner
     */
    name?: string;
}
/**
 *
 * @export
 * @interface DeviceItemStatesValue
 */
export interface DeviceItemStatesValue {
    /**
     *
     * @type {DeviceItemStatesValueValue}
     * @memberof DeviceItemStatesValue
     */
    value?: DeviceItemStatesValueValue;
    /**
     * Timestamp when state was updated
     * @type {string}
     * @memberof DeviceItemStatesValue
     */
    ts?: string;
}
/**
 * @type DeviceItemStatesValueValue
 * State value
 * @export
 */
export type DeviceItemStatesValueValue = number | string;
/**
 * Single device update item
 * @export
 * @interface DeviceUpdateItem
 */
export interface DeviceUpdateItem {
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof DeviceUpdateItem
     */
    deviceId: string;
    /**
     * Latest firmware update record, or null if no record exists
     * @type {FirmwareUpdateRecord}
     * @memberof DeviceUpdateItem
     */
    firmwareUpdate: FirmwareUpdateRecord | null;
}
/**
 * Paginated devices list response
 * @export
 * @interface DevicesListResponse
 */
export interface DevicesListResponse {
    /**
     * Total number of devices matching the filter
     * @type {number}
     * @memberof DevicesListResponse
     */
    count: number;
    /**
     * Maximum number of records returned
     * @type {number}
     * @memberof DevicesListResponse
     */
    limit: number;
    /**
     * Number of records skipped
     * @type {number}
     * @memberof DevicesListResponse
     */
    offset: number;
    /**
     * Array of device items with machine, states, and groups
     * @type {Array<DeviceItem>}
     * @memberof DevicesListResponse
     */
    items: Array<DeviceItem>;
}
/**
 *
 * @export
 * @interface EntitlementSummary
 */
export interface EntitlementSummary {
    /**
     *
     * @type {PlanKey}
     * @memberof EntitlementSummary
     */
    key: PlanKey;
    /**
     *
     * @type {string}
     * @memberof EntitlementSummary
     */
    kind: EntitlementSummaryKindEnum;
    /**
     *
     * @type {string}
     * @memberof EntitlementSummary
     */
    unit?: string | null;
    /**
     *
     * @type {boolean}
     * @memberof EntitlementSummary
     */
    enabled: boolean;
    /**
     *
     * @type {number}
     * @memberof EntitlementSummary
     */
    limit: number;
    /**
     *
     * @type {number}
     * @memberof EntitlementSummary
     */
    current?: number;
    /**
     *
     * @type {number}
     * @memberof EntitlementSummary
     */
    remaining?: number | null;
    /**
     *
     * @type {string}
     * @memberof EntitlementSummary
     */
    description: string;
    /**
     *
     * @type {string}
     * @memberof EntitlementSummary
     */
    source: EntitlementSummarySourceEnum;
    /**
     *
     * @type {string}
     * @memberof EntitlementSummary
     */
    usage_source: EntitlementSummaryUsageSourceEnum;
    /**
     *
     * @type {boolean}
     * @memberof EntitlementSummary
     */
    _public: boolean;
    /**
     *
     * @type {PlanLimitation}
     * @memberof EntitlementSummary
     */
    limitation: PlanLimitation;
}


/**
 * @export
 */
export const EntitlementSummaryKindEnum = {
    Feature: 'feature',
    Count: 'count',
    MonthlyUsage: 'monthly_usage',
    Retention: 'retention'
} as const;
export type EntitlementSummaryKindEnum = typeof EntitlementSummaryKindEnum[keyof typeof EntitlementSummaryKindEnum];

/**
 * @export
 */
export const EntitlementSummarySourceEnum = {
    BasePlan: 'base_plan',
    Override: 'override'
} as const;
export type EntitlementSummarySourceEnum = typeof EntitlementSummarySourceEnum[keyof typeof EntitlementSummarySourceEnum];

/**
 * @export
 */
export const EntitlementSummaryUsageSourceEnum = {
    Plan: 'plan',
    UsageCounts: 'usage_counts',
    Derived: 'derived'
} as const;
export type EntitlementSummaryUsageSourceEnum = typeof EntitlementSummaryUsageSourceEnum[keyof typeof EntitlementSummaryUsageSourceEnum];

/**
 * @type EntityLink
 * Link to a related entity (machine, issue, or event). Exactly one field must be specified.
 * @export
 */
export type EntityLink = EventLink | IssueLink | MachineLink;
/**
 * Generic error response
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * Error message
     * @type {string}
     * @memberof ErrorResponse
     */
    error?: string;
}
/**
 * Error response with success flag
 * @export
 * @interface ErrorResponseWithSuccess
 */
export interface ErrorResponseWithSuccess {
    /**
     * Success status (always false for errors)
     * @type {boolean}
     * @memberof ErrorResponseWithSuccess
     */
    success: boolean;
    /**
     * Error message
     * @type {string}
     * @memberof ErrorResponseWithSuccess
     */
    error: string;
}
/**
 *
 * @export
 * @interface Event
 */
export interface Event {
    /**
     * Account ID that owns this event
     * @type {string}
     * @memberof Event
     */
    account_id: string;
    /**
     * Unique event identifier (UUID)
     * @type {string}
     * @memberof Event
     */
    id: string;
    /**
     * Severity level of the event
     * @type {string}
     * @memberof Event
     */
    level: EventLevelEnum;
    /**
     * Machine information object (included if event is related to a machine)
     * @type {{ [key: string]: any; }}
     * @memberof Event
     */
    machine?: { [key: string]: any; } | null;
    /**
     * Machine ID (optional, only present if event is machine-related)
     * @type {string}
     * @memberof Event
     */
    machine_id?: string | null;
    /**
     * Human-readable event name
     * @type {string}
     * @memberof Event
     */
    name: string;
    /**
     * Sequential serial number of the event
     * @type {number}
     * @memberof Event
     */
    serial: number;
    /**
     * Event timestamp in ISO 8601 format
     * @type {string}
     * @memberof Event
     */
    ts: string;
    /**
     * Event type indicating what caused the event
     * @type {string}
     * @memberof Event
     */
    type: string;
    /**
     * Additional event-specific data
     * @type {{ [key: string]: any; }}
     * @memberof Event
     */
    value?: { [key: string]: any; };
}


/**
 * @export
 */
export const EventLevelEnum = {
    None: 'none',
    Debug: 'debug',
    Info: 'info',
    Warning: 'warning',
    Emergency: 'emergency'
} as const;
export type EventLevelEnum = typeof EventLevelEnum[keyof typeof EventLevelEnum];

/**
 * Event entity details
 * @export
 * @interface EventEntity
 */
export interface EventEntity {
    /**
     * Event ID
     * @type {string}
     * @memberof EventEntity
     */
    id?: string;
    /**
     * Event name
     * @type {string}
     * @memberof EventEntity
     */
    name?: string;
    /**
     * Event type
     * @type {string}
     * @memberof EventEntity
     */
    type?: string;
    /**
     * Event level
     * @type {string}
     * @memberof EventEntity
     */
    level?: EventEntityLevelEnum;
    /**
     * Event timestamp
     * @type {string}
     * @memberof EventEntity
     */
    ts?: string;
}


/**
 * @export
 */
export const EventEntityLevelEnum = {
    Info: 'info',
    Warning: 'warning',
    Error: 'error',
    Critical: 'critical'
} as const;
export type EventEntityLevelEnum = typeof EventEntityLevelEnum[keyof typeof EventEntityLevelEnum];

/**
 * Link to an event
 * @export
 * @interface EventLink
 */
export interface EventLink {
    /**
     * Event ID
     * @type {string}
     * @memberof EventLink
     */
    event_id: string;
}
/**
 * @type Field
 *
 * @export
 */
export type Field = { type: 'checkbox' } & CheckboxField | { type: 'number' } & NumberField | { type: 'object-list' } & ObjectListField | { type: 'select' } & SelectField | { type: 'simple-list' } & SimpleListField | { type: 'text' } & TextField | { type: 'textarea' } & TextareaField;
/**
 *
 * @export
 * @interface FieldBase
 */
export interface FieldBase {
    /**
     *
     * @type {string}
     * @memberof FieldBase
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof FieldBase
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof FieldBase
     */
    type: string;
    /**
     *
     * @type {boolean}
     * @memberof FieldBase
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof FieldBase
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof FieldBase
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof FieldBase
     */
    validation?: ValidationRule;
}
/**
 * @type FieldBaseDefaultValue
 *
 * @export
 */
export type FieldBaseDefaultValue = Array<FieldBaseDefaultValueOneOfInner> | ObjectItemTemplate | boolean | number | string;
/**
 * @type FieldBaseDefaultValueOneOfInner
 *
 * @export
 */
export type FieldBaseDefaultValueOneOfInner = ObjectItemTemplate | boolean | number | string;
/**
 *
 * @export
 * @interface FileUploadError
 */
export interface FileUploadError {
    /**
     * Error message
     * @type {string}
     * @memberof FileUploadError
     */
    error?: string;
    /**
     * Field name that caused the error
     * @type {string}
     * @memberof FileUploadError
     */
    field?: string;
    /**
     * Detailed error information
     * @type {Array<FileUploadErrorDetailsInner>}
     * @memberof FileUploadError
     */
    details?: Array<FileUploadErrorDetailsInner>;
}
/**
 *
 * @export
 * @interface FileUploadErrorDetailsInner
 */
export interface FileUploadErrorDetailsInner {
    /**
     * Name of the problematic file
     * @type {string}
     * @memberof FileUploadErrorDetailsInner
     */
    file_name?: string;
    /**
     * Type of error
     * @type {string}
     * @memberof FileUploadErrorDetailsInner
     */
    error_type?: FileUploadErrorDetailsInnerErrorTypeEnum;
    /**
     * Human-readable error message
     * @type {string}
     * @memberof FileUploadErrorDetailsInner
     */
    message?: string;
}


/**
 * @export
 */
export const FileUploadErrorDetailsInnerErrorTypeEnum = {
    FileTooLarge: 'file_too_large',
    InvalidFileType: 'invalid_file_type',
    TooManyFiles: 'too_many_files',
    InvalidFileName: 'invalid_file_name'
} as const;
export type FileUploadErrorDetailsInnerErrorTypeEnum = typeof FileUploadErrorDetailsInnerErrorTypeEnum[keyof typeof FileUploadErrorDetailsInnerErrorTypeEnum];

/**
 * Paginated firmware update history response
 * @export
 * @interface FirmwareHistoryResponse
 */
export interface FirmwareHistoryResponse {
    /**
     * Array of firmware update records
     * @type {Array<FirmwareUpdateRecord>}
     * @memberof FirmwareHistoryResponse
     */
    firmwareUpdates: Array<FirmwareUpdateRecord>;
    /**
     * Total number of records matching the filter
     * @type {number}
     * @memberof FirmwareHistoryResponse
     */
    count: number;
    /**
     * Maximum number of records returned
     * @type {number}
     * @memberof FirmwareHistoryResponse
     */
    limit: number;
    /**
     * Number of records skipped
     * @type {number}
     * @memberof FirmwareHistoryResponse
     */
    offset: number;
}
/**
 * Firmware update job accepted response
 * @export
 * @interface FirmwareUpdateAcceptedResponse
 */
export interface FirmwareUpdateAcceptedResponse {
    /**
     * Whether the job was accepted
     * @type {boolean}
     * @memberof FirmwareUpdateAcceptedResponse
     */
    accepted: boolean;
    /**
     * Unique job ID for tracking the update process
     * @type {string}
     * @memberof FirmwareUpdateAcceptedResponse
     */
    jobId: string;
    /**
     * Number of devices queued for update
     * @type {number}
     * @memberof FirmwareUpdateAcceptedResponse
     */
    queued: number;
    /**
     * Total number of devices in the request
     * @type {number}
     * @memberof FirmwareUpdateAcceptedResponse
     */
    total: number;
}
/**
 * Firmware update record details
 * @export
 * @interface FirmwareUpdateRecord
 */
export interface FirmwareUpdateRecord {
    /**
     * Unique firmware update record ID
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    id: string;
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    deviceId: string;
    /**
     * Target firmware version
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    firmwareVersion: string;
    /**
     * Current update status
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    status: FirmwareUpdateRecordStatusEnum;
    /**
     * Update progress percentage (0-100)
     * @type {number}
     * @memberof FirmwareUpdateRecord
     */
    progress: number;
    /**
     * Error message if update failed
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    errorMessage?: string | null;
    /**
     * Timestamp when update started
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    startedAt?: string | null;
    /**
     * Timestamp when update finished (null if not finished)
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    finishedAt?: string | null;
    /**
     * Timestamp when record was created
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    createdAt: string;
    /**
     * Timestamp when record was last updated
     * @type {string}
     * @memberof FirmwareUpdateRecord
     */
    updatedAt: string;
}


/**
 * @export
 */
export const FirmwareUpdateRecordStatusEnum = {
    Queued: 'queued',
    Updating: 'updating',
    Finished: 'finished',
    Failed: 'failed',
    Offline: 'offline'
} as const;
export type FirmwareUpdateRecordStatusEnum = typeof FirmwareUpdateRecordStatusEnum[keyof typeof FirmwareUpdateRecordStatusEnum];

/**
 * Firmware version information
 * @export
 * @interface FirmwareVersionInfo
 */
export interface FirmwareVersionInfo {
    /**
     * Firmware version string
     * @type {string}
     * @memberof FirmwareVersionInfo
     */
    version?: string;
    /**
     * URL to download the application firmware binary
     * @type {string}
     * @memberof FirmwareVersionInfo
     */
    app_url?: string;
    /**
     * URL to download the bootloader binary
     * @type {string}
     * @memberof FirmwareVersionInfo
     */
    bootloader_url?: string;
    /**
     * URL to download the partition binary
     * @type {string}
     * @memberof FirmwareVersionInfo
     */
    partition_url?: string;
}
/**
 *
 * @export
 * @interface ForbiddenOwnerOnlyError
 */
export interface ForbiddenOwnerOnlyError {
    /**
     *
     * @type {string}
     * @memberof ForbiddenOwnerOnlyError
     */
    error?: string;
}
/**
 * @type ForbiddenPermissionOrOwnerOnly
 *
 * @export
 */
export type ForbiddenPermissionOrOwnerOnly = ForbiddenOwnerOnlyError | ForbiddenPermissionsError;
/**
 *
 * @export
 * @interface ForbiddenPermissionsError
 */
export interface ForbiddenPermissionsError {
    /**
     *
     * @type {string}
     * @memberof ForbiddenPermissionsError
     */
    error?: string;
}
/**
 *
 * @export
 * @interface GetDeviceInfoBatchRequest
 */
export interface GetDeviceInfoBatchRequest {
    /**
     * Array of device information requests
     * @type {Array<DeviceInfoBatchRequest>}
     * @memberof GetDeviceInfoBatchRequest
     */
    devices: Array<DeviceInfoBatchRequest>;
}
/**
 *
 * @export
 * @interface GetGroupResponse
 */
export interface GetGroupResponse {
    /**
     *
     * @type {GroupWithMachines}
     * @memberof GetGroupResponse
     */
    group: GroupWithMachines;
}
/**
 *
 * @export
 * @interface GetIntelligenceResponse
 */
export interface GetIntelligenceResponse {
    /**
     *
     * @type {PublicIntelligence}
     * @memberof GetIntelligenceResponse
     */
    intelligence: PublicIntelligence;
    /**
     * Always false for the public API. Intelligence editing is available only from admin APIs.
     * @type {boolean}
     * @memberof GetIntelligenceResponse
     */
    allowedToEdit: boolean;
}
/**
 *
 * @export
 * @interface GetIssueResponse
 */
export interface GetIssueResponse {
    /**
     *
     * @type {Issue}
     * @memberof GetIssueResponse
     */
    issue: Issue;
}
/**
 *
 * @export
 * @interface GetLatestFirmwareUpdateBatchRequest
 */
export interface GetLatestFirmwareUpdateBatchRequest {
    /**
     * Array of devices to query
     * @type {Array<GetLatestFirmwareUpdateBatchRequestDevicesInner>}
     * @memberof GetLatestFirmwareUpdateBatchRequest
     */
    devices: Array<GetLatestFirmwareUpdateBatchRequestDevicesInner>;
}
/**
 *
 * @export
 * @interface GetLatestFirmwareUpdateBatchRequestDevicesInner
 */
export interface GetLatestFirmwareUpdateBatchRequestDevicesInner {
    /**
     * Device ID (Obniz ID)
     * @type {string}
     * @memberof GetLatestFirmwareUpdateBatchRequestDevicesInner
     */
    deviceId: string;
}
/**
 *
 * @export
 * @interface GetObnizCloudDeviceResponse
 */
export interface GetObnizCloudDeviceResponse {
    /**
     *
     * @type {ObnizCloudDevice}
     * @memberof GetObnizCloudDeviceResponse
     */
    obniz: ObnizCloudDevice;
    /**
     * Key-value state stored for the unit (`obniz-{obniz_id}`)
     * @type {{ [key: string]: GetObnizCloudDeviceResponseObnizStatValue; }}
     * @memberof GetObnizCloudDeviceResponse
     */
    obniz_stat: { [key: string]: GetObnizCloudDeviceResponseObnizStatValue; };
}
/**
 * @type GetObnizCloudDeviceResponseObnizStatValue
 *
 * @export
 */
export type GetObnizCloudDeviceResponseObnizStatValue = number | string;
/**
 *
 * @export
 * @interface GetThreadEntitiesResponse
 */
export interface GetThreadEntitiesResponse {
    /**
     * Raw entity relationships
     * @type {Array<ThreadEntity>}
     * @memberof GetThreadEntitiesResponse
     */
    entities: Array<ThreadEntity>;
    /**
     * Machine details
     * @type {Array<MachineEntity>}
     * @memberof GetThreadEntitiesResponse
     */
    machines: Array<MachineEntity>;
    /**
     * Issue details
     * @type {Array<IssueEntity>}
     * @memberof GetThreadEntitiesResponse
     */
    issues: Array<IssueEntity>;
    /**
     * Event details
     * @type {Array<EventEntity>}
     * @memberof GetThreadEntitiesResponse
     */
    events: Array<EventEntity>;
}
/**
 *
 * @export
 * @interface GetThreadResponse
 */
export interface GetThreadResponse {
    /**
     *
     * @type {Thread}
     * @memberof GetThreadResponse
     */
    thread: Thread;
}
/**
 * Group object for organizing machines
 * @export
 * @interface Group
 */
export interface Group {
    /**
     * Unique identifier for the group
     * @type {string}
     * @memberof Group
     */
    id: string;
    /**
     * Group name
     * @type {string}
     * @memberof Group
     */
    name: string;
    /**
     * ID of the account this group belongs to
     * @type {string}
     * @memberof Group
     */
    account_id: string;
    /**
     * Custom fields (arbitrary key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof Group
     */
    custom_fields?: { [key: string]: any; };
}
/**
 * Group object with associated machines
 * @export
 * @interface GroupWithMachines
 */
export interface GroupWithMachines {
    /**
     * Unique identifier for the group
     * @type {string}
     * @memberof GroupWithMachines
     */
    id: string;
    /**
     * Group name
     * @type {string}
     * @memberof GroupWithMachines
     */
    name: string;
    /**
     * ID of the account this group belongs to
     * @type {string}
     * @memberof GroupWithMachines
     */
    account_id: string;
    /**
     * Custom fields (arbitrary key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof GroupWithMachines
     */
    custom_fields?: { [key: string]: any; };
    /**
     * Array of machines belonging to this group
     * @type {Array<Machine>}
     * @memberof GroupWithMachines
     */
    machines?: Array<Machine>;
}
/**
 * Connection between an inbound device and a machine
 * @export
 * @interface InboundConnection
 */
export interface InboundConnection {
    /**
     * Unique inbound connection identifier (UUID)
     * @type {string}
     * @memberof InboundConnection
     */
    id: string;
    /**
     * Account ID that owns this connection
     * @type {string}
     * @memberof InboundConnection
     */
    account_id: string;
    /**
     * ID of the inbound source
     * @type {string}
     * @memberof InboundConnection
     */
    inbound_source_id: string;
    /**
     * ID of the external device/sensor
     * @type {string}
     * @memberof InboundConnection
     */
    inbound_device_id: string;
    /**
     * ID of the connected machine
     * @type {string}
     * @memberof InboundConnection
     */
    machine_id: string;
    /**
     * Controller model name
     * @type {string}
     * @memberof InboundConnection
     */
    model_name: string;
    /**
     * Controller model version
     * @type {number}
     * @memberof InboundConnection
     */
    model_version: number;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof InboundConnection
     */
    created_at: string;
    /**
     * Timestamp when the connection was last updated
     * @type {string}
     * @memberof InboundConnection
     */
    updated_at: string;
    /**
     * Associated unit ID
     * @type {string}
     * @memberof InboundConnection
     */
    unit_id?: string;
    /**
     * External sensor/device identifier
     * @type {string}
     * @memberof InboundConnection
     */
    external_device_id?: string;
}
/**
 * Inbound data source that receives external sensor data
 * @export
 * @interface InboundSource
 */
export interface InboundSource {
    /**
     * Unique inbound source identifier (UUID)
     * @type {string}
     * @memberof InboundSource
     */
    id: string;
    /**
     * Human-readable name for the inbound source
     * @type {string}
     * @memberof InboundSource
     */
    name?: string | null;
    /**
     * Account ID that owns this inbound source
     * @type {string}
     * @memberof InboundSource
     */
    account_id: string;
    /**
     * Timestamp when the inbound source was created
     * @type {string}
     * @memberof InboundSource
     */
    created_at: string;
    /**
     * Timestamp when the inbound source was last updated
     * @type {string}
     * @memberof InboundSource
     */
    updated_at: string;
    /**
     * Data format for incoming requests
     * @type {string}
     * @memberof InboundSource
     */
    format: InboundSourceFormatEnum;
    /**
     * Model identifier of the gateway device
     * @type {string}
     * @memberof InboundSource
     */
    gateway_model: string;
    /**
     * Unique identifier of the gateway device
     * @type {string}
     * @memberof InboundSource
     */
    gateway_id: string;
    /**
     * List of detected external sensor IDs
     * @type {Array<string>}
     * @memberof InboundSource
     */
    external_detections: Array<string>;
}


/**
 * @export
 */
export const InboundSourceFormatEnum = {
    XWwwFormUrlencoded: 'application/x-www-form-urlencoded',
    Json: 'application/json'
} as const;
export type InboundSourceFormatEnum = typeof InboundSourceFormatEnum[keyof typeof InboundSourceFormatEnum];

/**
 *
 * @export
 * @interface InitialPost
 */
export interface InitialPost {
    /**
     * Post content
     * @type {string}
     * @memberof InitialPost
     */
    content: string;
    /**
     * Array of file paths (for JSON requests)
     * @type {Array<string>}
     * @memberof InitialPost
     */
    file_paths?: Array<string>;
    /**
     * Links to machines, issues, or events
     * @type {Array<EntityLink>}
     * @memberof InitialPost
     */
    entities?: Array<EntityLink>;
    /**
     * Optional status update for the thread
     * @type {string}
     * @memberof InitialPost
     */
    update_status?: InitialPostUpdateStatusEnum;
}


/**
 * @export
 */
export const InitialPostUpdateStatusEnum = {
    Close: 'close',
    Reopen: 'reopen'
} as const;
export type InitialPostUpdateStatusEnum = typeof InitialPostUpdateStatusEnum[keyof typeof InitialPostUpdateStatusEnum];

/**
 * Configuration structure defining fields required for controller installation
 * @export
 * @interface InstallConfigStructure
 */
export interface InstallConfigStructure {
    /**
     * Name of the controller
     * @type {string}
     * @memberof InstallConfigStructure
     */
    controller_name: string;
    /**
     * Version of the controller
     * @type {number}
     * @memberof InstallConfigStructure
     */
    controller_version: number;
    /**
     * Array of configuration fields required for installation
     * @type {Array<Field>}
     * @memberof InstallConfigStructure
     */
    fields: Array<Field>;
}
/**
 * @type Integration
 * Integration configuration (can be PubSub, APIPull, or APIPush)
 * @export
 */
export type Integration = { type: 'APIPull' } & IntegrationAPIPull | { type: 'APIPush' } & IntegrationAPIPush | { type: 'PubSub' } & IntegrationPubSub;
/**
 * API Pull integration configuration
 * @export
 * @interface IntegrationAPIPull
 */
export interface IntegrationAPIPull {
    /**
     * Integration ID
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    account_id: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    machine_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    type: IntegrationAPIPullTypeEnum;
    /**
     * Integration name
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    name: string;
    /**
     * Whether the integration is enabled
     * @type {boolean}
     * @memberof IntegrationAPIPull
     */
    is_enabled: boolean;
    /**
     * Integration schema definition
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationAPIPull
     */
    schema?: { [key: string]: any; };
    /**
     * Integration-specific configuration
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationAPIPull
     */
    _configuration?: { [key: string]: any; };
    /**
     * Creation timestamp
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    created_at: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    updated_at: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    last_used_at?: string | null;
    /**
     *
     * @type {IntegrationAPIPullSettings}
     * @memberof IntegrationAPIPull
     */
    service: IntegrationAPIPullSettings;
}


/**
 * @export
 */
export const IntegrationAPIPullTypeEnum = {
    ApiPull: 'APIPull'
} as const;
export type IntegrationAPIPullTypeEnum = typeof IntegrationAPIPullTypeEnum[keyof typeof IntegrationAPIPullTypeEnum];

/**
 * Settings for API Pull integration
 * @export
 * @interface IntegrationAPIPullSettings
 */
export interface IntegrationAPIPullSettings {
    /**
     * External API endpoint URL
     * @type {string}
     * @memberof IntegrationAPIPullSettings
     */
    outEndpoint: string;
}
/**
 * API Push integration configuration
 * @export
 * @interface IntegrationAPIPush
 */
export interface IntegrationAPIPush {
    /**
     * Integration ID
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    account_id: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    machine_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    type: IntegrationAPIPushTypeEnum;
    /**
     * Integration name
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    name: string;
    /**
     * Whether the integration is enabled
     * @type {boolean}
     * @memberof IntegrationAPIPush
     */
    is_enabled: boolean;
    /**
     * Integration schema definition
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationAPIPush
     */
    schema?: { [key: string]: any; };
    /**
     * Integration-specific configuration
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationAPIPush
     */
    _configuration?: { [key: string]: any; };
    /**
     * Creation timestamp
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    created_at: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    updated_at: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    last_used_at?: string | null;
    /**
     *
     * @type {IntegrationAPIPushSettings}
     * @memberof IntegrationAPIPush
     */
    service: IntegrationAPIPushSettings;
}


/**
 * @export
 */
export const IntegrationAPIPushTypeEnum = {
    ApiPush: 'APIPush'
} as const;
export type IntegrationAPIPushTypeEnum = typeof IntegrationAPIPushTypeEnum[keyof typeof IntegrationAPIPushTypeEnum];

/**
 * Settings for API Push integration
 * @export
 * @interface IntegrationAPIPushSettings
 */
export interface IntegrationAPIPushSettings {
    /**
     * External API endpoint URL
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    outEndpoint: string;
    /**
     * HTTP method for pushing data
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    pushMethod: IntegrationAPIPushSettingsPushMethodEnum;
    /**
     * Authentication strategy
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    authStrategy: IntegrationAPIPushSettingsAuthStrategyEnum;
    /**
     * Authentication token (for bearer or x-api-key)
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    authToken?: string;
    /**
     * Username for basic authentication
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    basicUsername?: string;
    /**
     * Password for basic authentication
     * @type {string}
     * @memberof IntegrationAPIPushSettings
     */
    basicPassword?: string;
}


/**
 * @export
 */
export const IntegrationAPIPushSettingsPushMethodEnum = {
    Post: 'POST',
    Put: 'PUT',
    Patch: 'PATCH'
} as const;
export type IntegrationAPIPushSettingsPushMethodEnum = typeof IntegrationAPIPushSettingsPushMethodEnum[keyof typeof IntegrationAPIPushSettingsPushMethodEnum];

/**
 * @export
 */
export const IntegrationAPIPushSettingsAuthStrategyEnum = {
    None: 'none',
    Basic: 'basic',
    Bearer: 'bearer',
    XApiKey: 'x-api-key'
} as const;
export type IntegrationAPIPushSettingsAuthStrategyEnum = typeof IntegrationAPIPushSettingsAuthStrategyEnum[keyof typeof IntegrationAPIPushSettingsAuthStrategyEnum];

/**
 * Base integration configuration shared by all integration types
 * @export
 * @interface IntegrationBase
 */
export interface IntegrationBase {
    /**
     * Integration ID
     * @type {string}
     * @memberof IntegrationBase
     */
    id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof IntegrationBase
     */
    account_id: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationBase
     */
    machine_id?: string | null;
    /**
     *
     * @type {IntegrationType}
     * @memberof IntegrationBase
     */
    type: IntegrationType;
    /**
     * Integration name
     * @type {string}
     * @memberof IntegrationBase
     */
    name: string;
    /**
     * Whether the integration is enabled
     * @type {boolean}
     * @memberof IntegrationBase
     */
    is_enabled: boolean;
    /**
     * Integration schema definition
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationBase
     */
    schema?: { [key: string]: any; };
    /**
     * Integration-specific configuration
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationBase
     */
    _configuration?: { [key: string]: any; };
    /**
     * Creation timestamp
     * @type {string}
     * @memberof IntegrationBase
     */
    created_at: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationBase
     */
    updated_at: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationBase
     */
    last_used_at?: string | null;
}


/**
 * PubSub integration configuration
 * @export
 * @interface IntegrationPubSub
 */
export interface IntegrationPubSub {
    /**
     * Integration ID
     * @type {string}
     * @memberof IntegrationPubSub
     */
    id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof IntegrationPubSub
     */
    account_id: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationPubSub
     */
    machine_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof IntegrationPubSub
     */
    type: IntegrationPubSubTypeEnum;
    /**
     * Integration name
     * @type {string}
     * @memberof IntegrationPubSub
     */
    name: string;
    /**
     * Whether the integration is enabled
     * @type {boolean}
     * @memberof IntegrationPubSub
     */
    is_enabled: boolean;
    /**
     * Integration schema definition
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationPubSub
     */
    schema?: { [key: string]: any; };
    /**
     * Integration-specific configuration
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationPubSub
     */
    _configuration?: { [key: string]: any; };
    /**
     * Creation timestamp
     * @type {string}
     * @memberof IntegrationPubSub
     */
    created_at: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationPubSub
     */
    updated_at: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationPubSub
     */
    last_used_at?: string | null;
    /**
     *
     * @type {IntegrationPubSubSettings}
     * @memberof IntegrationPubSub
     */
    service?: IntegrationPubSubSettings;
}


/**
 * @export
 */
export const IntegrationPubSubTypeEnum = {
    PubSub: 'PubSub'
} as const;
export type IntegrationPubSubTypeEnum = typeof IntegrationPubSubTypeEnum[keyof typeof IntegrationPubSubTypeEnum];

/**
 * Settings for PubSub integration
 * @export
 * @interface IntegrationPubSubSettings
 */
export interface IntegrationPubSubSettings {
    /**
     * PubSub topic name
     * @type {string}
     * @memberof IntegrationPubSubSettings
     */
    topic_name: string;
    /**
     * PubSub credentials
     * @type {{ [key: string]: any; }}
     * @memberof IntegrationPubSubSettings
     */
    credentials?: { [key: string]: any; };
}

/**
 * Type of integration
 * @export
 */
export const IntegrationType = {
    PubSub: 'PubSub',
    ApiPull: 'APIPull',
    ApiPush: 'APIPush'
} as const;
export type IntegrationType = typeof IntegrationType[keyof typeof IntegrationType];

/**
 * Intelligence controller object
 * @export
 * @interface Intelligence
 */
export interface Intelligence {
    /**
     * Unique intelligence name
     * @type {string}
     * @memberof Intelligence
     */
    name: string;
    /**
     * Intelligence version number
     * @type {number}
     * @memberof Intelligence
     */
    version: number;
    /**
     *
     * @type {ControllerType}
     * @memberof Intelligence
     */
    type: ControllerType;
    /**
     * Human-readable intelligence title
     * @type {string}
     * @memberof Intelligence
     */
    title: string;
    /**
     * Comma-separated image URLs
     * @type {string}
     * @memberof Intelligence
     */
    images?: string;
    /**
     *
     * @type {ControllerPublishment}
     * @memberof Intelligence
     */
    publishment: ControllerPublishment;
    /**
     * Detailed intelligence description
     * @type {string}
     * @memberof Intelligence
     */
    description?: string;
    /**
     *
     * @type {CodeType}
     * @memberof Intelligence
     */
    code_type: CodeType;
    /**
     * Intelligence code (when code_type is 'code')
     * @type {string}
     * @memberof Intelligence
     */
    code?: string | null;
    /**
     * Intelligence schema definition
     * @type {{ [key: string]: any; }}
     * @memberof Intelligence
     */
    schema: { [key: string]: any; };
    /**
     *
     * @type {IntelligenceConditions}
     * @memberof Intelligence
     */
    conditions?: IntelligenceConditions | null;
    /**
     * Widget configuration for UI display
     * @type {string}
     * @memberof Intelligence
     */
    widget?: string;
}


/**
 * @type IntelligenceConditions
 * Conditions for intelligence execution
 * @export
 */
export type IntelligenceConditions = Array<{ [key: string]: any; }> | { [key: string]: any; };
/**
 * Invitation record (the raw invitation included in approve / cancel / revoke responses)
 * @export
 * @interface Invite
 */
export interface Invite {
    /**
     * Unique identifier of the invitation (identical to the invitation link token)
     * @type {string}
     * @memberof Invite
     */
    id?: string;
    /**
     * ID of the account the invitation belongs to
     * @type {string}
     * @memberof Invite
     */
    account_id?: string;
    /**
     * Role granted on approval
     * @type {string}
     * @memberof Invite
     */
    role?: InviteRoleEnum | null;
    /**
     * Group ID to assign on approval
     * @type {string}
     * @memberof Invite
     */
    group_id?: string | null;
    /**
     * User ID who created the invitation
     * @type {string}
     * @memberof Invite
     */
    created_by?: string;
    /**
     * User ID linked while awaiting approval
     * @type {string}
     * @memberof Invite
     */
    user_id?: string | null;
    /**
     * Destination email address of the invitation
     * @type {string}
     * @memberof Invite
     */
    sent_to?: string | null;
    /**
     * Timestamp the invitation email was sent (ISO8601 / UTC). null if not sent
     * @type {string}
     * @memberof Invite
     */
    sent_at?: string | null;
    /**
     *
     * @type {InviteStatus}
     * @memberof Invite
     */
    status?: InviteStatus;
    /**
     * Invitation creation timestamp (ISO8601 / UTC)
     * @type {string}
     * @memberof Invite
     */
    created_at?: string;
    /**
     * Expiry of the invitation link (ISO8601 / UTC). null if no expiry
     * @type {string}
     * @memberof Invite
     */
    expires_at?: string | null;
}


/**
 * @export
 */
export const InviteRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type InviteRoleEnum = typeof InviteRoleEnum[keyof typeof InviteRoleEnum];

/**
 * Success response of approve / cancel / revoke operations
 * @export
 * @interface InviteActionResponse
 */
export interface InviteActionResponse {
    /**
     * Whether the operation succeeded
     * @type {boolean}
     * @memberof InviteActionResponse
     */
    success: boolean;
    /**
     * Result message
     * @type {string}
     * @memberof InviteActionResponse
     */
    message: string;
    /**
     *
     * @type {Invite}
     * @memberof InviteActionResponse
     */
    invite?: Invite;
}
/**
 * Error response that may include an additional `reason` (plan limit / group restriction errors)
 * @export
 * @interface InviteErrorWithReason
 */
export interface InviteErrorWithReason {
    /**
     * Error message
     * @type {string}
     * @memberof InviteErrorWithReason
     */
    error: string;
    /**
     * Additional reason, included for plan limit / group restriction errors
     * @type {string}
     * @memberof InviteErrorWithReason
     */
    reason?: string;
}
/**
 * Success response of resending the invitation email
 * @export
 * @interface InviteResendResponse
 */
export interface InviteResendResponse {
    /**
     * Whether the send request was accepted
     * @type {boolean}
     * @memberof InviteResendResponse
     */
    success: boolean;
    /**
     * Result message
     * @type {string}
     * @memberof InviteResendResponse
     */
    message: string;
}

/**
 * Invitation status
 * - `unused`: invitation link not yet visited (manual approval)
 * - `unused_auto`: invitation link not yet visited (auto approval)
 * - `pending`: user followed the link, awaiting admin approval
 * - `approved`: approved (account member)
 * - `cancelled`: cancelled by admin
 * - `revoked`: revoked by admin
 *
 * @export
 */
export const InviteStatus = {
    Unused: 'unused',
    UnusedAuto: 'unused_auto',
    Pending: 'pending',
    Approved: 'approved',
    Cancelled: 'cancelled',
    Revoked: 'revoked'
} as const;
export type InviteStatus = typeof InviteStatus[keyof typeof InviteStatus];

/**
 * Invitation including account name, group name, and user email (element of the list response)
 * @export
 * @interface InviteWithDetails
 */
export interface InviteWithDetails {
    /**
     * Unique identifier of the invitation
     * @type {string}
     * @memberof InviteWithDetails
     */
    id?: string;
    /**
     * ID of the account the invitation belongs to
     * @type {string}
     * @memberof InviteWithDetails
     */
    account_id?: string;
    /**
     * Account name
     * @type {string}
     * @memberof InviteWithDetails
     */
    account_name?: string | null;
    /**
     * User ID linked while awaiting approval
     * @type {string}
     * @memberof InviteWithDetails
     */
    user_id?: string | null;
    /**
     * Email of the linked user
     * @type {string}
     * @memberof InviteWithDetails
     */
    user_email?: string | null;
    /**
     * Linked user email if available; otherwise the invitation destination email
     * @type {string}
     * @memberof InviteWithDetails
     */
    recipient_email?: string | null;
    /**
     * Role granted on approval
     * @type {string}
     * @memberof InviteWithDetails
     */
    role?: InviteWithDetailsRoleEnum | null;
    /**
     * Group ID to assign on approval
     * @type {string}
     * @memberof InviteWithDetails
     */
    group_id?: string | null;
    /**
     * Group name
     * @type {string}
     * @memberof InviteWithDetails
     */
    group_name?: string | null;
    /**
     *
     * @type {InviteStatus}
     * @memberof InviteWithDetails
     */
    status?: InviteStatus;
    /**
     * Whether this is an unused invitation whose `expires_at` is in the past
     * @type {boolean}
     * @memberof InviteWithDetails
     */
    is_expired?: boolean;
    /**
     * Destination email address of the invitation
     * @type {string}
     * @memberof InviteWithDetails
     */
    sent_to?: string | null;
    /**
     * Timestamp the invitation email was sent (ISO8601 / UTC). null if not sent
     * @type {string}
     * @memberof InviteWithDetails
     */
    sent_at?: string | null;
    /**
     * Invitation creation timestamp (ISO8601 / UTC). The client converts it to local time for display
     * @type {string}
     * @memberof InviteWithDetails
     */
    created_at?: string;
    /**
     * Expiry of the invitation link (ISO8601 / UTC). null if no expiry
     * @type {string}
     * @memberof InviteWithDetails
     */
    expires_at?: string | null;
}


/**
 * @export
 */
export const InviteWithDetailsRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type InviteWithDetailsRoleEnum = typeof InviteWithDetailsRoleEnum[keyof typeof InviteWithDetailsRoleEnum];

/**
 * Issue object representing a problem or event that needs attention
 * @export
 * @interface Issue
 */
export interface Issue {
    /**
     * Unique issue identifier (UUID)
     * @type {string}
     * @memberof Issue
     */
    id?: string;
    /**
     * Serial number of the issue, used for ordering
     * @type {number}
     * @memberof Issue
     */
    serial?: number;
    /**
     * Account ID that owns this issue
     * @type {string}
     * @memberof Issue
     */
    account_id?: string;
    /**
     * Machine ID associated with the issue
     * @type {string}
     * @memberof Issue
     */
    machine_id?: string | null;
    /**
     * Human-readable issue name/title
     * @type {string}
     * @memberof Issue
     */
    name?: string;
    /**
     * Category name of the issue, such as Error
     * @type {string}
     * @memberof Issue
     */
    category?: string;
    /**
     * Unique key for the issue, used to identify similar issues
     * @type {string}
     * @memberof Issue
     */
    unique_key?: string | null;
    /**
     * Details of issue
     * @type {string}
     * @memberof Issue
     */
    detail?: string;
    /**
     * Whether the issue is currently open (true) or closed (false)
     * @type {boolean}
     * @memberof Issue
     */
    is_opening?: boolean;
    /**
     * Timestamp when the issue was issued
     * @type {string}
     * @memberof Issue
     */
    issued_at?: string;
    /**
     * Timestamp when the issue was created
     * @type {string}
     * @memberof Issue
     */
    created_at?: string;
    /**
     * Timestamp when the issue was closed (null if still open)
     * @type {string}
     * @memberof Issue
     */
    closed_at?: string | null;
}
/**
 * Issue entity details
 * @export
 * @interface IssueEntity
 */
export interface IssueEntity {
    /**
     * Issue ID
     * @type {string}
     * @memberof IssueEntity
     */
    id?: string;
    /**
     * Issue name
     * @type {string}
     * @memberof IssueEntity
     */
    name?: string;
    /**
     * Issue category
     * @type {string}
     * @memberof IssueEntity
     */
    category?: string;
    /**
     * Issue timestamp
     * @type {string}
     * @memberof IssueEntity
     */
    issued_at?: string;
}
/**
 * Link to an issue
 * @export
 * @interface IssueLink
 */
export interface IssueLink {
    /**
     * Issue ID
     * @type {string}
     * @memberof IssueLink
     */
    issue_id: string;
}
/**
 * Batch response containing firmware update records
 * @export
 * @interface LatestFirmwareUpdateBatchResponse
 */
export interface LatestFirmwareUpdateBatchResponse {
    /**
     * Array of update records in the same order as request
     * @type {Array<DeviceUpdateItem>}
     * @memberof LatestFirmwareUpdateBatchResponse
     */
    updates: Array<DeviceUpdateItem>;
}
/**
 * Latest firmware update record response
 * @export
 * @interface LatestFirmwareUpdateResponse
 */
export interface LatestFirmwareUpdateResponse {
    /**
     *
     * @type {FirmwareUpdateRecord}
     * @memberof LatestFirmwareUpdateResponse
     */
    firmwareUpdate: FirmwareUpdateRecord;
}
/**
 * Paginated list of all notification history
 * @export
 * @interface ListAllNotificationHistoryResponse
 */
export interface ListAllNotificationHistoryResponse {
    /**
     * Maximum number of records returned
     * @type {number}
     * @memberof ListAllNotificationHistoryResponse
     */
    limit: number;
    /**
     * Number of records skipped
     * @type {number}
     * @memberof ListAllNotificationHistoryResponse
     */
    offset: number;
    /**
     * Total number of records matching the filter criteria
     * @type {number}
     * @memberof ListAllNotificationHistoryResponse
     */
    count: number;
    /**
     * Array of notification history objects
     * @type {Array<NotificationHistoryWithName>}
     * @memberof ListAllNotificationHistoryResponse
     */
    items: Array<NotificationHistoryWithName>;
}
/**
 * Paginated list of audit logs
 * @export
 * @interface ListAuditLogsResponse
 */
export interface ListAuditLogsResponse {
    /**
     * Maximum number of records returned
     * @type {number}
     * @memberof ListAuditLogsResponse
     */
    limit: number;
    /**
     * Number of records skipped
     * @type {number}
     * @memberof ListAuditLogsResponse
     */
    offset: number;
    /**
     * Total number of records matching the filter criteria
     * @type {number}
     * @memberof ListAuditLogsResponse
     */
    count: number;
    /**
     * Array of audit log records
     * @type {Array<AuditLog>}
     * @memberof ListAuditLogsResponse
     */
    items: Array<AuditLog>;
}
/**
 * Paginated list of CSV exports
 * @export
 * @interface ListCSVExportsResponse
 */
export interface ListCSVExportsResponse {
    /**
     * Array of CSV export objects
     * @type {Array<CSVExportItem>}
     * @memberof ListCSVExportsResponse
     */
    exports: Array<CSVExportItem>;
    /**
     * Total number of exports returned
     * @type {number}
     * @memberof ListCSVExportsResponse
     */
    total: number;
    /**
     * Maximum number of exports returned
     * @type {number}
     * @memberof ListCSVExportsResponse
     */
    limit: number;
    /**
     * Number of exports skipped
     * @type {number}
     * @memberof ListCSVExportsResponse
     */
    offset: number;
}
/**
 *
 * @export
 * @interface ListConnectionsResponse
 */
export interface ListConnectionsResponse {
    /**
     * Number of connections skipped
     * @type {number}
     * @memberof ListConnectionsResponse
     */
    offset: number;
    /**
     * Maximum number of connections returned
     * @type {number}
     * @memberof ListConnectionsResponse
     */
    limit: number;
    /**
     * Total matching connections
     * @type {number}
     * @memberof ListConnectionsResponse
     */
    count: number;
    /**
     * Array of connection objects with controller information
     * @type {Array<ConnectionWithController>}
     * @memberof ListConnectionsResponse
     */
    items: Array<ConnectionWithController>;
}
/**
 *
 * @export
 * @interface ListCurrentAccountApiKeysResponse
 */
export interface ListCurrentAccountApiKeysResponse {
    /**
     *
     * @type {Array<CurrentAccountApiKeySummary>}
     * @memberof ListCurrentAccountApiKeysResponse
     */
    items: Array<CurrentAccountApiKeySummary>;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountApiKeysResponse
     */
    count: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountApiKeysResponse
     */
    offset: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountApiKeysResponse
     */
    limit: number;
}
/**
 *
 * @export
 * @interface ListCurrentAccountMembersResponse
 */
export interface ListCurrentAccountMembersResponse {
    /**
     *
     * @type {Array<AccountMember>}
     * @memberof ListCurrentAccountMembersResponse
     */
    members: Array<AccountMember>;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountMembersResponse
     */
    count: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountMembersResponse
     */
    offset: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountMembersResponse
     */
    limit: number;
}
/**
 *
 * @export
 * @interface ListCurrentAccountSecretsResponse
 */
export interface ListCurrentAccountSecretsResponse {
    /**
     * Secret key names. Secret values are never returned.
     * @type {Array<CurrentAccountSecretKey>}
     * @memberof ListCurrentAccountSecretsResponse
     */
    items: Array<CurrentAccountSecretKey>;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountSecretsResponse
     */
    count: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountSecretsResponse
     */
    offset: number;
    /**
     *
     * @type {number}
     * @memberof ListCurrentAccountSecretsResponse
     */
    limit: number;
}
/**
 *
 * @export
 * @interface ListEventsResponse
 */
export interface ListEventsResponse {
    /**
     * Maximum number of events returned
     * @type {number}
     * @memberof ListEventsResponse
     */
    limit: number;
    /**
     * Number of events skipped
     * @type {number}
     * @memberof ListEventsResponse
     */
    offset: number;
    /**
     * Total number of events matching the query
     * @type {number}
     * @memberof ListEventsResponse
     */
    count: number;
    /**
     * Array of event objects
     * @type {Array<Event>}
     * @memberof ListEventsResponse
     */
    items: Array<Event>;
}
/**
 *
 * @export
 * @interface ListFieldBase
 */
export interface ListFieldBase {
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    type: ListFieldBaseTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof ListFieldBase
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof ListFieldBase
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof ListFieldBase
     */
    validation?: ValidationRule;
    /**
     *
     * @type {number}
     * @memberof ListFieldBase
     */
    minItems?: number;
    /**
     *
     * @type {number}
     * @memberof ListFieldBase
     */
    maxItems?: number;
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    addButtonText?: string;
    /**
     *
     * @type {string}
     * @memberof ListFieldBase
     */
    removeButtonText?: string;
}


/**
 * @export
 */
export const ListFieldBaseTypeEnum = {
    List: 'list'
} as const;
export type ListFieldBaseTypeEnum = typeof ListFieldBaseTypeEnum[keyof typeof ListFieldBaseTypeEnum];

/**
 *
 * @export
 * @interface ListGroupsResponse
 */
export interface ListGroupsResponse {
    /**
     * Total number of groups matching the query
     * @type {number}
     * @memberof ListGroupsResponse
     */
    count: number;
    /**
     * Number of items skipped
     * @type {number}
     * @memberof ListGroupsResponse
     */
    offset: number;
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof ListGroupsResponse
     */
    limit: number;
    /**
     * List of groups
     * @type {Array<Group>}
     * @memberof ListGroupsResponse
     */
    items: Array<Group>;
}
/**
 *
 * @export
 * @interface ListInboundConnectionsResponse
 */
export interface ListInboundConnectionsResponse {
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof ListInboundConnectionsResponse
     */
    limit: number;
    /**
     * Number of items skipped
     * @type {number}
     * @memberof ListInboundConnectionsResponse
     */
    offset: number;
    /**
     * Total number of inbound connections
     * @type {number}
     * @memberof ListInboundConnectionsResponse
     */
    count: number;
    /**
     * Array of inbound connection objects
     * @type {Array<InboundConnection>}
     * @memberof ListInboundConnectionsResponse
     */
    items: Array<InboundConnection>;
}
/**
 *
 * @export
 * @interface ListInboundSourcesResponse
 */
export interface ListInboundSourcesResponse {
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof ListInboundSourcesResponse
     */
    limit: number;
    /**
     * Number of items skipped
     * @type {number}
     * @memberof ListInboundSourcesResponse
     */
    offset: number;
    /**
     * Total number of inbound sources matching the query
     * @type {number}
     * @memberof ListInboundSourcesResponse
     */
    count: number;
    /**
     * Array of inbound source objects
     * @type {Array<InboundSource>}
     * @memberof ListInboundSourcesResponse
     */
    items: Array<InboundSource>;
}
/**
 *
 * @export
 * @interface ListIntegrationsResponse
 */
export interface ListIntegrationsResponse {
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof ListIntegrationsResponse
     */
    limit: number;
    /**
     * Number of items skipped
     * @type {number}
     * @memberof ListIntegrationsResponse
     */
    offset: number;
    /**
     * Total number of integrations matching the query
     * @type {number}
     * @memberof ListIntegrationsResponse
     */
    count: number;
    /**
     * Array of integration objects
     * @type {Array<Integration>}
     * @memberof ListIntegrationsResponse
     */
    items: Array<Integration>;
}
/**
 *
 * @export
 * @interface ListIntelligences200Response
 */
export interface ListIntelligences200Response {
    /**
     * Array of intelligence metadata
     * @type {Array<PublicIntelligence>}
     * @memberof ListIntelligences200Response
     */
    items: Array<PublicIntelligence>;
    /**
     * Total number of intelligences available
     * @type {number}
     * @memberof ListIntelligences200Response
     */
    total: number;
    /**
     * Current offset
     * @type {number}
     * @memberof ListIntelligences200Response
     */
    offset: number;
    /**
     * Current limit
     * @type {number}
     * @memberof ListIntelligences200Response
     */
    limit: number;
}
/**
 * Paginated response of the invitation list
 * @export
 * @interface ListInvitationsResponse
 */
export interface ListInvitationsResponse {
    /**
     * Array of invitation objects (empty array when `count_only=true`)
     * @type {Array<InviteWithDetails>}
     * @memberof ListInvitationsResponse
     */
    invites: Array<InviteWithDetails>;
    /**
     * Total number of invitations matching the filter criteria
     * @type {number}
     * @memberof ListInvitationsResponse
     */
    count: number;
    /**
     * Maximum number of invitations returned
     * @type {number}
     * @memberof ListInvitationsResponse
     */
    limit: number;
    /**
     * Number of invitations skipped
     * @type {number}
     * @memberof ListInvitationsResponse
     */
    offset: number;
}
/**
 *
 * @export
 * @interface ListIssuesResponse
 */
export interface ListIssuesResponse {
    /**
     * Maximum number of issues returned
     * @type {number}
     * @memberof ListIssuesResponse
     */
    limit: number;
    /**
     * Number of issues skipped
     * @type {number}
     * @memberof ListIssuesResponse
     */
    offset: number;
    /**
     * Total number of issues matching the query
     * @type {number}
     * @memberof ListIssuesResponse
     */
    count: number;
    /**
     * Array of issue objects
     * @type {Array<Issue>}
     * @memberof ListIssuesResponse
     */
    items: Array<Issue>;
}
/**
 * Response containing paginated list of machines
 * @export
 * @interface ListMachinesResponse
 */
export interface ListMachinesResponse {
    /**
     * Maximum number of machines returned
     * @type {number}
     * @memberof ListMachinesResponse
     */
    limit: number;
    /**
     * Number of machines skipped
     * @type {number}
     * @memberof ListMachinesResponse
     */
    offset: number;
    /**
     * Total number of machines matching the query
     * @type {number}
     * @memberof ListMachinesResponse
     */
    count: number;
    /**
     * Array of machine objects with optional state data
     * @type {Array<MachineListItem>}
     * @memberof ListMachinesResponse
     */
    items: Array<MachineListItem>;
}
/**
 * Paginated list of notification history records
 * @export
 * @interface ListNotificationHistoryResponse
 */
export interface ListNotificationHistoryResponse {
    /**
     * Maximum number of history records returned
     * @type {number}
     * @memberof ListNotificationHistoryResponse
     */
    limit: number;
    /**
     * Number of history records skipped
     * @type {number}
     * @memberof ListNotificationHistoryResponse
     */
    offset: number;
    /**
     * Total number of history records for the notification
     * @type {number}
     * @memberof ListNotificationHistoryResponse
     */
    count: number;
    /**
     * Array of notification history objects
     * @type {Array<NotificationHistory>}
     * @memberof ListNotificationHistoryResponse
     */
    items: Array<NotificationHistory>;
}
/**
 * Paginated list of notification destinations
 * @export
 * @interface ListNotificationsResponse
 */
export interface ListNotificationsResponse {
    /**
     * Maximum number of notifications returned
     * @type {number}
     * @memberof ListNotificationsResponse
     */
    limit: number;
    /**
     * Number of notifications skipped
     * @type {number}
     * @memberof ListNotificationsResponse
     */
    offset: number;
    /**
     * Total number of notifications in the account
     * @type {number}
     * @memberof ListNotificationsResponse
     */
    count: number;
    /**
     * Array of notification destination objects
     * @type {Array<Notification>}
     * @memberof ListNotificationsResponse
     */
    items: Array<Notification>;
}
/**
 * Paginated list of obniz Cloud devices with machine link state
 * @export
 * @interface ListObnizCloudDevicesResponse
 */
export interface ListObnizCloudDevicesResponse {
    /**
     *
     * @type {number}
     * @memberof ListObnizCloudDevicesResponse
     */
    limit: number;
    /**
     *
     * @type {number}
     * @memberof ListObnizCloudDevicesResponse
     */
    offset: number;
    /**
     * Total number of devices in obniz Cloud
     * @type {number}
     * @memberof ListObnizCloudDevicesResponse
     */
    count: number;
    /**
     *
     * @type {Array<ObnizCloudDeviceWithMachine>}
     * @memberof ListObnizCloudDevicesResponse
     */
    items: Array<ObnizCloudDeviceWithMachine>;
}
/**
 * Paginated list of export reports
 * @export
 * @interface ListReportsResponse
 */
export interface ListReportsResponse {
    /**
     * Maximum number of reports returned
     * @type {number}
     * @memberof ListReportsResponse
     */
    limit: number;
    /**
     * Number of reports skipped
     * @type {number}
     * @memberof ListReportsResponse
     */
    offset: number;
    /**
     * Total number of reports matching the query
     * @type {number}
     * @memberof ListReportsResponse
     */
    count: number;
    /**
     * Array of report objects
     * @type {Array<Report>}
     * @memberof ListReportsResponse
     */
    items: Array<Report>;
}
/**
 *
 * @export
 * @interface ListThreadPostsResponse
 */
export interface ListThreadPostsResponse {
    /**
     * List of posts in the thread
     * @type {Array<ThreadPost>}
     * @memberof ListThreadPostsResponse
     */
    posts: Array<ThreadPost>;
    /**
     * List of related entities
     * @type {Array<ThreadEntity>}
     * @memberof ListThreadPostsResponse
     */
    entities: Array<ThreadEntity>;
}
/**
 *
 * @export
 * @interface ListThreadsResponse
 */
export interface ListThreadsResponse {
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof ListThreadsResponse
     */
    limit: number;
    /**
     * Number of items skipped
     * @type {number}
     * @memberof ListThreadsResponse
     */
    offset: number;
    /**
     * Total count of threads
     * @type {number}
     * @memberof ListThreadsResponse
     */
    count: number;
    /**
     * Array of threads
     * @type {Array<Thread>}
     * @memberof ListThreadsResponse
     */
    items: Array<Thread>;
}
/**
 *
 * @export
 * @interface LocalizedLabels
 */
export interface LocalizedLabels {
    /**
     *
     * @type {string}
     * @memberof LocalizedLabels
     */
    en: string;
    /**
     *
     * @type {string}
     * @memberof LocalizedLabels
     */
    ja: string;
}
/**
 * Machine object
 * @export
 * @interface Machine
 */
export interface Machine {
    /**
     * Unique machine identifier (UUID)
     * @type {string}
     * @memberof Machine
     */
    id: string;
    /**
     * Account ID that owns this machine
     * @type {string}
     * @memberof Machine
     */
    account_id: string;
    /**
     * Human-readable machine name
     * @type {string}
     * @memberof Machine
     */
    name?: string | null;
    /**
     * ID of connected obniz device (if any)
     * @type {string}
     * @memberof Machine
     */
    connected_obniz_id: string | null;
    /**
     * List of connection model names
     * @type {Array<string>}
     * @memberof Machine
     */
    connection_models?: Array<string>;
    /**
     * Custom metadata for the machine
     * @type {{ [key: string]: any; }}
     * @memberof Machine
     */
    metadata: { [key: string]: any; };
    /**
     * Timestamp when the machine was created
     * @type {string}
     * @memberof Machine
     */
    created_at: string;
    /**
     * Timestamp when the machine was last updated
     * @type {string}
     * @memberof Machine
     */
    updated_at: string;
    /**
     * Whether the machine is publicly accessible
     * @type {boolean}
     * @memberof Machine
     */
    is_public: boolean;
}
/**
 * Machine entity details
 * @export
 * @interface MachineEntity
 */
export interface MachineEntity {
    /**
     * Machine ID
     * @type {string}
     * @memberof MachineEntity
     */
    id?: string;
    /**
     * Machine name
     * @type {string}
     * @memberof MachineEntity
     */
    name?: string;
    /**
     *
     * @type {MachineEntityMetadata}
     * @memberof MachineEntity
     */
    metadata?: MachineEntityMetadata;
}
/**
 * Machine metadata
 * @export
 * @interface MachineEntityMetadata
 */
export interface MachineEntityMetadata {
    /**
     * Machine model
     * @type {string}
     * @memberof MachineEntityMetadata
     */
    model?: string;
    /**
     * Machine location
     * @type {string}
     * @memberof MachineEntityMetadata
     */
    location?: string;
}
/**
 * Response containing machine's assigned groups
 * @export
 * @interface MachineGroupsResponse
 */
export interface MachineGroupsResponse {
    /**
     * ID of the machine
     * @type {string}
     * @memberof MachineGroupsResponse
     */
    machine_id: string;
    /**
     * List of groups that the machine belongs to
     * @type {Array<MachineGroupsResponseGroupsInner>}
     * @memberof MachineGroupsResponse
     */
    groups: Array<MachineGroupsResponseGroupsInner>;
}
/**
 *
 * @export
 * @interface MachineGroupsResponseGroupsInner
 */
export interface MachineGroupsResponseGroupsInner {
    /**
     * Group ID
     * @type {string}
     * @memberof MachineGroupsResponseGroupsInner
     */
    id: string;
    /**
     * Group name
     * @type {string}
     * @memberof MachineGroupsResponseGroupsInner
     */
    name: string;
}
/**
 * Link to a machine
 * @export
 * @interface MachineLink
 */
export interface MachineLink {
    /**
     * Machine ID
     * @type {string}
     * @memberof MachineLink
     */
    machine_id: string;
}
/**
 * Machine object with optional state data
 * @export
 * @interface MachineListItem
 */
export interface MachineListItem {
    /**
     *
     * @type {Machine}
     * @memberof MachineListItem
     */
    machine: Machine;
    /**
     * Machine states (key-value pairs), included if 'all_state' is true or when filtering by state
     * @type {{ [key: string]: MachineListItemStatesValue; }}
     * @memberof MachineListItem
     */
    states?: { [key: string]: MachineListItemStatesValue; };
}
/**
 *
 * @export
 * @interface MachineListItemStatesValue
 */
export interface MachineListItemStatesValue {
    /**
     * State value (structure depends on the specific state)
     * @type {{ [key: string]: any; }}
     * @memberof MachineListItemStatesValue
     */
    value: { [key: string]: any; };
    /**
     * Timestamp when the state was last updated
     * @type {string}
     * @memberof MachineListItemStatesValue
     */
    ts: string;
}
/**
 * Machine object with current state data
 * @export
 * @interface MachineWithState
 */
export interface MachineWithState {
    /**
     *
     * @type {Machine}
     * @memberof MachineWithState
     */
    machine: Machine;
    /**
     * Current state of the machine (key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof MachineWithState
     */
    machine_stat: { [key: string]: any; } | null;
}
/**
 *
 * @export
 * @interface NotFound
 */
export interface NotFound {
    /**
     *
     * @type {string}
     * @memberof NotFound
     */
    error?: string;
}
/**
 * Notification destination object
 * @export
 * @interface Notification
 */
export interface Notification {
    /**
     * Unique notification identifier (UUID)
     * @type {string}
     * @memberof Notification
     */
    id?: string;
    /**
     * Account ID that owns this notification
     * @type {string}
     * @memberof Notification
     */
    account_id?: string;
    /**
     * Human-readable notification name
     * @type {string}
     * @memberof Notification
     */
    name?: string;
    /**
     * Type of notification (email, slack, etc.)
     * @type {string}
     * @memberof Notification
     */
    type?: string;
    /**
     * Group ID if notification is restricted to a group
     * @type {string}
     * @memberof Notification
     */
    group_id?: string | null;
    /**
     * Notification destination configuration (structure depends on type)
     * @type {{ [key: string]: any; }}
     * @memberof Notification
     */
    destination?: { [key: string]: any; };
    /**
     * Timestamp when the notification was last used
     * @type {string}
     * @memberof Notification
     */
    last_used?: string;
    /**
     * Subject template with {:key} placeholders
     * @type {string}
     * @memberof Notification
     */
    template_title?: string | null;
    /**
     * Body template with {:key} placeholders
     * @type {string}
     * @memberof Notification
     */
    template_body?: string | null;
}
/**
 * Notification send history record
 * @export
 * @interface NotificationHistory
 */
export interface NotificationHistory {
    /**
     * Unique identifier of the history record
     * @type {string}
     * @memberof NotificationHistory
     */
    id: string;
    /**
     * ID of the notification destination
     * @type {string}
     * @memberof NotificationHistory
     */
    notification_id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof NotificationHistory
     */
    account_id: string;
    /**
     * Send status
     * @type {string}
     * @memberof NotificationHistory
     */
    status: NotificationHistoryStatusEnum;
    /**
     * Error message when failed (null on success)
     * @type {string}
     * @memberof NotificationHistory
     */
    error_message?: string | null;
    /**
     * Content of the sent message
     * @type {string}
     * @memberof NotificationHistory
     */
    message: string;
    /**
     * Notification type
     * @type {string}
     * @memberof NotificationHistory
     */
    type?: NotificationHistoryTypeEnum | null;
    /**
     * Date and time when the notification was sent
     * @type {string}
     * @memberof NotificationHistory
     */
    sent_at: string;
}


/**
 * @export
 */
export const NotificationHistoryStatusEnum = {
    Pending: 'pending',
    Success: 'success',
    Error: 'error'
} as const;
export type NotificationHistoryStatusEnum = typeof NotificationHistoryStatusEnum[keyof typeof NotificationHistoryStatusEnum];

/**
 * @export
 */
export const NotificationHistoryTypeEnum = {
    Email: 'email',
    Webhook: 'webhook',
    Slack: 'slack',
    SlackApp: 'slackApp',
    Sms: 'sms',
    Call: 'call'
} as const;
export type NotificationHistoryTypeEnum = typeof NotificationHistoryTypeEnum[keyof typeof NotificationHistoryTypeEnum];

/**
 * Notification send history record with notification name
 * @export
 * @interface NotificationHistoryWithName
 */
export interface NotificationHistoryWithName {
    /**
     * Unique identifier of the history record
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    id: string;
    /**
     * Target notification destination ID
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    notification_id: string;
    /**
     * Account ID
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    account_id: string;
    /**
     * Send status
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    status: NotificationHistoryWithNameStatusEnum;
    /**
     * Error message (null on success)
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    error_message?: string | null;
    /**
     * Sent message content
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    message: string;
    /**
     * Notification type
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    type?: NotificationHistoryWithNameTypeEnum | null;
    /**
     * Sent at timestamp
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    sent_at: string;
    /**
     * Name of the notification destination
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    notification_name: string;
}


/**
 * @export
 */
export const NotificationHistoryWithNameStatusEnum = {
    Pending: 'pending',
    Success: 'success',
    Error: 'error'
} as const;
export type NotificationHistoryWithNameStatusEnum = typeof NotificationHistoryWithNameStatusEnum[keyof typeof NotificationHistoryWithNameStatusEnum];

/**
 * @export
 */
export const NotificationHistoryWithNameTypeEnum = {
    Email: 'email',
    Webhook: 'webhook',
    Slack: 'slack',
    SlackApp: 'slackApp',
    Sms: 'sms',
    Call: 'call'
} as const;
export type NotificationHistoryWithNameTypeEnum = typeof NotificationHistoryWithNameTypeEnum[keyof typeof NotificationHistoryWithNameTypeEnum];

/**
 *
 * @export
 * @interface NumberField
 */
export interface NumberField {
    /**
     *
     * @type {string}
     * @memberof NumberField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof NumberField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof NumberField
     */
    type: NumberFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof NumberField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof NumberField
     */
    placeholder?: string;
    /**
     *
     * @type {number}
     * @memberof NumberField
     */
    defaultValue?: number;
    /**
     *
     * @type {ValidationRule}
     * @memberof NumberField
     */
    validation?: ValidationRule;
}


/**
 * @export
 */
export const NumberFieldTypeEnum = {
    Number: 'number'
} as const;
export type NumberFieldTypeEnum = typeof NumberFieldTypeEnum[keyof typeof NumberFieldTypeEnum];

/**
 *
 * @export
 * @interface ObjectItemTemplate
 */
export interface ObjectItemTemplate {
    /**
     *
     * @type {string}
     * @memberof ObjectItemTemplate
     */
    type: ObjectItemTemplateTypeEnum;
    /**
     *
     * @type {Array<Field>}
     * @memberof ObjectItemTemplate
     */
    fields: Array<Field>;
}


/**
 * @export
 */
export const ObjectItemTemplateTypeEnum = {
    Object: 'object'
} as const;
export type ObjectItemTemplateTypeEnum = typeof ObjectItemTemplateTypeEnum[keyof typeof ObjectItemTemplateTypeEnum];

/**
 *
 * @export
 * @interface ObjectListField
 */
export interface ObjectListField {
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    type: ObjectListFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof ObjectListField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof ObjectListField
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof ObjectListField
     */
    validation?: ValidationRule;
    /**
     *
     * @type {number}
     * @memberof ObjectListField
     */
    minItems?: number;
    /**
     *
     * @type {number}
     * @memberof ObjectListField
     */
    maxItems?: number;
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    addButtonText?: string;
    /**
     *
     * @type {string}
     * @memberof ObjectListField
     */
    removeButtonText?: string;
    /**
     *
     * @type {ObjectItemTemplate}
     * @memberof ObjectListField
     */
    itemTemplate: ObjectItemTemplate;
}


/**
 * @export
 */
export const ObjectListFieldTypeEnum = {
    List: 'list'
} as const;
export type ObjectListFieldTypeEnum = typeof ObjectListFieldTypeEnum[keyof typeof ObjectListFieldTypeEnum];

/**
 *
 * @export
 * @interface ObnizCloudDevice
 */
export interface ObnizCloudDevice {
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    description?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    hardware?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    os?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    osVersion?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    region?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    status?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    access_token?: string | null;
    /**
     *
     * @type {string}
     * @memberof ObnizCloudDevice
     */
    devicekey?: string | null;
    /**
     *
     * @type {number}
     * @memberof ObnizCloudDevice
     */
    pingInterval?: number | null;
    /**
     *
     * @type {object}
     * @memberof ObnizCloudDevice
     */
    serialCode?: object | null;
    /**
     *
     * @type {object}
     * @memberof ObnizCloudDevice
     */
    deviceLiveInfo?: object | null;
}
/**
 *
 * @export
 * @interface ObnizCloudDeviceWithMachine
 */
export interface ObnizCloudDeviceWithMachine {
    /**
     *
     * @type {ObnizCloudDevice}
     * @memberof ObnizCloudDeviceWithMachine
     */
    obniz: ObnizCloudDevice;
    /**
     * The machine linked to this obniz Cloud device, or null if not linked
     * @type {Machine}
     * @memberof ObnizCloudDeviceWithMachine
     */
    machine: Machine | null;
}
/**
 *
 * @export
 * @interface Option
 */
export interface Option {
    /**
     *
     * @type {OptionValue}
     * @memberof Option
     */
    value: OptionValue;
    /**
     *
     * @type {string}
     * @memberof Option
     */
    label: string;
    /**
     *
     * @type {Array<Option>}
     * @memberof Option
     */
    options?: Array<Option>;
}
/**
 * @type OptionValue
 *
 * @export
 */
export type OptionValue = number | string;

/**
 *
 * @export
 */
export const PlanKey = {
    Account: 'account',
    AccountIpLimit: 'account_ip_limit',
    MachinesCount: 'machines_count',
    ReportGeneration: 'report_generation',
    NotificationDestinationCount: 'notification_destination_count',
    NotificationEmail: 'notification_email',
    NotificationCall: 'notification_call',
    NotificationSms: 'notification_sms',
    NotificationSlack: 'notification_slack',
    NotificationWebhook: 'notification_webhook',
    Integration: 'integration',
    InboundSourcesUpload: 'inbound_sources_upload',
    IntelligencesRunCount: 'intelligences_run_count',
    GroupsCount: 'groups_count',
    AuditLogAccess: 'audit_log_access',
    OwnerUsersCount: 'owner_users_count',
    GuestUsersCount: 'guest_users_count',
    Apikeys: 'apikeys',
    Threads: 'threads',
    HistoryRetentionDays: 'history_retention_days'
} as const;
export type PlanKey = typeof PlanKey[keyof typeof PlanKey];

/**
 *
 * @export
 * @interface PlanLimitation
 */
export interface PlanLimitation {
    /**
     *
     * @type {number}
     * @memberof PlanLimitation
     */
    limit_to: number;
    /**
     *
     * @type {string}
     * @memberof PlanLimitation
     */
    description: string;
    /**
     *
     * @type {boolean}
     * @memberof PlanLimitation
     */
    auto_increment: boolean;
    /**
     *
     * @type {number}
     * @memberof PlanLimitation
     */
    base_price_jpy: number;
    /**
     *
     * @type {number}
     * @memberof PlanLimitation
     */
    base_step_count: number;
    /**
     *
     * @type {number}
     * @memberof PlanLimitation
     */
    unit_price_jpy: number;
    /**
     *
     * @type {number}
     * @memberof PlanLimitation
     */
    unit_step_count: number;
}

/**
 *
 * @export
 */
export const PlanName = {
    Lite: 'lite',
    Standard: 'standard',
    Enterprise: 'enterprise'
} as const;
export type PlanName = typeof PlanName[keyof typeof PlanName];

/**
 * Public intelligence metadata. The executable code field is intentionally omitted.
 * @export
 * @interface PublicIntelligence
 */
export interface PublicIntelligence {
    /**
     *
     * @type {string}
     * @memberof PublicIntelligence
     */
    name: string;
    /**
     *
     * @type {number}
     * @memberof PublicIntelligence
     */
    version: number;
    /**
     *
     * @type {ControllerType}
     * @memberof PublicIntelligence
     */
    type: ControllerType;
    /**
     *
     * @type {string}
     * @memberof PublicIntelligence
     */
    title: string;
    /**
     *
     * @type {string}
     * @memberof PublicIntelligence
     */
    images?: string;
    /**
     *
     * @type {ControllerPublishment}
     * @memberof PublicIntelligence
     */
    publishment: ControllerPublishment;
    /**
     *
     * @type {string}
     * @memberof PublicIntelligence
     */
    description?: string;
    /**
     *
     * @type {CodeType}
     * @memberof PublicIntelligence
     */
    code_type: CodeType;
    /**
     *
     * @type {{ [key: string]: any; }}
     * @memberof PublicIntelligence
     */
    schema: { [key: string]: any; };
    /**
     *
     * @type {PublicIntelligenceConditions}
     * @memberof PublicIntelligence
     */
    conditions?: PublicIntelligenceConditions | null;
    /**
     *
     * @type {string}
     * @memberof PublicIntelligence
     */
    widget?: string;
}


/**
 * @type PublicIntelligenceConditions
 *
 * @export
 */
export type PublicIntelligenceConditions = Array<{ [key: string]: any; }> | { [key: string]: any; };
/**
 *
 * @export
 * @interface RateLimitError
 */
export interface RateLimitError {
    /**
     *
     * @type {string}
     * @memberof RateLimitError
     */
    result: string;
    /**
     *
     * @type {string}
     * @memberof RateLimitError
     */
    message: string;
}
/**
 *
 * @export
 * @interface ReceiveDataResponse
 */
export interface ReceiveDataResponse {
    /**
     * Detected sensor identifier
     * @type {string}
     * @memberof ReceiveDataResponse
     */
    sensorId?: string;
    /**
     * Processed sensor data
     * @type {{ [key: string]: any; }}
     * @memberof ReceiveDataResponse
     */
    sensorData?: { [key: string]: any; };
    /**
     * Processing message
     * @type {string}
     * @memberof ReceiveDataResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface ReceiveInboundData402Response
 */
export interface ReceiveInboundData402Response {
    /**
     *
     * @type {string}
     * @memberof ReceiveInboundData402Response
     */
    result?: string;
    /**
     *
     * @type {string}
     * @memberof ReceiveInboundData402Response
     */
    message?: string;
}
/**
 * Registered obniz device information from obniz Cloud
 * @export
 * @interface RegisteredObniz
 */
export interface RegisteredObniz {
    /**
     * Obniz device ID
     * @type {string}
     * @memberof RegisteredObniz
     */
    id?: string;
}
/**
 *
 * @export
 * @interface RemoveDetectionRequest
 */
export interface RemoveDetectionRequest {
    /**
     * Sensor ID to remove from detections
     * @type {string}
     * @memberof RemoveDetectionRequest
     */
    sensor_id: string;
}
/**
 *
 * @export
 * @interface RemoveMachinesFromGroup200Response
 */
export interface RemoveMachinesFromGroup200Response {
    /**
     *
     * @type {boolean}
     * @memberof RemoveMachinesFromGroup200Response
     */
    success?: boolean;
    /**
     *
     * @type {RemoveMachinesFromGroup200ResponseData}
     * @memberof RemoveMachinesFromGroup200Response
     */
    data?: RemoveMachinesFromGroup200ResponseData;
}
/**
 *
 * @export
 * @interface RemoveMachinesFromGroup200ResponseData
 */
export interface RemoveMachinesFromGroup200ResponseData {
    /**
     *
     * @type {Array<string>}
     * @memberof RemoveMachinesFromGroup200ResponseData
     */
    removed?: Array<string>;
}
/**
 *
 * @export
 * @interface ReopenIssueResponse
 */
export interface ReopenIssueResponse {
    /**
     *
     * @type {Issue}
     * @memberof ReopenIssueResponse
     */
    issue: Issue;
}
/**
 * Export report object
 * @export
 * @interface Report
 */
export interface Report {
    /**
     * Unique report identifier (UUID)
     * @type {string}
     * @memberof Report
     */
    id: string;
    /**
     * Group ID associated with the report
     * @type {string}
     * @memberof Report
     */
    group_id?: string | null;
    /**
     * Human-readable report name
     * @type {string}
     * @memberof Report
     */
    name: string;
    /**
     * Template used for report generation
     * @type {string}
     * @memberof Report
     */
    template?: string | null;
    /**
     * Type of report
     * @type {string}
     * @memberof Report
     */
    report_type: string;
    /**
     * Export progress percentage (0-100)
     * @type {number}
     * @memberof Report
     */
    progress?: number | null;
    /**
     * Current status of the report
     * @type {string}
     * @memberof Report
     */
    status: ReportStatusEnum;
    /**
     * Download URL for the completed report
     * @type {string}
     * @memberof Report
     */
    url: string;
    /**
     * Timestamp when the report was created
     * @type {string}
     * @memberof Report
     */
    created_at: string;
}


/**
 * @export
 */
export const ReportStatusEnum = {
    Pending: 'pending',
    Processing: 'processing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type ReportStatusEnum = typeof ReportStatusEnum[keyof typeof ReportStatusEnum];

/**
 * Detail and generation status of a report (PDF / CSV)
 * @export
 * @interface ReportDetail
 */
export interface ReportDetail {
    /**
     * Unique identifier of the report
     * @type {string}
     * @memberof ReportDetail
     */
    id: string;
    /**
     * Name of the report
     * @type {string}
     * @memberof ReportDetail
     */
    name: string;
    /**
     * Report file type
     * @type {string}
     * @memberof ReportDetail
     */
    report_type?: ReportDetailReportTypeEnum;
    /**
     * Template name used for the report
     * @type {string}
     * @memberof ReportDetail
     */
    template: string | null;
    /**
     * Group ID associated with the report
     * @type {string}
     * @memberof ReportDetail
     */
    group_id: string | null;
    /**
     * Generation status of the report
     * @type {string}
     * @memberof ReportDetail
     */
    status: ReportDetailStatusEnum;
    /**
     * Progress of the report generation. 0 to 100
     * @type {number}
     * @memberof ReportDetail
     */
    progress: number;
    /**
     * Timestamp when the report was created
     * @type {string}
     * @memberof ReportDetail
     */
    created_at: string;
    /**
     * Timestamp when the report generation completed
     * @type {string}
     * @memberof ReportDetail
     */
    completed_at: string | null;
    /**
     * Download endpoint URL. Available only when the report is completed and the file exists
     * @type {string}
     * @memberof ReportDetail
     */
    download_url: string | null;
    /**
     *
     * @type {ReportDetailMetadata}
     * @memberof ReportDetail
     */
    metadata?: ReportDetailMetadata;
}


/**
 * @export
 */
export const ReportDetailReportTypeEnum = {
    Pdf: 'pdf',
    Csv: 'csv'
} as const;
export type ReportDetailReportTypeEnum = typeof ReportDetailReportTypeEnum[keyof typeof ReportDetailReportTypeEnum];

/**
 * @export
 */
export const ReportDetailStatusEnum = {
    Pending: 'pending',
    Processing: 'processing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type ReportDetailStatusEnum = typeof ReportDetailStatusEnum[keyof typeof ReportDetailStatusEnum];

/**
 * Export conditions and generation results
 * @export
 * @interface ReportDetailMetadata
 */
export interface ReportDetailMetadata {
    /**
     * Target units of the export
     * @type {Array<ReportDetailMetadataUnitsInner>}
     * @memberof ReportDetailMetadata
     */
    units?: Array<ReportDetailMetadataUnitsInner>;
    /**
     * Target properties of the export
     * @type {Array<ReportDetailMetadataPropertiesInner>}
     * @memberof ReportDetailMetadata
     */
    properties?: Array<ReportDetailMetadataPropertiesInner>;
    /**
     * Start date of the export range
     * @type {string}
     * @memberof ReportDetailMetadata
     */
    start_date?: string;
    /**
     * End date of the export range
     * @type {string}
     * @memberof ReportDetailMetadata
     */
    end_date?: string;
    /**
     * Type of the export
     * @type {string}
     * @memberof ReportDetailMetadata
     */
    export_type?: string;
    /**
     *
     * @type {ReportDetailMetadataOptions}
     * @memberof ReportDetailMetadata
     */
    options?: ReportDetailMetadataOptions;
    /**
     * Total number of exported rows
     * @type {number}
     * @memberof ReportDetailMetadata
     */
    total_rows?: number;
    /**
     * Error message when the generation failed
     * @type {string}
     * @memberof ReportDetailMetadata
     */
    error_message?: string;
}
/**
 *
 * @export
 * @interface ReportDetailMetadataOptions
 */
export interface ReportDetailMetadataOptions {
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataOptions
     */
    format?: ReportDetailMetadataOptionsFormatEnum;
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataOptions
     */
    encoding?: ReportDetailMetadataOptionsEncodingEnum;
}


/**
 * @export
 */
export const ReportDetailMetadataOptionsFormatEnum = {
    Csv: 'csv',
    Tsv: 'tsv'
} as const;
export type ReportDetailMetadataOptionsFormatEnum = typeof ReportDetailMetadataOptionsFormatEnum[keyof typeof ReportDetailMetadataOptionsFormatEnum];

/**
 * @export
 */
export const ReportDetailMetadataOptionsEncodingEnum = {
    Utf8: 'utf-8',
    ShiftJis: 'shift-jis'
} as const;
export type ReportDetailMetadataOptionsEncodingEnum = typeof ReportDetailMetadataOptionsEncodingEnum[keyof typeof ReportDetailMetadataOptionsEncodingEnum];

/**
 *
 * @export
 * @interface ReportDetailMetadataPropertiesInner
 */
export interface ReportDetailMetadataPropertiesInner {
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataPropertiesInner
     */
    key?: string;
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataPropertiesInner
     */
    label?: string;
}
/**
 *
 * @export
 * @interface ReportDetailMetadataUnitsInner
 */
export interface ReportDetailMetadataUnitsInner {
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataUnitsInner
     */
    unit_id?: string;
    /**
     *
     * @type {string}
     * @memberof ReportDetailMetadataUnitsInner
     */
    label?: string;
}
/**
 * Error response while the resend cooldown is in effect
 * @export
 * @interface ResendCooldownResponse
 */
export interface ResendCooldownResponse {
    /**
     * Error message
     * @type {string}
     * @memberof ResendCooldownResponse
     */
    error?: string;
    /**
     * Remaining time until retry is allowed (milliseconds)
     * @type {number}
     * @memberof ResendCooldownResponse
     */
    retry_after_ms?: number;
}
/**
 *
 * @export
 * @interface SelectField
 */
export interface SelectField {
    /**
     *
     * @type {string}
     * @memberof SelectField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof SelectField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof SelectField
     */
    type: SelectFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof SelectField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof SelectField
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof SelectField
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof SelectField
     */
    validation?: ValidationRule;
    /**
     *
     * @type {boolean}
     * @memberof SelectField
     */
    multiple?: boolean;
    /**
     *
     * @type {Array<Option>}
     * @memberof SelectField
     */
    options: Array<Option>;
}


/**
 * @export
 */
export const SelectFieldTypeEnum = {
    Select: 'select'
} as const;
export type SelectFieldTypeEnum = typeof SelectFieldTypeEnum[keyof typeof SelectFieldTypeEnum];

/**
 *
 * @export
 * @interface SelectSessionAccountRequest
 */
export interface SelectSessionAccountRequest {
    /**
     *
     * @type {string}
     * @memberof SelectSessionAccountRequest
     */
    account_id: string;
}
/**
 *
 * @export
 * @interface SelectSessionAccountResponse
 */
export interface SelectSessionAccountResponse {
    /**
     *
     * @type {string}
     * @memberof SelectSessionAccountResponse
     */
    account_id: string;
    /**
     *
     * @type {string}
     * @memberof SelectSessionAccountResponse
     */
    redirect_to: string;
}
/**
 *
 * @export
 * @interface SessionAccountOption
 */
export interface SessionAccountOption {
    /**
     *
     * @type {string}
     * @memberof SessionAccountOption
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof SessionAccountOption
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof SessionAccountOption
     */
    role: SessionAccountOptionRoleEnum;
    /**
     *
     * @type {string}
     * @memberof SessionAccountOption
     */
    group_id: string | null;
    /**
     *
     * @type {boolean}
     * @memberof SessionAccountOption
     */
    selected: boolean;
}


/**
 * @export
 */
export const SessionAccountOptionRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type SessionAccountOptionRoleEnum = typeof SessionAccountOptionRoleEnum[keyof typeof SessionAccountOptionRoleEnum];

/**
 *
 * @export
 * @interface SessionAccountPage
 */
export interface SessionAccountPage {
    /**
     *
     * @type {string}
     * @memberof SessionAccountPage
     */
    slug: string;
    /**
     *
     * @type {LocalizedLabels}
     * @memberof SessionAccountPage
     */
    labels: LocalizedLabels;
    /**
     *
     * @type {string}
     * @memberof SessionAccountPage
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof SessionAccountPage
     */
    href: string;
}
/**
 *
 * @export
 * @interface SessionAccountsResponse
 */
export interface SessionAccountsResponse {
    /**
     *
     * @type {string}
     * @memberof SessionAccountsResponse
     */
    current_account_id: string | null;
    /**
     *
     * @type {Array<SessionAccountOption>}
     * @memberof SessionAccountsResponse
     */
    accounts: Array<SessionAccountOption>;
    /**
     *
     * @type {Array<SessionPendingAccount>}
     * @memberof SessionAccountsResponse
     */
    pending_accounts: Array<SessionPendingAccount>;
}
/**
 *
 * @export
 * @interface SessionCurrentAccount
 */
export interface SessionCurrentAccount {
    /**
     *
     * @type {string}
     * @memberof SessionCurrentAccount
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof SessionCurrentAccount
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof SessionCurrentAccount
     */
    plan: string;
}
/**
 *
 * @export
 * @interface SessionCurrentAuthority
 */
export interface SessionCurrentAuthority {
    /**
     *
     * @type {string}
     * @memberof SessionCurrentAuthority
     */
    role: SessionCurrentAuthorityRoleEnum;
    /**
     *
     * @type {string}
     * @memberof SessionCurrentAuthority
     */
    group_id: string | null;
}


/**
 * @export
 */
export const SessionCurrentAuthorityRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type SessionCurrentAuthorityRoleEnum = typeof SessionCurrentAuthorityRoleEnum[keyof typeof SessionCurrentAuthorityRoleEnum];

/**
 *
 * @export
 * @interface SessionPendingAccount
 */
export interface SessionPendingAccount {
    /**
     *
     * @type {string}
     * @memberof SessionPendingAccount
     */
    invite_id: string;
    /**
     *
     * @type {SessionPendingAccountAccount}
     * @memberof SessionPendingAccount
     */
    account: SessionPendingAccountAccount;
    /**
     *
     * @type {string}
     * @memberof SessionPendingAccount
     */
    role: SessionPendingAccountRoleEnum;
}


/**
 * @export
 */
export const SessionPendingAccountRoleEnum = {
    Owner: 'owner',
    Member: 'member',
    Guest: 'guest'
} as const;
export type SessionPendingAccountRoleEnum = typeof SessionPendingAccountRoleEnum[keyof typeof SessionPendingAccountRoleEnum];

/**
 *
 * @export
 * @interface SessionPendingAccountAccount
 */
export interface SessionPendingAccountAccount {
    /**
     *
     * @type {string}
     * @memberof SessionPendingAccountAccount
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof SessionPendingAccountAccount
     */
    name: string;
}
/**
 *
 * @export
 * @interface SessionSidebarItem
 */
export interface SessionSidebarItem {
    /**
     *
     * @type {string}
     * @memberof SessionSidebarItem
     */
    key: string;
    /**
     *
     * @type {LocalizedLabels}
     * @memberof SessionSidebarItem
     */
    labels: LocalizedLabels;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarItem
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarItem
     */
    href: string;
    /**
     *
     * @type {boolean}
     * @memberof SessionSidebarItem
     */
    external: boolean;
    /**
     *
     * @type {SessionSidebarItemHeader}
     * @memberof SessionSidebarItem
     */
    header?: SessionSidebarItemHeader | null;
}
/**
 *
 * @export
 * @interface SessionSidebarItemHeader
 */
export interface SessionSidebarItemHeader {
    /**
     *
     * @type {LocalizedLabels}
     * @memberof SessionSidebarItemHeader
     */
    labels?: LocalizedLabels;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarItemHeader
     */
    label?: string;
}
/**
 *
 * @export
 * @interface SessionSidebarSection
 */
export interface SessionSidebarSection {
    /**
     *
     * @type {string}
     * @memberof SessionSidebarSection
     */
    key: string;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarSection
     */
    icon: string;
    /**
     *
     * @type {LocalizedLabels}
     * @memberof SessionSidebarSection
     */
    labels: LocalizedLabels;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarSection
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof SessionSidebarSection
     */
    href?: string | null;
    /**
     *
     * @type {Array<SessionSidebarItem>}
     * @memberof SessionSidebarSection
     */
    items?: Array<SessionSidebarItem> | null;
}
/**
 *
 * @export
 * @interface SessionUiConfigResponse
 */
export interface SessionUiConfigResponse {
    /**
     *
     * @type {string}
     * @memberof SessionUiConfigResponse
     */
    lang: SessionUiConfigResponseLangEnum;
    /**
     *
     * @type {SessionUser}
     * @memberof SessionUiConfigResponse
     */
    user: SessionUser;
    /**
     *
     * @type {SessionCurrentAccount}
     * @memberof SessionUiConfigResponse
     */
    account: SessionCurrentAccount;
    /**
     *
     * @type {SessionCurrentAuthority}
     * @memberof SessionUiConfigResponse
     */
    authority: SessionCurrentAuthority;
    /**
     *
     * @type {Array<SessionSidebarSection>}
     * @memberof SessionUiConfigResponse
     */
    sidebar: Array<SessionSidebarSection>;
    /**
     *
     * @type {Array<SessionAccountPage>}
     * @memberof SessionUiConfigResponse
     */
    account_pages: Array<SessionAccountPage>;
}


/**
 * @export
 */
export const SessionUiConfigResponseLangEnum = {
    En: 'en',
    Ja: 'ja'
} as const;
export type SessionUiConfigResponseLangEnum = typeof SessionUiConfigResponseLangEnum[keyof typeof SessionUiConfigResponseLangEnum];

/**
 *
 * @export
 * @interface SessionUser
 */
export interface SessionUser {
    /**
     *
     * @type {string}
     * @memberof SessionUser
     */
    id: string;
    /**
     *
     * @type {string}
     * @memberof SessionUser
     */
    name: string | null;
    /**
     *
     * @type {string}
     * @memberof SessionUser
     */
    email: string | null;
    /**
     *
     * @type {string}
     * @memberof SessionUser
     */
    language: SessionUserLanguageEnum;
    /**
     *
     * @type {string}
     * @memberof SessionUser
     */
    profile_picture_url: string | null;
}


/**
 * @export
 */
export const SessionUserLanguageEnum = {
    En: 'en',
    Ja: 'ja'
} as const;
export type SessionUserLanguageEnum = typeof SessionUserLanguageEnum[keyof typeof SessionUserLanguageEnum];

/**
 *
 * @export
 * @interface SetCurrentAccountSecretRequest
 */
export interface SetCurrentAccountSecretRequest {
    /**
     * Secret value to encrypt and store.
     * @type {string}
     * @memberof SetCurrentAccountSecretRequest
     */
    value: string;
}
/**
 *
 * @export
 * @interface SimpleItemTemplate
 */
export interface SimpleItemTemplate {
    /**
     *
     * @type {string}
     * @memberof SimpleItemTemplate
     */
    type: string;
    /**
     *
     * @type {string}
     * @memberof SimpleItemTemplate
     */
    placeholder?: string;
    /**
     *
     * @type {OptionValue}
     * @memberof SimpleItemTemplate
     */
    defaultValue?: OptionValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof SimpleItemTemplate
     */
    validation?: ValidationRule;
}
/**
 *
 * @export
 * @interface SimpleListField
 */
export interface SimpleListField {
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    type: SimpleListFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof SimpleListField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof SimpleListField
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof SimpleListField
     */
    validation?: ValidationRule;
    /**
     *
     * @type {number}
     * @memberof SimpleListField
     */
    minItems?: number;
    /**
     *
     * @type {number}
     * @memberof SimpleListField
     */
    maxItems?: number;
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    addButtonText?: string;
    /**
     *
     * @type {string}
     * @memberof SimpleListField
     */
    removeButtonText?: string;
    /**
     *
     * @type {SimpleItemTemplate}
     * @memberof SimpleListField
     */
    itemTemplate: SimpleItemTemplate;
}


/**
 * @export
 */
export const SimpleListFieldTypeEnum = {
    List: 'list'
} as const;
export type SimpleListFieldTypeEnum = typeof SimpleListFieldTypeEnum[keyof typeof SimpleListFieldTypeEnum];

/**
 * Simplified machine object
 * @export
 * @interface SimpleMachine
 */
export interface SimpleMachine {
    /**
     * Unique machine identifier (UUID)
     * @type {string}
     * @memberof SimpleMachine
     */
    id?: string;
    /**
     * Account ID that owns this machine
     * @type {string}
     * @memberof SimpleMachine
     */
    account_id?: string;
    /**
     * Human-readable machine name
     * @type {string}
     * @memberof SimpleMachine
     */
    name?: string;
    /**
     * Timestamp when the machine was created
     * @type {string}
     * @memberof SimpleMachine
     */
    created_at?: string;
}
/**
 * Historical state data point
 * @export
 * @interface StateHistoryItem
 */
export interface StateHistoryItem {
    /**
     * Timestamp of the state change
     * @type {string}
     * @memberof StateHistoryItem
     */
    ts: string;
    /**
     * State key
     * @type {string}
     * @memberof StateHistoryItem
     */
    key: string;
    /**
     * State value
     * @type {string}
     * @memberof StateHistoryItem
     */
    value: string;
}
/**
 * Paginated state history
 * @export
 * @interface StateHistoryResponse
 */
export interface StateHistoryResponse {
    /**
     * Total number of items in result
     * @type {number}
     * @memberof StateHistoryResponse
     */
    count: number;
    /**
     * Pagination offset
     * @type {number}
     * @memberof StateHistoryResponse
     */
    offset: number;
    /**
     * Maximum number of items returned
     * @type {number}
     * @memberof StateHistoryResponse
     */
    limit: number;
    /**
     * Array of state history items
     * @type {Array<StateHistoryItem>}
     * @memberof StateHistoryResponse
     */
    items: Array<StateHistoryItem>;
}
/**
 *
 * @export
 * @interface TestNotificationRequest
 */
export interface TestNotificationRequest {
    /**
     * Values to pass to template placeholders
     * @type {{ [key: string]: string; }}
     * @memberof TestNotificationRequest
     */
    placeholders?: { [key: string]: string; };
}
/**
 * Response confirming test notification was sent
 * @export
 * @interface TestNotificationResponse
 */
export interface TestNotificationResponse {
    /**
     *
     * @type {Notification}
     * @memberof TestNotificationResponse
     */
    notification: Notification;
}
/**
 *
 * @export
 * @interface TextField
 */
export interface TextField {
    /**
     *
     * @type {string}
     * @memberof TextField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof TextField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof TextField
     */
    type: TextFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof TextField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof TextField
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof TextField
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof TextField
     */
    validation?: ValidationRule;
}


/**
 * @export
 */
export const TextFieldTypeEnum = {
    Text: 'text'
} as const;
export type TextFieldTypeEnum = typeof TextFieldTypeEnum[keyof typeof TextFieldTypeEnum];

/**
 *
 * @export
 * @interface TextareaField
 */
export interface TextareaField {
    /**
     *
     * @type {string}
     * @memberof TextareaField
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof TextareaField
     */
    label: string;
    /**
     *
     * @type {string}
     * @memberof TextareaField
     */
    type: TextareaFieldTypeEnum;
    /**
     *
     * @type {boolean}
     * @memberof TextareaField
     */
    required?: boolean;
    /**
     *
     * @type {string}
     * @memberof TextareaField
     */
    placeholder?: string;
    /**
     *
     * @type {FieldBaseDefaultValue}
     * @memberof TextareaField
     */
    defaultValue?: FieldBaseDefaultValue;
    /**
     *
     * @type {ValidationRule}
     * @memberof TextareaField
     */
    validation?: ValidationRule;
    /**
     *
     * @type {number}
     * @memberof TextareaField
     */
    rows?: number;
}


/**
 * @export
 */
export const TextareaFieldTypeEnum = {
    Textarea: 'textarea'
} as const;
export type TextareaFieldTypeEnum = typeof TextareaFieldTypeEnum[keyof typeof TextareaFieldTypeEnum];

/**
 *
 * @export
 * @interface Thread
 */
export interface Thread {
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    title?: string;
    /**
     *
     * @type {boolean}
     * @memberof Thread
     */
    is_open?: boolean;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    account_id?: string;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    group_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    created_by?: string;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    created_at?: string;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    updated_at?: string;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    closed_at?: string | null;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    closed_by?: string | null;
    /**
     *
     * @type {string}
     * @memberof Thread
     */
    creator_name?: string;
}
/**
 *
 * @export
 * @interface ThreadEntity
 */
export interface ThreadEntity {
    /**
     *
     * @type {string}
     * @memberof ThreadEntity
     */
    thread_id?: string;
    /**
     *
     * @type {number}
     * @memberof ThreadEntity
     */
    post_number?: number;
    /**
     *
     * @type {number}
     * @memberof ThreadEntity
     */
    entity_number?: number;
    /**
     *
     * @type {string}
     * @memberof ThreadEntity
     */
    machine_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof ThreadEntity
     */
    issue_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof ThreadEntity
     */
    event_id?: string | null;
    /**
     *
     * @type {string}
     * @memberof ThreadEntity
     */
    created_at?: string;
}
/**
 *
 * @export
 * @interface ThreadPost
 */
export interface ThreadPost {
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    thread_id?: string;
    /**
     *
     * @type {number}
     * @memberof ThreadPost
     */
    post_number?: number;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    content?: string;
    /**
     *
     * @type {Array<string>}
     * @memberof ThreadPost
     */
    file_paths?: Array<string>;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    account_id?: string;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    created_by?: string;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    created_at?: string;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    updated_at?: string;
    /**
     *
     * @type {string}
     * @memberof ThreadPost
     */
    author_name?: string;
}
/**
 *
 * @export
 * @interface TransformIntegrationRequest
 */
export interface TransformIntegrationRequest {
    /**
     * Type of integration
     * @type {string}
     * @memberof TransformIntegrationRequest
     */
    integrationType: TransformIntegrationRequestIntegrationTypeEnum;
    /**
     * Transformation schema defining field mappings
     * @type {{ [key: string]: any; }}
     * @memberof TransformIntegrationRequest
     */
    schema: { [key: string]: any; };
    /**
     *
     * @type {TransformIntegrationRequestConfiguration}
     * @memberof TransformIntegrationRequest
     */
    _configuration?: TransformIntegrationRequestConfiguration;
    /**
     *
     * @type {AddIntegrationsRequestService}
     * @memberof TransformIntegrationRequest
     */
    service?: AddIntegrationsRequestService;
    /**
     *
     * @type {TransformIntegrationRequestCredentials}
     * @memberof TransformIntegrationRequest
     */
    credentials?: TransformIntegrationRequestCredentials;
    /**
     *
     * @type {TransformIntegrationRequestData}
     * @memberof TransformIntegrationRequest
     */
    data?: TransformIntegrationRequestData;
    /**
     * List of controllers installed on the machine (used to generate example data)
     * @type {Array<TransformIntegrationRequestConnectedControllersInner>}
     * @memberof TransformIntegrationRequest
     */
    connectedControllers?: Array<TransformIntegrationRequestConnectedControllersInner>;
}


/**
 * @export
 */
export const TransformIntegrationRequestIntegrationTypeEnum = {
    PubSub: 'PubSub',
    ApiPull: 'APIPull',
    ApiPush: 'APIPush'
} as const;
export type TransformIntegrationRequestIntegrationTypeEnum = typeof TransformIntegrationRequestIntegrationTypeEnum[keyof typeof TransformIntegrationRequestIntegrationTypeEnum];

/**
 * Configuration options for transformation
 * @export
 * @interface TransformIntegrationRequestConfiguration
 */
export interface TransformIntegrationRequestConfiguration {
    [key: string]: any | any;
    /**
     * Use simplified format (state) vs full history
     * @type {boolean}
     * @memberof TransformIntegrationRequestConfiguration
     */
    is_simplified?: boolean;
    /**
     * Return only latest values
     * @type {boolean}
     * @memberof TransformIntegrationRequestConfiguration
     */
    latest_only?: boolean;
    /**
     * Source for ID field in output
     * @type {string}
     * @memberof TransformIntegrationRequestConfiguration
     */
    idSource?: TransformIntegrationRequestConfigurationIdSourceEnum;
}


/**
 * @export
 */
export const TransformIntegrationRequestConfigurationIdSourceEnum = {
    Id: 'machine_id',
    Name: 'machine_name'
} as const;
export type TransformIntegrationRequestConfigurationIdSourceEnum = typeof TransformIntegrationRequestConfigurationIdSourceEnum[keyof typeof TransformIntegrationRequestConfigurationIdSourceEnum];

/**
 *
 * @export
 * @interface TransformIntegrationRequestConnectedControllersInner
 */
export interface TransformIntegrationRequestConnectedControllersInner {
    /**
     *
     * @type {string}
     * @memberof TransformIntegrationRequestConnectedControllersInner
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof TransformIntegrationRequestConnectedControllersInner
     */
    model_name?: string;
    /**
     *
     * @type {number}
     * @memberof TransformIntegrationRequestConnectedControllersInner
     */
    model_version?: number;
    /**
     *
     * @type {Array<object>}
     * @memberof TransformIntegrationRequestConnectedControllersInner
     */
    conditions?: Array<object>;
}
/**
 * Credentials (for PubSub)
 * @export
 * @interface TransformIntegrationRequestCredentials
 */
export interface TransformIntegrationRequestCredentials {
    [key: string]: any | any;
    /**
     *
     * @type {string}
     * @memberof TransformIntegrationRequestCredentials
     */
    project_id?: string;
    /**
     *
     * @type {string}
     * @memberof TransformIntegrationRequestCredentials
     */
    client_email?: string;
    /**
     *
     * @type {string}
     * @memberof TransformIntegrationRequestCredentials
     */
    private_key?: string;
}
/**
 * @type TransformIntegrationRequestData
 * Optional test data. If not provided, example data from controllers will be used.
 * @export
 */
export type TransformIntegrationRequestData = Array<object> | { [key: string]: any; };
/**
 *
 * @export
 * @interface UnauthorizedError
 */
export interface UnauthorizedError {
    /**
     *
     * @type {string}
     * @memberof UnauthorizedError
     */
    error?: string;
}
/**
 * Historical data point for a unit
 * @export
 * @interface UnitHistoryItem
 */
export interface UnitHistoryItem {
    /**
     * Retrieved data object (structure depends on unit type)
     * @type {{ [key: string]: any; }}
     * @memberof UnitHistoryItem
     */
    data: { [key: string]: any; };
    /**
     * TimeUUID of the data point
     * @type {string}
     * @memberof UnitHistoryItem
     */
    ts: string;
    /**
     * Unix timestamp in milliseconds
     * @type {number}
     * @memberof UnitHistoryItem
     */
    ts_timestamp: number;
    /**
     * Additional metadata for the data point
     * @type {{ [key: string]: any; }}
     * @memberof UnitHistoryItem
     */
    metadata: { [key: string]: any; };
}
/**
 * Unit data with summary statistics
 * @export
 * @interface UnitLoadResponse
 */
export interface UnitLoadResponse {
    /**
     * Total number of data points retrieved
     * @type {number}
     * @memberof UnitLoadResponse
     */
    count: number;
    /**
     * Timestamp of the last retrieved data point
     * @type {string}
     * @memberof UnitLoadResponse
     */
    tail_date?: string | null;
    /**
     * Array of retrieved data points with parsed JSON
     * @type {Array<UnitLoadResponseRowsInner>}
     * @memberof UnitLoadResponse
     */
    rows: Array<UnitLoadResponseRowsInner>;
}
/**
 *
 * @export
 * @interface UnitLoadResponseRowsInner
 */
export interface UnitLoadResponseRowsInner {
    /**
     * Double-parsed JSON data object
     * @type {{ [key: string]: any; }}
     * @memberof UnitLoadResponseRowsInner
     */
    data: { [key: string]: any; };
    /**
     * Timestamp of the data point in UTC
     * @type {string}
     * @memberof UnitLoadResponseRowsInner
     */
    ts: string;
}
/**
 * Request body for unregistering an obniz device
 * @export
 * @interface UnregisterObnizRequest
 */
export interface UnregisterObnizRequest {
    /**
     * Obniz device ID to unregister from machines
     * @type {string}
     * @memberof UnregisterObnizRequest
     */
    obniz_id: string;
}
/**
 * Request body for batch updating connection models
 * @export
 * @interface UpdateConnectionModelsRequest
 */
export interface UpdateConnectionModelsRequest {
    /**
     * Array of connection models to install/update on the machine
     * @type {Array<ConnectionModelUpdateItem>}
     * @memberof UpdateConnectionModelsRequest
     */
    models: Array<ConnectionModelUpdateItem>;
}
/**
 * Response containing results of batch connection model operations
 * @export
 * @interface UpdateConnectionModelsResponse
 */
export interface UpdateConnectionModelsResponse {
    /**
     * Result of each operation
     * @type {Array<ConnectionModelOperationResult>}
     * @memberof UpdateConnectionModelsResponse
     */
    results: Array<ConnectionModelOperationResult>;
}
/**
 *
 * @export
 * @interface UpdateCurrentAccountApiKeyRequest
 */
export interface UpdateCurrentAccountApiKeyRequest {
    /**
     *
     * @type {string}
     * @memberof UpdateCurrentAccountApiKeyRequest
     */
    name?: string;
    /**
     * API key permissions keyed by resource name.
     * @type {{ [key: string]: { [key: string]: boolean; }; }}
     * @memberof UpdateCurrentAccountApiKeyRequest
     */
    authority?: { [key: string]: { [key: string]: boolean; }; };
}
/**
 *
 * @export
 * @interface UpdateCurrentAccountMemberRequest
 */
export interface UpdateCurrentAccountMemberRequest {
    /**
     *
     * @type {AccountMemberRole}
     * @memberof UpdateCurrentAccountMemberRequest
     */
    role: AccountMemberRole;
    /**
     *
     * @type {string}
     * @memberof UpdateCurrentAccountMemberRequest
     */
    group_id?: string | null;
}


/**
 * @type UpdateCurrentUser400Response
 *
 * @export
 */
export type UpdateCurrentUser400Response = ErrorResponse | UserProfileValidationError;
/**
 *
 * @export
 * @interface UpdateCurrentUserRequest
 */
export interface UpdateCurrentUserRequest {
    /**
     *
     * @type {string}
     * @memberof UpdateCurrentUserRequest
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCurrentUserRequest
     */
    language?: UpdateCurrentUserRequestLanguageEnum;
    /**
     * URL to set as the profile picture. Send an empty string or null to clear it.
     * @type {string}
     * @memberof UpdateCurrentUserRequest
     */
    profile_picture_url?: string | null;
}


/**
 * @export
 */
export const UpdateCurrentUserRequestLanguageEnum = {
    En: 'en',
    Ja: 'ja'
} as const;
export type UpdateCurrentUserRequestLanguageEnum = typeof UpdateCurrentUserRequestLanguageEnum[keyof typeof UpdateCurrentUserRequestLanguageEnum];

/**
 *
 * @export
 * @interface UpdateDeviceFirmwareRequest
 */
export interface UpdateDeviceFirmwareRequest {
    /**
     * Array of device IDs to update
     * @type {Array<string>}
     * @memberof UpdateDeviceFirmwareRequest
     */
    deviceIds: Array<string>;
    /**
     * Target firmware version to install
     * @type {string}
     * @memberof UpdateDeviceFirmwareRequest
     */
    firmwareVersion: string;
    /**
     * Whether to skip offline devices and continue with others
     * @type {boolean}
     * @memberof UpdateDeviceFirmwareRequest
     */
    skipOffline?: boolean;
}
/**
 *
 * @export
 * @interface UpdateGroup200Response
 */
export interface UpdateGroup200Response {
    /**
     *
     * @type {boolean}
     * @memberof UpdateGroup200Response
     */
    success?: boolean;
    /**
     *
     * @type {CreateGroup201ResponseData}
     * @memberof UpdateGroup200Response
     */
    data?: CreateGroup201ResponseData;
}
/**
 *
 * @export
 * @interface UpdateGroupCustomFieldsRequest
 */
export interface UpdateGroupCustomFieldsRequest {
    /**
     * Arbitrary key-value pairs representing group custom fields. The provided object fully replaces existing custom fields.
     * @type {{ [key: string]: any; }}
     * @memberof UpdateGroupCustomFieldsRequest
     */
    custom_fields: { [key: string]: any; };
}
/**
 *
 * @export
 * @interface UpdateGroupCustomFieldsResponse
 */
export interface UpdateGroupCustomFieldsResponse {
    /**
     *
     * @type {boolean}
     * @memberof UpdateGroupCustomFieldsResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof UpdateGroupCustomFieldsResponse
     */
    message: string;
    /**
     *
     * @type {CreateGroup201ResponseData}
     * @memberof UpdateGroupCustomFieldsResponse
     */
    data: CreateGroup201ResponseData;
}
/**
 *
 * @export
 * @interface UpdateGroupRequest
 */
export interface UpdateGroupRequest {
    /**
     *
     * @type {string}
     * @memberof UpdateGroupRequest
     */
    name: string;
}
/**
 * Fields to update (partial update)
 * @export
 * @interface UpdateInboundSourceRequest
 */
export interface UpdateInboundSourceRequest {
    [key: string]: any | any;
    /**
     * Updated name
     * @type {string}
     * @memberof UpdateInboundSourceRequest
     */
    name?: string;
    /**
     * Updated gateway ID
     * @type {string}
     * @memberof UpdateInboundSourceRequest
     */
    gateway_id?: string;
}
/**
 * Request body for updating connection model install configuration
 * @export
 * @interface UpdateInstallConfigRequest
 */
export interface UpdateInstallConfigRequest {
    /**
     * New installation configuration for the controller
     * @type {{ [key: string]: any; }}
     * @memberof UpdateInstallConfigRequest
     */
    install_config: { [key: string]: any; };
}
/**
 * Response containing updated connection model with new install configuration
 * @export
 * @interface UpdateInstallConfigResponse
 */
export interface UpdateInstallConfigResponse {
    /**
     * Connection model ID
     * @type {number}
     * @memberof UpdateInstallConfigResponse
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    machine_id: string;
    /**
     *
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    model_name: string;
    /**
     *
     * @type {number}
     * @memberof UpdateInstallConfigResponse
     */
    model_version: number;
    /**
     *
     * @type {number}
     * @memberof UpdateInstallConfigResponse
     */
    view_role_level: number;
    /**
     * Updated installation configuration
     * @type {{ [key: string]: any; }}
     * @memberof UpdateInstallConfigResponse
     */
    install_config: { [key: string]: any; };
    /**
     *
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    created_at?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    updated_at?: string;
}
/**
 * Fields to update (partial update)
 * @export
 * @interface UpdateIntegrationRequest
 */
export interface UpdateIntegrationRequest {
    [key: string]: any | any;
    /**
     * Integration name
     * @type {string}
     * @memberof UpdateIntegrationRequest
     */
    name?: string;
    /**
     * Enable/disable integration
     * @type {boolean}
     * @memberof UpdateIntegrationRequest
     */
    enabled?: boolean;
    /**
     * Transformation schema
     * @type {{ [key: string]: any; }}
     * @memberof UpdateIntegrationRequest
     */
    schema?: { [key: string]: any; };
    /**
     * Configuration options
     * @type {{ [key: string]: any; }}
     * @memberof UpdateIntegrationRequest
     */
    _configuration?: { [key: string]: any; };
    /**
     * Service settings
     * @type {{ [key: string]: any; }}
     * @memberof UpdateIntegrationRequest
     */
    service?: { [key: string]: any; };
    /**
     * Service credentials
     * @type {{ [key: string]: any; }}
     * @memberof UpdateIntegrationRequest
     */
    credentials?: { [key: string]: any; };
}
/**
 * Request body for updating machine public visibility
 * @export
 * @interface UpdateMachinePublicRequest
 */
export interface UpdateMachinePublicRequest {
    /**
     * Whether the machine should be publicly accessible
     * @type {boolean}
     * @memberof UpdateMachinePublicRequest
     */
    is_public: boolean;
}
/**
 * Response containing updated machine with new public visibility status
 * @export
 * @interface UpdateMachinePublicResponse
 */
export interface UpdateMachinePublicResponse {
    /**
     *
     * @type {Machine}
     * @memberof UpdateMachinePublicResponse
     */
    machine: Machine;
}
/**
 * Request body for updating machine name and/or metadata. At least one of name or metadata is required.
 * @export
 * @interface UpdateMachineRequest
 */
export interface UpdateMachineRequest {
    /**
     * New human-readable name for the machine
     * @type {string}
     * @memberof UpdateMachineRequest
     */
    name?: string;
    /**
     * New metadata for the machine (replaces the existing metadata)
     * @type {{ [key: string]: any; }}
     * @memberof UpdateMachineRequest
     */
    metadata?: { [key: string]: any; };
}
/**
 * Response containing the updated machine
 * @export
 * @interface UpdateMachineResponse
 */
export interface UpdateMachineResponse {
    /**
     *
     * @type {Machine}
     * @memberof UpdateMachineResponse
     */
    machine: Machine;
}
/**
 *
 * @export
 * @interface UpdateNotificationRequest
 */
export interface UpdateNotificationRequest {
    /**
     * Human-readable notification name. Cannot be an empty string
     * @type {string}
     * @memberof UpdateNotificationRequest
     */
    name?: string;
    /**
     * Optional group ID to restrict the notification to a specific group.
     * Set to null or an empty string to clear the group assignment (owners only).
     * No permission check is performed when the value is unchanged.
     *
     * @type {string}
     * @memberof UpdateNotificationRequest
     */
    group_id?: string | null;
    /**
     * Destination settings. A JSON-encoded string is also accepted.
     * Provided keys are shallow-merged into the existing destination. The structure varies by type.
     * For email: {"to": "a@example.com", "cc": "b@example.com", "bcc": null}
     * - to: comma-separated string or array. Cannot be cleared
     * - cc, bcc: comma-separated string or array. Set to null or an empty string to remove the key
     * For SMS / call: {"to": "+819012345678"}
     * For webhook: {"url": "https://example.com/hook", "method": "POST", "headers": {}}
     * - method / headers can be removed with null or an empty string
     * All emails are checked for format and duplicates across to/cc/bcc after merging
     *
     * @type {object}
     * @memberof UpdateNotificationRequest
     */
    destination?: object;
    /**
     * Subject template. Supports {:key} placeholders for dynamic values.
     * Set to null to clear the template.
     *
     * @type {string}
     * @memberof UpdateNotificationRequest
     */
    template_title?: string | null;
    /**
     * Body template. Supports {:key} placeholders for dynamic values.
     * Set to null to clear the template.
     *
     * @type {string}
     * @memberof UpdateNotificationRequest
     */
    template_body?: string | null;
}
/**
 *
 * @export
 * @interface UpdateThreadPostRequest
 */
export interface UpdateThreadPostRequest {
    /**
     * Updated post content
     * @type {string}
     * @memberof UpdateThreadPostRequest
     */
    content: string;
}
/**
 *
 * @export
 * @interface UpdateThreadPostResponse
 */
export interface UpdateThreadPostResponse {
    /**
     *
     * @type {ThreadPost}
     * @memberof UpdateThreadPostResponse
     */
    post: ThreadPost;
}
/**
 *
 * @export
 * @interface UpdateThreadRequest
 */
export interface UpdateThreadRequest {
    /**
     * Thread status (true = open, false = closed)
     * @type {boolean}
     * @memberof UpdateThreadRequest
     */
    is_open: boolean;
}
/**
 *
 * @export
 * @interface UpdateThreadResponse
 */
export interface UpdateThreadResponse {
    /**
     *
     * @type {Thread}
     * @memberof UpdateThreadResponse
     */
    thread: Thread;
}
/**
 * JSON upload request
 * @export
 * @interface UploadAssetJsonRequest
 */
export interface UploadAssetJsonRequest {
    /**
     * Name of the file to create
     * @type {string}
     * @memberof UploadAssetJsonRequest
     */
    filename: string;
    /**
     *
     * @type {UploadAssetJsonRequestContent}
     * @memberof UploadAssetJsonRequest
     */
    content: UploadAssetJsonRequestContent;
}
/**
 * @type UploadAssetJsonRequestContent
 *
 * @export
 */
export type UploadAssetJsonRequestContent = object | string;
/**
 * Asset upload response
 * @export
 * @interface UploadAssetResponse
 */
export interface UploadAssetResponse {
    /**
     * Unique asset identifier
     * @type {string}
     * @memberof UploadAssetResponse
     */
    id: string;
    /**
     * URL to download the asset
     * @type {string}
     * @memberof UploadAssetResponse
     */
    url: string;
}
/**
 *
 * @export
 * @interface UpsertUserAuthority200Response
 */
export interface UpsertUserAuthority200Response {
    /**
     *
     * @type {boolean}
     * @memberof UpsertUserAuthority200Response
     */
    success?: boolean;
    /**
     *
     * @type {UpsertUserAuthority200ResponseData}
     * @memberof UpsertUserAuthority200Response
     */
    data?: UpsertUserAuthority200ResponseData;
}
/**
 *
 * @export
 * @interface UpsertUserAuthority200ResponseData
 */
export interface UpsertUserAuthority200ResponseData {
    /**
     *
     * @type {object}
     * @memberof UpsertUserAuthority200ResponseData
     */
    authority?: object;
}
/**
 *
 * @export
 * @interface UpsertUserAuthorityRequest
 */
export interface UpsertUserAuthorityRequest {
    /**
     *
     * @type {string}
     * @memberof UpsertUserAuthorityRequest
     */
    role: UpsertUserAuthorityRequestRoleEnum;
}


/**
 * @export
 */
export const UpsertUserAuthorityRequestRoleEnum = {
    Member: 'member',
    Guest: 'guest'
} as const;
export type UpsertUserAuthorityRequestRoleEnum = typeof UpsertUserAuthorityRequestRoleEnum[keyof typeof UpsertUserAuthorityRequestRoleEnum];

/**
 *
 * @export
 * @interface UsagePeriod
 */
export interface UsagePeriod {
    /**
     *
     * @type {string}
     * @memberof UsagePeriod
     */
    start: string;
    /**
     *
     * @type {string}
     * @memberof UsagePeriod
     */
    end: string;
    /**
     *
     * @type {string}
     * @memberof UsagePeriod
     */
    reset_at: string;
}
/**
 *
 * @export
 * @interface UsageSummary
 */
export interface UsageSummary {
    /**
     *
     * @type {PlanKey}
     * @memberof UsageSummary
     */
    key: PlanKey;
    /**
     *
     * @type {string}
     * @memberof UsageSummary
     */
    kind: UsageSummaryKindEnum;
    /**
     *
     * @type {string}
     * @memberof UsageSummary
     */
    unit?: string | null;
    /**
     *
     * @type {number}
     * @memberof UsageSummary
     */
    count: number;
    /**
     *
     * @type {number}
     * @memberof UsageSummary
     */
    limit: number;
    /**
     *
     * @type {number}
     * @memberof UsageSummary
     */
    remaining: number | null;
    /**
     *
     * @type {string}
     * @memberof UsageSummary
     */
    reset_at: string;
    /**
     *
     * @type {string}
     * @memberof UsageSummary
     */
    source: UsageSummarySourceEnum;
}


/**
 * @export
 */
export const UsageSummaryKindEnum = {
    Count: 'count',
    MonthlyUsage: 'monthly_usage'
} as const;
export type UsageSummaryKindEnum = typeof UsageSummaryKindEnum[keyof typeof UsageSummaryKindEnum];

/**
 * @export
 */
export const UsageSummarySourceEnum = {
    UsageCounts: 'usage_counts',
    Derived: 'derived'
} as const;
export type UsageSummarySourceEnum = typeof UsageSummarySourceEnum[keyof typeof UsageSummarySourceEnum];

/**
 *
 * @export
 * @interface UserProfileValidationError
 */
export interface UserProfileValidationError {
    /**
     *
     * @type {boolean}
     * @memberof UserProfileValidationError
     */
    status: boolean;
    /**
     *
     * @type {string}
     * @memberof UserProfileValidationError
     */
    errorMessage: string;
    /**
     *
     * @type {Array<UserProfileValidationErrorErrorsInner>}
     * @memberof UserProfileValidationError
     */
    errors?: Array<UserProfileValidationErrorErrorsInner>;
}
/**
 *
 * @export
 * @interface UserProfileValidationErrorErrorsInner
 */
export interface UserProfileValidationErrorErrorsInner {
    /**
     *
     * @type {string}
     * @memberof UserProfileValidationErrorErrorsInner
     */
    field?: string;
    /**
     *
     * @type {string}
     * @memberof UserProfileValidationErrorErrorsInner
     */
    message?: string;
}
/**
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * Error message
     * @type {string}
     * @memberof ValidationError
     */
    error?: string;
    /**
     * Detailed validation errors
     * @type {Array<ValidationErrorDetail>}
     * @memberof ValidationError
     */
    details?: Array<ValidationErrorDetail>;
}
/**
 *
 * @export
 * @interface ValidationErrorDetail
 */
export interface ValidationErrorDetail {
    /**
     * Field name that failed validation
     * @type {string}
     * @memberof ValidationErrorDetail
     */
    field?: string;
    /**
     * Validation error message
     * @type {string}
     * @memberof ValidationErrorDetail
     */
    message?: string;
}
/**
 *
 * @export
 * @interface ValidationRule
 */
export interface ValidationRule {
    /**
     *
     * @type {string}
     * @memberof ValidationRule
     */
    pattern: string;
    /**
     *
     * @type {string}
     * @memberof ValidationRule
     */
    message: string;
}
