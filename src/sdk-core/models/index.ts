/* tslint:disable */
/* eslint-disable */
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
    RsBtevs1: 'RS_BTEVS1'
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
    accountId: string;
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
    destUnitId: string;
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
    topicName?: string;
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
    obnizRegistrateUrl: string;
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
    intervalMs: number;
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
    controllerType?: AvailableControllerControllerTypeEnum;
    /**
     * Minimum role required to install (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof AvailableController
     */
    installRole?: number;
    /**
     * Schema defining required installation configuration
     * @type {Array<InstallConfigStructure>}
     * @memberof AvailableController
     */
    installConfigStructure?: Array<InstallConfigStructure>;
    /**
     * Conditions that must be met before installation
     * @type {Array<AvailableControllerConditionsInner>}
     * @memberof AvailableController
     */
    conditions?: Array<AvailableControllerConditionsInner>;
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
 * 
 * @export
 * @interface AvailableControllerConditionsInner
 */
export interface AvailableControllerConditionsInner {
    /**
     * 
     * @type {string}
     * @memberof AvailableControllerConditionsInner
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof AvailableControllerConditionsInner
     */
    message?: string;
}
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
    externalDeviceId: string;
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
    unitId: string;
    /**
     * External device ID
     * @type {string}
     * @memberof BatchCreateSuccess
     */
    externalDeviceId: string;
}
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
    exportId?: string;
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
    fileUrl?: string | null;
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
    createdAt?: string;
    /**
     * Timestamp when export was completed
     * @type {string}
     * @memberof CSVExportItem
     */
    completedAt?: string | null;
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
    exportId: string;
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
    fileUrl?: string | null;
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
    createdAt: string;
    /**
     * Timestamp when export was completed
     * @type {string}
     * @memberof CSVExportStatusResponse
     */
    completedAt?: string | null;
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
    machineId?: string;
    /**
     * Controller model name
     * @type {string}
     * @memberof ConnectionModel
     */
    modelName?: string;
    /**
     * Controller model version
     * @type {number}
     * @memberof ConnectionModel
     */
    modelVersion?: number;
    /**
     * Minimum role level required to view this connection (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof ConnectionModel
     */
    viewRoleLevel?: number;
    /**
     * Configuration for the controller installation
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModel
     */
    installConfig?: { [key: string]: any; } | null;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof ConnectionModel
     */
    createdAt?: string;
    /**
     * Timestamp when the connection was last updated
     * @type {string}
     * @memberof ConnectionModel
     */
    updatedAt?: string;
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
    machineId: string;
    /**
     * Controller model name (identity)
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    modelName: string;
    /**
     * Controller version
     * @type {number}
     * @memberof ConnectionModelDetailed
     */
    modelVersion: number;
    /**
     * Minimum role level required to view this model (0=Owner, 100=User, 200=Guest)
     * @type {number}
     * @memberof ConnectionModelDetailed
     */
    viewRoleLevel: number;
    /**
     * Installation configuration for the controller
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModelDetailed
     */
    installConfig?: { [key: string]: any; } | null;
    /**
     * Schema defining the structure of install_config
     * @type {Array<InstallConfigStructure>}
     * @memberof ConnectionModelDetailed
     */
    installConfigStructure?: Array<InstallConfigStructure> | null;
    /**
     * Whether the current user has permission to delete this model
     * @type {boolean}
     * @memberof ConnectionModelDetailed
     */
    canDelete?: boolean;
    /**
     * Conditions that must be met for installation
     * @type {Array<object>}
     * @memberof ConnectionModelDetailed
     */
    conditions?: Array<object> | null;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof ConnectionModelDetailed
     */
    updatedAt?: string;
}
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
    modelName: string;
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
    modelName: string;
    /**
     * Controller version
     * @type {number}
     * @memberof ConnectionModelUpdateItem
     */
    modelVersion: number;
    /**
     * Minimum role level required to view this model (0=Owner, 1=User, 2=Guest)
     * @type {number}
     * @memberof ConnectionModelUpdateItem
     */
    viewRoleLevel?: number;
    /**
     * Installation configuration for the controller
     * @type {{ [key: string]: any; }}
     * @memberof ConnectionModelUpdateItem
     */
    installConfig?: { [key: string]: any; } | null;
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
    modelName?: string;
    /**
     * Version of the controller model
     * @type {string}
     * @memberof ConnectionWithController
     */
    modelVersion?: string;
    /**
     * ID of the machine this connection is linked to
     * @type {string}
     * @memberof ConnectionWithController
     */
    machineId?: string;
    /**
     * Name of the machine
     * @type {string}
     * @memberof ConnectionWithController
     */
    machineName?: string;
    /**
     * Type of the controller
     * @type {string}
     * @memberof ConnectionWithController
     */
    controllerType?: ConnectionWithControllerControllerTypeEnum;
    /**
     * Display title of the controller
     * @type {string}
     * @memberof ConnectionWithController
     */
    controllerTitle?: string;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof ConnectionWithController
     */
    createdAt?: string;
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
    accountId: string;
    /**
     * Destination unit ID where data should be routed. Typically in the format machine-{machine_id}
     * @type {string}
     * @memberof Converter
     */
    destUnitId: string;
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
    startDate: string;
    /**
     * End date for data export
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    endDate: string;
    /**
     * Type of export (optional)
     * @type {string}
     * @memberof CreateCSVExportRequest
     */
    exportType?: string;
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
    groupId?: string | null;
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
    unitId: string;
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
    exportId: string;
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
    createdAt: string;
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
    groupId?: string | null;
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
    templateTitle?: string | null;
    /**
     * Body template. Supports {:key} placeholders for dynamic values.
     * When not set (null), the message generated by the controller is used as-is.
     * 
     * @type {string}
     * @memberof CreateNotificationRequest
     */
    templateBody?: string | null;
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
    groupId?: string;
    /**
     * 
     * @type {InitialPost}
     * @memberof CreateThreadRequest
     */
    initialPost: InitialPost;
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
    accountId?: string;
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
    connectedObnizId?: string;
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
    deletedMachineId: string;
}
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
    accountId: string;
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
    machineId?: string | null;
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
    eventId: string;
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
    fileName?: string;
    /**
     * Type of error
     * @type {string}
     * @memberof FileUploadErrorDetailsInner
     */
    errorType?: FileUploadErrorDetailsInnerErrorTypeEnum;
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
     * @type {Intelligence}
     * @memberof GetIntelligenceResponse
     */
    intelligence: Intelligence;
    /**
     * Whether the user can edit this intelligence
     * @type {boolean}
     * @memberof GetIntelligenceResponse
     */
    allowedToEdit: boolean;
}
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
    accountId: string;
    /**
     * Custom fields (arbitrary key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof Group
     */
    customFields?: { [key: string]: any; };
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
    accountId: string;
    /**
     * Custom fields (arbitrary key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof GroupWithMachines
     */
    customFields?: { [key: string]: any; };
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
    accountId: string;
    /**
     * ID of the inbound source
     * @type {string}
     * @memberof InboundConnection
     */
    inboundSourceId: string;
    /**
     * ID of the external device/sensor
     * @type {string}
     * @memberof InboundConnection
     */
    inboundDeviceId: string;
    /**
     * ID of the connected machine
     * @type {string}
     * @memberof InboundConnection
     */
    machineId: string;
    /**
     * Controller model name
     * @type {string}
     * @memberof InboundConnection
     */
    modelName: string;
    /**
     * Controller model version
     * @type {number}
     * @memberof InboundConnection
     */
    modelVersion: number;
    /**
     * Timestamp when the connection was created
     * @type {string}
     * @memberof InboundConnection
     */
    createdAt: string;
    /**
     * Timestamp when the connection was last updated
     * @type {string}
     * @memberof InboundConnection
     */
    updatedAt: string;
    /**
     * Associated unit ID
     * @type {string}
     * @memberof InboundConnection
     */
    unitId?: string;
    /**
     * External sensor/device identifier
     * @type {string}
     * @memberof InboundConnection
     */
    externalDeviceId?: string;
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
    accountId: string;
    /**
     * Timestamp when the inbound source was created
     * @type {string}
     * @memberof InboundSource
     */
    createdAt: string;
    /**
     * Timestamp when the inbound source was last updated
     * @type {string}
     * @memberof InboundSource
     */
    updatedAt: string;
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
    gatewayModel: string;
    /**
     * Unique identifier of the gateway device
     * @type {string}
     * @memberof InboundSource
     */
    gatewayId: string;
    /**
     * List of detected external sensor IDs
     * @type {Array<string>}
     * @memberof InboundSource
     */
    externalDetections: Array<string>;
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
    filePaths?: Array<string>;
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
    updateStatus?: InitialPostUpdateStatusEnum;
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
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {any}
     * @memberof InlineObject
     */
    error?: any | null;
}
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
    controllerName: string;
    /**
     * Version of the controller
     * @type {number}
     * @memberof InstallConfigStructure
     */
    controllerVersion: number;
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
    accountId: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    machineId?: string | null;
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
    isEnabled: boolean;
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
    createdAt: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    updatedAt: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationAPIPull
     */
    lastUsedAt?: string | null;
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
    accountId: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    machineId?: string | null;
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
    isEnabled: boolean;
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
    createdAt: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    updatedAt: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationAPIPush
     */
    lastUsedAt?: string | null;
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
    accountId: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationBase
     */
    machineId?: string | null;
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
    isEnabled: boolean;
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
    createdAt: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationBase
     */
    updatedAt: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationBase
     */
    lastUsedAt?: string | null;
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
    accountId: string;
    /**
     * Machine ID (optional, null for account-level integrations)
     * @type {string}
     * @memberof IntegrationPubSub
     */
    machineId?: string | null;
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
    isEnabled: boolean;
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
    createdAt: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof IntegrationPubSub
     */
    updatedAt: string;
    /**
     * Last time the integration was used
     * @type {string}
     * @memberof IntegrationPubSub
     */
    lastUsedAt?: string | null;
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
    topicName: string;
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
    codeType: CodeType;
    /**
     * Intelligence code (when code_type is 'code')
     * @type {string}
     * @memberof Intelligence
     */
    code?: string | null;
    /**
     * Intelligence schema definition
     * @type {object}
     * @memberof Intelligence
     */
    schema: object;
    /**
     * Conditions for intelligence execution
     * @type {object}
     * @memberof Intelligence
     */
    conditions?: object;
    /**
     * Widget configuration for UI display
     * @type {string}
     * @memberof Intelligence
     */
    widget?: string;
}


