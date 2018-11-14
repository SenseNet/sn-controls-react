/**
 * @module FieldControls
 *
 */ /** */
import { GenericContent } from '@sensenet/default-content-types'
import { ReactClientFieldSetting } from './ClientFieldSetting'

/**
 * Interface for LongTextFieldSetting properties
 */
export interface ReactLongTextFieldSetting<T extends GenericContent = GenericContent, K extends keyof T = 'Name'> extends ReactClientFieldSetting<T, K> {
    /**
     * Defines the maximum length of the inserted text: 0 to infinite.
     */
    'data-maxLength'?: number,
    /**
     * Defines the minimum length of the inserted text: 0 to infinite.
     */
    'data-minLength'?: number,
    /**
     * defines the rendering mode of the input box.
     * @default LongText
     */
    'data-textType': 'LongText' | 'RichText' | 'AdvancedRichText'
}
