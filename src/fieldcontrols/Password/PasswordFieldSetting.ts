/**
 * @module FieldControls
 *
 */ /** */
import { GenericContent } from '@sensenet/default-content-types'
import { ReactShortTextFieldSetting } from '../ShortText/ShortTextFieldSetting'

/**
 * Interface for PasswordFieldSetting properties
 */
// tslint:disable-next-line:no-empty-interface
export interface ReactPasswordFieldSetting<T extends GenericContent = GenericContent, K extends keyof T = 'Name'> extends ReactShortTextFieldSetting<T, K> {

}