/**
 * Input schema for creating or updating intelligence
 * @export
 * @interface IntelligenceInput
 */
export interface IntelligenceInput {
    /**
     * Unique intelligence name (must be unique with version)
     * @type {string}
     * @memberof IntelligenceInput
     */
    name: string;
    /**
     * Intelligence version (positive integer)
     * @type {number}
     * @memberof IntelligenceInput
     */
    version: number;
    /**
     * 
     * @type {ControllerType}
     * @memberof IntelligenceInput
     */
    type: ControllerType;
    /**
     * Human-readable intelligence title
     * @type {string}
     * @memberof IntelligenceInput
     */
    title: string;
    /**
     * Image URL or comma-separated URLs
     * @type {string}
     * @memberof IntelligenceInput
     */
    images?: string;
    /**
     * 
     * @type {ControllerPublishment}
     * @memberof IntelligenceInput
     */
    publishment: ControllerPublishment;
    /**
     * Detailed intelligence description
     * @type {string}
     * @memberof IntelligenceInput
     */
    description?: string;
    /**
     * 
     * @type {CodeType}
     * @memberof IntelligenceInput
     */
    codeType: CodeType;
    /**
     * Intelligence code (required when code_type is 'code')
     * @type {string}
     * @memberof IntelligenceInput
     */
    code: string | null;
    /**
     * Intelligence schema definition (required)
     * @type {object}
     * @memberof IntelligenceInput
     */
    schema: object;
    /**
     * Conditions for intelligence execution
     * @type {object}
     * @memberof IntelligenceInput
     */
    conditions?: object;
    /**
     * Widget configuration for UI display
     * @type {string}
     * @memberof IntelligenceInput
     */
    widget?: string;
}


