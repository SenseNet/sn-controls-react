/**
 * @module FieldControls
 *
 */ /** */
import React, { Component } from 'react'
import { ReactChoiceFieldSetting } from '../ChoiceFieldSetting'
import { ReactClientFieldSetting, ReactClientFieldSettingProps } from '../ClientFieldSetting'

import Checkbox from '@material-ui/core/Checkbox'
// import {
//     FormControl,
//     FormControlLabel,
//     FormGroup,
//     FormHelperText,
//     FormLabel,
// } from '@material-ui/core/Form'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import { GenericContent } from '@sensenet/default-content-types'

/**
 * Interface for CheckboxGroup properties
 */
export interface CheckboxGroupProps<T extends GenericContent, K extends keyof T> extends ReactClientFieldSettingProps<T, K>, ReactClientFieldSetting<T, K>, ReactChoiceFieldSetting<T, K> { }
/**
 * Interface for CheckboxGroup state
 */
export interface CheckboxGroupState<T extends GenericContent, K extends keyof T> {
    value: any[]
}
/**
 * Field control that represents a Choice field. Available values will be populated from the FieldSettings.
 */
export class CheckboxGroup<T extends GenericContent, K extends keyof T> extends Component<CheckboxGroupProps<T, K>, CheckboxGroupState<T, K>> {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props: CheckboxGroup<T, K>['props']) {
        super(props)
        this.state = {
            value: this.props['data-fieldValue'] || this.props['data-defaultValue'] || [],
        }
        this.handleChange = this.handleChange.bind(this)
    }
    /**
     * set selected value
     */
    public handleChange = (event: React.ChangeEvent) => {
        const { value } = this.state
        // tslint:disable-next-line:no-string-literal
        const newValue = event.target['value']
        const checked = value
        const index = value.indexOf(newValue)
        if (this.props['data-allowMultiple']) {
            if (index > -1) {
                checked.splice(index, 1)
            } else {
                checked.push(newValue)
            }
        } else {
            if (index > -1) {
                checked.splice(index, 1)
            } else {
                checked[0] = newValue
            }
        }
        this.setState({
            value: checked,
        })
        this.props.onChange(this.props.name, checked as any)
    }
    /**
     * returns if an item is checked or not
     * @param {string} item
     */
    public isChecked(item: number | string) {
        let checked = false
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.state.value.length; i++) {
            if (this.state.value[i].toString() === item.toString()) {
                checked = true
                break
            }
        }
        return checked
    }
    /**
     * render
     * @return {ReactElement} markup
     */
    public render() {
        switch (this.props['data-actionName']) {
            case 'edit':
                return (
                    <FormControl className={this.props.className} component="fieldset" required={this.props.required} error={this.props['data-errorText'] !== undefined && this.props['data-errorText'].length > 0}>
                        <FormLabel component="legend">{this.props['data-labelText']}</FormLabel>
                        <FormGroup>
                            {this.props.options.map((option) => {
                                return <FormControlLabel
                                    key={option.Value}
                                    control={
                                        <Checkbox
                                            checked={this.isChecked(option.Value)}
                                            onChange={this.handleChange}
                                            value={option.Value.toString()}
                                            disabled={this.props.readOnly}
                                        />
                                    }
                                    label={option.Text}
                                />
                            })}
                        </FormGroup>
                        {this.props['data-allowExtraValue'] ? <TextField placeholder="Extra value" /> : null}
                        <FormHelperText>{this.props['data-hintText']}</FormHelperText>
                        <FormHelperText>{this.props['data-errorText']}</FormHelperText>
                    </FormControl>
                )
            case 'new':
                return (
                    <FormControl className={this.props.className} component="fieldset" required={this.props.required} error={this.props['data-errorText'] !== undefined && this.props['data-errorText'].length > 0}>
                        <FormLabel component="legend">{this.props['data-labelText']}</FormLabel>
                        <FormGroup>
                            {this.props.options.map((option) => {
                                return <FormControlLabel
                                    key={option.Value}
                                    control={
                                        <Checkbox
                                            checked={this.isChecked(option.Value)}
                                            onChange={this.handleChange}
                                            value={option.Value.toString()}
                                            disabled={this.props.readOnly}
                                        />
                                    }
                                    label={option.Text}
                                />
                            })}
                        </FormGroup>
                        {this.props['data-allowExtraValue'] ? <TextField placeholder="Extra value" /> : null}
                        <FormHelperText>{this.props['data-hintText']}</FormHelperText>
                        <FormHelperText>{this.props['data-errorText']}</FormHelperText>
                    </FormControl>
                )
            case 'browse':
                return (
                    this.props['data-fieldValue'].length > 0 ?
                        <FormControl component="fieldset" className={this.props.className}>
                            <FormLabel component="legend">
                                {this.props['data-labelText']}
                            </FormLabel>
                            <FormGroup>
                                {this.props['data-fieldValue'].map((value: T[K]) =>
                                    <FormControl component="fieldset">
                                        <FormControlLabel style={{ marginLeft: 0 }} label={this.props.options.find((item) => (item.Value === value)).Text} control={<span></span>} key={this.props.options.find((item) => (item.Value === value)).Name} />
                                    </FormControl>)}
                            </FormGroup>
                        </FormControl> : null
                )
            default:
                return (
                    this.props['data-fieldValue'].length > 0 ?
                        <FormControl component="fieldset" className={this.props.className}>
                            <FormLabel component="legend">
                                {this.props['data-labelText']}
                            </FormLabel>
                            <FormGroup>
                                {this.props['data-fieldValue'].map((value: T[K]) =>
                                    <FormControl component="fieldset">
                                        <FormControlLabel style={{ marginLeft: 0 }} label={this.props.options.find((item) => (item.Value === value)).Text} control={<span></span>} key={this.props.options.find((item) => (item.Value === value)).Name} />
                                    </FormControl>)}
                            </FormGroup>
                        </FormControl> : null
                )
        }
    }
}
