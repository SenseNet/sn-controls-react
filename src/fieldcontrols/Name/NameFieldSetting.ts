/**
 * @module FieldControls
 *
 */ /** */
import { GenericContent } from '@sensenet/default-content-types'
import { ReactShortTextFieldSetting } from '../ShortText/ShortTextFieldSetting'

/**
 * Interface for NameFieldSetting properties
 */
export interface ReactNameFieldSetting<T extends GenericContent = GenericContent, K extends keyof T = 'Name'> extends ReactShortTextFieldSetting<T, K> {
    /**
     * When set to "true", the Field Control will not set the Content's DisplayName even if the DisplayName Field Control is not present in the Content View
     * @default false
     */
    neverOverrideDisplayName?: boolean
    /**
     * When set to "true", the control is rendered as editable (and the user does not have to explicitely click on the edit button to change the Field Control's value
     * @default false
     */
    alwaysEditable?: boolean
}