/**
 * 
 * @export
 * @interface IntelligenceSuccessResponse
 */
export interface IntelligenceSuccessResponse {
    /**
     * 
     * @type {boolean}
     * @memberof IntelligenceSuccessResponse
     */
    success: boolean;
}
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
    accountId?: string;
    /**
     * Machine ID associated with the issue
     * @type {string}
     * @memberof Issue
     */
    machineId?: string | null;
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
    uniqueKey?: string;
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
    isOpening?: boolean;
    /**
     * Timestamp when the issue was issued
     * @type {string}
     * @memberof Issue
     */
    issuedAt?: string;
    /**
     * Timestamp when the issue was created
     * @type {string}
     * @memberof Issue
     */
    createdAt?: string;
    /**
     * Timestamp when the issue was closed (null if still open)
     * @type {string}
     * @memberof Issue
     */
    closedAt?: string | null;
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
    issuedAt?: string;
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
    issueId: string;
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
    id?: string;
    /**
     * Account ID that owns this machine
     * @type {string}
     * @memberof Machine
     */
    accountId?: string;
    /**
     * Human-readable machine name
     * @type {string}
     * @memberof Machine
     */
    name?: string;
    /**
     * ID of connected obniz device (if any)
     * @type {string}
     * @memberof Machine
     */
    connectedObnizId?: string | null;
    /**
     * List of connection model names
     * @type {Array<string>}
     * @memberof Machine
     */
    connectionModels?: Array<string>;
    /**
     * Custom metadata for the machine
     * @type {{ [key: string]: any; }}
     * @memberof Machine
     */
    metadata?: { [key: string]: any; };
    /**
     * Timestamp when the machine was created
     * @type {string}
     * @memberof Machine
     */
    createdAt?: string;
    /**
     * Timestamp when the machine was last updated
     * @type {string}
     * @memberof Machine
     */
    updatedAt?: string;
    /**
     * Whether the machine is publicly accessible
     * @type {boolean}
     * @memberof Machine
     */
    isPublic?: boolean;
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
    machineId: string;
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
    machineId: string;
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
    machine?: Machine;
    /**
     * Current state of the machine (key-value pairs)
     * @type {{ [key: string]: any; }}
     * @memberof MachineWithState
     */
    machineStat?: { [key: string]: any; };
    /**
     * Unique machine identifier (UUID)
     * @type {string}
     * @memberof MachineWithState
     */
    id?: string;
    /**
     * Account ID that owns this machine
     * @type {string}
     * @memberof MachineWithState
     */
    accountId?: string;
    /**
     * Human-readable machine name
     * @type {string}
     * @memberof MachineWithState
     */
    name?: string;
    /**
     * ID of connected obniz device (if any)
     * @type {string}
     * @memberof MachineWithState
     */
    connectedObnizId?: string | null;
    /**
     * List of connection model names
     * @type {Array<string>}
     * @memberof MachineWithState
     */
    connectionModels?: Array<string>;
    /**
     * Custom metadata for the machine
     * @type {{ [key: string]: any; }}
     * @memberof MachineWithState
     */
    metadata?: { [key: string]: any; };
    /**
     * Timestamp when the machine was created
     * @type {string}
     * @memberof MachineWithState
     */
    createdAt?: string;
    /**
     * Timestamp when the machine was last updated
     * @type {string}
     * @memberof MachineWithState
     */
    updatedAt?: string;
    /**
     * Whether the machine is publicly accessible
     * @type {boolean}
     * @memberof MachineWithState
     */
    isPublic?: boolean;
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
    accountId?: string;
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
    groupId?: string | null;
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
    lastUsed?: string;
    /**
     * Subject template with {:key} placeholders
     * @type {string}
     * @memberof Notification
     */
    templateTitle?: string | null;
    /**
     * Body template with {:key} placeholders
     * @type {string}
     * @memberof Notification
     */
    templateBody?: string | null;
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
    notificationId: string;
    /**
     * Account ID
     * @type {string}
     * @memberof NotificationHistory
     */
    accountId: string;
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
    errorMessage?: string | null;
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
    sentAt: string;
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
    notificationId: string;
    /**
     * Account ID
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    accountId: string;
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
    errorMessage?: string | null;
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
    sentAt: string;
    /**
     * Name of the notification destination
     * @type {string}
     * @memberof NotificationHistoryWithName
     */
    notificationName: string;
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
    sensorId: string;
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
    groupId?: string | null;
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
    reportType: string;
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
    createdAt: string;
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
    accountId?: string;
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
    createdAt?: string;
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
    isOpen?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    accountId?: string;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    groupId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    createdBy?: string;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    updatedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    closedAt?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    closedBy?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Thread
     */
    creatorName?: string;
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
    threadId?: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadEntity
     */
    postNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof ThreadEntity
     */
    entityNumber?: number;
    /**
     * 
     * @type {string}
     * @memberof ThreadEntity
     */
    machineId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ThreadEntity
     */
    issueId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ThreadEntity
     */
    eventId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ThreadEntity
     */
    createdAt?: string;
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
    threadId?: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadPost
     */
    postNumber?: number;
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
    filePaths?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ThreadPost
     */
    accountId?: string;
    /**
     * 
     * @type {string}
     * @memberof ThreadPost
     */
    createdBy?: string;
    /**
     * 
     * @type {string}
     * @memberof ThreadPost
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ThreadPost
     */
    updatedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ThreadPost
     */
    authorName?: string;
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
    isSimplified?: boolean;
    /**
     * Return only latest values
     * @type {boolean}
     * @memberof TransformIntegrationRequestConfiguration
     */
    latestOnly?: boolean;
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
    modelName?: string;
    /**
     * 
     * @type {number}
     * @memberof TransformIntegrationRequestConnectedControllersInner
     */
    modelVersion?: number;
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
    projectId?: string;
    /**
     * 
     * @type {string}
     * @memberof TransformIntegrationRequestCredentials
     */
    clientEmail?: string;
    /**
     * 
     * @type {string}
     * @memberof TransformIntegrationRequestCredentials
     */
    privateKey?: string;
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
    tsTimestamp: number;
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
    tailDate?: string | null;
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
    obnizId: string;
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
 * @interface UpdateGroupCustomFieldsRequest
 */
