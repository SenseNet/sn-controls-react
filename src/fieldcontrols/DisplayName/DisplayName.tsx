/**
 * @module FieldControls
 * 
 */ /** */
import * as React from 'react'
import { FieldSettings } from 'sn-client-js'
import { IClientFieldSetting, IReactClientFieldSetting } from '../IClientFieldSetting'
import { IShortTextFieldSetting } from '../ShortText/IShortTextFieldSetting'
import { IDisplayNameFieldSetting } from './IDisplayNameFieldSetting'

import { styles } from './DisplayNameStyles'
import { Input } from 'react-materialize'
import Radium from 'radium'

/**
 * Interface for DisplayName properties
 */
export interface DisplayNameProps extends IReactClientFieldSetting, IClientFieldSetting, IDisplayNameFieldSetting { 
    onChange: Function
}

/**
 * Field control that represents a ShortText field. Available values will be populated from the FieldSettings.
 */
@Radium
export class DisplayName extends React.Component<DisplayNameProps, { value }> {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} value input value
         */
        this.state = {
            value: this.setValue(this.props['data-fieldValue'])
        };

        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * convert incoming default value string to proper format
     * @param {string} value
     */
    setValue(value) {
        if (value) {
            return value.replace(/<[^>]*>/g, '');
        }
        else {
            if (this.props['data-defaultValue']) {
                return this.props['data-defaultValue']
            }
            else {
                return ''
            }
        }
    }
    /**
     * handle change of the input
     * @param {SytheticEvent} event
     */
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        switch (this.props['data-actionName']) {
            case 'edit':
                return (
                    <Input
                        type='text'
                        name={this.props.name}
                        label={
                            this.props.required
                                ? this.props['data-labelText'] + ' *'
                                : this.props['data-labelText']
                        }
                        className={this.props.className}
                        //placeholder={this.props['data-placeHolderText']}
                        //placeHolderStyle?: object
                        style={this.props.style}
                        defaultValue={this.state.value}
                        readOnly={this.props.readOnly}
                        min={this.props['data-minLength']}
                        max={this.props['data-maxLength']}
                        required={this.props.required}
                        disabled={this.props.readOnly}
                        error={this.props['data-errorText']}
                        onChange={this.props.onChange}
                        s={12}
                        m={12}
                        l={12}
                    />
                )
            case 'new':
                return (
                    <Input
                        type='text'
                        name={this.props.name}
                        label={
                            this.props.required
                                ? this.props['data-labelText'] + ' *'
                                : this.props['data-labelText']
                        }
                        className={this.props.className}
                        //placeholder={this.props['data-placeHolderText']}
                        //placeHolderStyle?: object
                        style={this.props.style}
                        defaultValue={this.props['data-defaultValue']}
                        readOnly={this.props.readOnly}
                        min={this.props['data-minLength']}
                        max={this.props['data-maxLength']}
                        required={this.props.required}
                        disabled={this.props.readOnly}
                        error={this.props['data-errorText']}
                        onChange={this.props.onChange}
                        s={12}
                        m={12}
                        l={12}
                    />
                )
            case 'browse':
                return (
                    <div>
                        <label>
                            {this.props['data-labelText']}
                        </label>
                        <p>
                            {this.props['data-fieldValue']}
                        </p>
                    </div>
                )
            default:
                return (
                    <div>
                        <label>
                            {this.props['data-labelText']}
                        </label>
                        <p>
                            {this.props['data-fieldValue']}
                        </p>
                    </div>
                )
        }

    }
}