export interface UpdateGroupCustomFieldsRequest {
    /**
     * Arbitrary key-value pairs representing group custom fields. The provided object fully replaces existing custom fields.
     * @type {{ [key: string]: any; }}
     * @memberof UpdateGroupCustomFieldsRequest
     */
    customFields: { [key: string]: any; };
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
     * @type {UpdateGroupCustomFieldsResponseData}
     * @memberof UpdateGroupCustomFieldsResponse
     */
    data: UpdateGroupCustomFieldsResponseData;
}
/**
 * 
 * @export
 * @interface UpdateGroupCustomFieldsResponseData
 */
export interface UpdateGroupCustomFieldsResponseData {
    /**
     * 
     * @type {Group}
     * @memberof UpdateGroupCustomFieldsResponseData
     */
    group?: Group;
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
    gatewayId?: string;
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
    installConfig: { [key: string]: any; };
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
    machineId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    modelName: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateInstallConfigResponse
     */
    modelVersion: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateInstallConfigResponse
     */
    viewRoleLevel: number;
    /**
     * Updated installation configuration
     * @type {{ [key: string]: any; }}
     * @memberof UpdateInstallConfigResponse
     */
    installConfig: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateInstallConfigResponse
     */
    updatedAt?: string;
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
    isPublic: boolean;
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
 * 
 * @export
 * @interface UpdateNotificationTemplateRequest
 */
export interface UpdateNotificationTemplateRequest {
    /**
     * Subject template. Supports {:key} placeholders for dynamic values.
     * Set to null to clear the template.
     * 
     * @type {string}
     * @memberof UpdateNotificationTemplateRequest
     */
    templateTitle?: string | null;
    /**
     * Body template. Supports {:key} placeholders for dynamic values.
     * Set to null to clear the template.
     * 
     * @type {string}
     * @memberof UpdateNotificationTemplateRequest
     */
    templateBody?: string | null;
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
    isOpen: boolean;
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
